import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
export async function GET(){if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});return NextResponse.json({project:"DARK",creator:"@Mehtif",telegram:"@V2rayTun0",protocols:["VLESS","VMess","Trojan","Shadowsocks","Hysteria2","TUIC","SSTP"]})}
