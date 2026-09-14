import { NextResponse } from "next/server";
export async function GET(){return NextResponse.json({ok:true,service:"DARK",creator:"@Mehtif",telegram:"@V2rayTun0",time:new Date().toISOString()})}
