"use client";
import {useEffect,useState} from "react";
import {Users,FileCog,Link2,Activity} from "lucide-react";
export default function Dashboard(){
 const [d,setD]=useState<any>(null);
 useEffect(()=>{fetch("/api/dashboard").then(r=>r.json()).then(setD)},[]);
 const s=d?.stats||{users:0,configs:0,subscriptions:0,traffic:0};
 return <><div className="pagehead"><div><h1>داشبورد</h1><p>وضعیت کلی DARK را از اینجا مدیریت کنید.</p></div><a className="btn" href="/dashboard/configs/new">+ ساخت کانفیگ</a></div><div className="stats">{[["کاربران فعال",s.users,Users],["کانفیگ‌ها",s.configs,FileCog],["اشتراک‌ها",s.subscriptions,Link2],["مصرف کل",`${(Number(s.traffic)/1073741824).toFixed(1)} GB`,Activity]].map(([t,v,I]:any)=><div className="stat glass" key={t}><div className="statrow"><span className="muted">{t}</span><div className="iconbox"><I size={19}/></div></div><div className="value">{v}</div></div>)}</div><div className="grid2"><section className="card glass"><div className="cardtitle"><h3>مصرف هفتگی</h3><span className="badge blue">Live UI</span></div><div className="chart">{[35,52,43,61,50,74,64,88,76,94].map((h,i)=><i className="bar" style={{height:`${h}%`}} key={i}/>)}</div></section><section className="card glass"><div className="cardtitle"><h3>پروتکل‌ها</h3></div><div className="donut"/><div className="legend">{["VLESS","VMess","Trojan","Shadowsocks","Hysteria2"].map((x,i)=><div key={x}><span>● {x}</span><b>{[38,24,16,12,10][i]}%</b></div>)}</div></section></div><section className="card glass tablecard"><div className="cardtitle"><h3>آخرین فعالیت‌ها</h3></div><div className="activity">{(d?.activities||[]).map((x:any)=><div key={x.id}><span>{x.action}</span><small>{new Date(x.created_at).toLocaleString("fa-IR")}</small></div>)}</div></section></>
}
