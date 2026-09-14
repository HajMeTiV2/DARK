import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { makeSession, sessionCookie } from "@/lib/auth";

export async function POST(req: Request) {
  await initDb();
  const { username, password } = await req.json();
  if (!username || !password) return NextResponse.json({error:"نام کاربری و رمز عبور الزامی است."},{status:400});
  const rows = await sql<any>("SELECT id,username,password_hash,status,role FROM users WHERE username=$1 LIMIT 1",[username]);
  if (!rows.length || rows[0].status !== "active" || !(await verifyPassword(password, rows[0].password_hash)))
    return NextResponse.json({error:"اطلاعات ورود صحیح نیست."},{status:401});
  const res = NextResponse.json({ok:true});
  res.cookies.set(sessionCookie, makeSession(rows[0].id), {httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7});
  await sql("INSERT INTO activities(action) VALUES($1)",["ورود مدیر به پنل"]);
  return res;
}
