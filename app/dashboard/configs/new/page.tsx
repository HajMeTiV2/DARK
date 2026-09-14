"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
const protocols=["VLESS","VMess","Trojan","Shadowsocks","Hysteria2","TUIC","SSTP"];
export default function NewConfig(){
 const [b,setB]=useState<any>({protocol:"VLESS",name:"",country:"Germany",server:"",port:443,traffic_limit:50*1073741824,max_users:1,expires_at:"",config_text:""});
 const [error,setError]=useState("");const router=useRouter();
 const set=(k:string,v:any)=>setB({...b,[k]:v});
 async function save(){setError("");const r=await fetch("/api/configs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)});const d=await r.json();if(!r.ok)return setError(d.error);router.push("/dashboard/configs")}
 return <><div className="pagehead"><div><h1>ساخت کانفیگ جدید</h1><p>اطلاعات کانفیگ را وارد کنید.</p></div><button className="btn secondary" onClick={()=>router.back()}>بازگشت</button></div><section className="card glass"><div className="tabs">{protocols.map(x=><button className={`tab ${b.protocol===x?"active":""}`} onClick={()=>set("protocol",x)} key={x}>{x}</button>)}</div><div className="formgrid">{[["name","نام کانفیگ","DARK-DE-01"],["server","دامنه / سرور","example.com"],["port","پورت","443"],["traffic_limit","حجم (GB)","50"],["max_users","حداکثر کاربران","1"],["expires_at","تاریخ انقضا",""]].map(([k,l,p]:any)=><div className="field" key={k}><label>{l}</label><input type={k==="expires_at"?"date":"text"} value={k==="traffic_limit"?Number(b[k])/1073741824:b[k]} placeholder={p} onChange={e=>set(k,k==="traffic_limit"?Number(e.target.value)*1073741824:k==="port"||k==="max_users"?Number(e.target.value):e.target.value)}/></div>)}<div className="field full"><label>متن کانفیگ / URI</label><textarea value={b.config_text} onChange={e=>set("config_text",e.target.value)} placeholder="متن کانفیگ خودتان را اینجا قرار دهید..."/></div></div>{error&&<div className="error">{error}</div>}<button className="btn" onClick={save}>ساخت کانفیگ</button></section></>
}
