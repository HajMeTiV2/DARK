import { NextResponse } from "next/server";
import { all, initDb, sql } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/password";
export async function GET(){ if(!(await currentUser())) return NextResponse.json({error:"unauthorized"},{status:401}); return NextResponse.json(await all("users")); }
export async function POST(req:Request){
  if(!(await currentUser())) return NextResponse.json({error:"unauthorized"},{status:401});
  await initDb(); const b=await req.json();
  if(!b.username||!b.password) return NextResponse.json({error:"نام کاربری و رمز عبور لازم است."},{status:400});
  const rows=await sql("INSERT INTO users(username,email,password_hash,traffic_limit,expires_at,max_devices,status,role) VALUES($1,$2,$3,$4,$5,$6,'active','user') RETURNING id,username,email,traffic_limit,expires_at,max_devices,status",
    [b.username,b.email||null,await hashPassword(b.password),Number(b.traffic_limit||0),b.expires_at||null,Number(b.max_devices||1)]);
  await sql("INSERT INTO activities(action) VALUES($1)",[`کاربر ${b.username} ساخته شد`]); return NextResponse.json(rows[0]);
}
