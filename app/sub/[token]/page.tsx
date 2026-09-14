"use client";
import Image from "next/image";
import {useEffect,useState} from "react";
export default function PublicSub({params}:{params:Promise<{token:string}>}){
 const [data,setData]=useState<any>(null),[token,setToken]=useState("");
 useEffect(()=>{params.then(p=>{setToken(p.token);fetch(`/api/subscriptions/${p.token}`).then(r=>r.json()).then(setData)})},[params]);
 if(!data)return <main className="publicpage"><div className="publiccard glass">در حال بارگذاری...</div></main>;
 if(data.error)return <main className="publicpage"><div className="publiccard glass"><h2>Subscription پیدا نشد</h2></div></main>;
 const all=data.configs.map((c:any)=>c.config_text).join("\n");
 return <main className="publicpage"><div className="publiccard glass"><Image src="/logo.svg" width={65} height={65} alt="DARK"/><h1>DARK</h1><p className="muted">Subscription</p><div className="substats"><div><b>{Math.round(Number(data.subscription.traffic_limit)/1073741824)} GB</b><small>حجم کل</small></div><div><b>{data.configs.length}</b><small>کانفیگ</small></div><div><b>{data.subscription.expires_at?new Date(data.subscription.expires_at).toLocaleDateString("fa-IR"):"∞"}</b><small>انقضا</small></div></div><button className="btn wide" onClick={()=>navigator.clipboard.writeText(all)}>کپی همه کانفیگ‌ها</button><div className="configlist">{data.configs.map((c:any)=><div className="configrow" key={c.id}><div><b>{c.name}</b><small>{c.protocol} · {c.country||"Global"}</small></div><button className="mini" onClick={()=>navigator.clipboard.writeText(c.config_text)}>Copy</button></div>)}</div><div className="footer">عضویت و پشتیبانی: @V2rayTun0 · DARK by @Mehtif</div></div></main>
}
