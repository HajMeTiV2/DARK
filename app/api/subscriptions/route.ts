import crypto from "crypto";
import { NextResponse } from "next/server";
import { all, initDb, sql } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function GET(){if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});return NextResponse.json(await all("subscriptions"))}
export async function POST(req:Request){
  if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});
  await initDb();const b=await req.json();const token=crypto.randomBytes(18).toString("base64url");
  const rows=await sql("INSERT INTO subscriptions(token,user_id,traffic_limit,expires_at,status) VALUES($1,$2,$3,$4,'active') RETURNING *",[token,b.user_id||null,Number(b.traffic_limit||0),b.expires_at||null]);
  if(Array.isArray(b.config_ids)) for(const cid of b.config_ids) await sql("INSERT INTO subscription_configs(subscription_id,config_id) VALUES($1,$2) ON CONFLICT DO NOTHING",[rows[0].id,cid]);
  await sql("INSERT INTO activities(action) VALUES($1)",["لینک Subscription جدید ساخته شد"]);return NextResponse.json(rows[0]);
}
