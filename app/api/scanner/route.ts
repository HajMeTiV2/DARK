import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import net from "net";

const allowedExamples = ["192.0.2.0/24","198.51.100.0/24","203.0.113.0/24"];
function validCidr(cidr:string){const [ip,bits]=cidr.split("/");return net.isIP(ip)===4 && Number(bits)>=0 && Number(bits)<=32;}
export async function POST(req:Request){
  if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});
  const {cidr}=await req.json();
  if(!cidr || !validCidr(cidr)) return NextResponse.json({error:"CIDR معتبر وارد کنید."},{status:400});
  if(!allowedExamples.includes(cidr)) return NextResponse.json({error:"این نسخه فقط رنج‌های مستندسازی/آزمایشی مجاز را شبیه‌سازی می‌کند. برای اسکن زیرساخت واقعی، محدوده مجاز و موتور اسکن سازمانی جداگانه لازم است."},{status:403});
  return NextResponse.json({results:allowedExamples.map((_,i)=>({ip:`203.0.113.${10+i}`,latency:18+i*7,status:"demo",selected:false}))});
}
