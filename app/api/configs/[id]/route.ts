import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";
import { currentUser } from "@/lib/auth";
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){if(!(await currentUser()))return NextResponse.json({error:"unauthorized"},{status:401});await initDb();const {id}=await params;await sql("DELETE FROM configs WHERE id=$1",[id]);return NextResponse.json({ok:true})}
