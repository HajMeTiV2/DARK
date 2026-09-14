import { NextResponse } from "next/server";
import { all, initDb, sql } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function GET(){
  if(!(await currentUser())) return NextResponse.json({error:"unauthorized"},{status:401});
  await initDb();
  const [users,configs,subs,acts]=await Promise.all([all("users"),all("configs"),all("subscriptions"),all("activities")]);
  const activeUsers=users.filter((x:any)=>x.status==="active").length;
  const activeConfigs=configs.filter((x:any)=>x.status==="active").length;
  return NextResponse.json({stats:{users:activeUsers,configs:activeConfigs,subscriptions:subs.filter((x:any)=>x.status==="active").length,traffic:configs.reduce((n:any,x:any)=>n+Number(x.used_traffic||0),0)},activities:acts.slice(0,8)});
}
