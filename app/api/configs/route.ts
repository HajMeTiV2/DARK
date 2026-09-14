import { NextResponse } from "next/server";
import { all, initDb, sql } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function GET(){if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});return NextResponse.json(await all("configs"))}
export async function POST(req:Request){
  if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});
  await initDb(); const b=await req.json();
  if(!b.name||!b.protocol||!b.config_text)return NextResponse.json({error:"نام، پروتکل و متن کانفیگ لازم است."},{status:400});
  const rows=await sql("INSERT INTO configs(name,protocol,country,server,port,traffic_limit,expires_at,max_users,config_text,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,'active') RETURNING *",
    [b.name,b.protocol,b.country||null,b.server||null,Number(b.port||0),Number(b.traffic_limit||0),b.expires_at||null,Number(b.max_users||1),b.config_text]);
  await sql("INSERT INTO activities(action) VALUES($1)",[`کانفیگ ${b.name} ساخته شد`]); return NextResponse.json(rows[0]);
}
