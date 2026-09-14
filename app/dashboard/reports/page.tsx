"use client";
import {useEffect,useState} from "react";
export default function Reports(){const [a,setA]=useState<any[]>([]);useEffect(()=>{fetch("/api/dashboard").then(r=>r.json()).then(x=>setA(x.activities||[]))},[]);return <><div className="pagehead"><div><h1>گزارشات</h1><p>رویدادهای اخیر پنل.</p></div></div><section className="card glass"><div className="activity">{a.map(x=><div key={x.id}><span>{x.action}</span><small>{new Date(x.created_at).toLocaleString("fa-IR")}</small></div>)}</div></section></>}
