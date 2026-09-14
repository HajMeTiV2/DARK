import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";
export async function GET(_:Request,{params}:{params:Promise<{token:string}>}){
  await initDb();const {token}=await params;
  const s=await sql<any>("SELECT * FROM subscriptions WHERE token=$1 AND status='active' LIMIT 1",[token]);
  if(!s.length)return NextResponse.json({error:"Subscription not found"},{status:404});
  const configs=await sql<any>("SELECT c.id,c.name,c.protocol,c.country,c.server,c.port,c.config_text,c.traffic_limit,c.expires_at FROM configs c JOIN subscription_configs sc ON sc.config_id=c.id WHERE sc.subscription_id=$1 AND c.status='active' ORDER BY c.created_at DESC",[s[0].id]);
  return NextResponse.json({subscription:s[0],configs});
}
