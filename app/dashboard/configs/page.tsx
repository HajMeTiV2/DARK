"use client";
import {useEffect,useState} from "react";
import {Copy,Trash2,Plus} from "lucide-react";
export default function Configs(){
 const [rows,setRows]=useState<any[]>([]);
 async function load(){const r=await fetch("/api/configs");setRows(await r.json())}
 useEffect(()=>{load()},[]);
 async function del(id:string){if(!confirm("حذف شود؟"))return;await fetch(`/api/configs/${id}`,{method:"DELETE"});load()}
 return <><div className="pagehead"><div><h1>کانفیگ‌ها</h1><p>مدیریت کانفیگ‌ها، حجم و تاریخ انقضا.</p></div><a className="btn" href="/dashboard/configs/new"><Plus size={16}/> کانفیگ جدید</a></div><section className="card glass tablecard" style={{marginTop:0}}><div className="tablewrap"><table><thead><tr><th>نام</th><th>پروتکل</th><th>کشور</th><th>حجم</th><th>انقضا</th><th>وضعیت</th><th>عملیات</th></tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{r.name}</td><td><span className="badge blue">{r.protocol}</span></td><td>{r.country||"—"}</td><td>{r.traffic_limit?`${Math.round(Number(r.traffic_limit)/1073741824)} GB`:"نامحدود"}</td><td>{r.expires_at?new Date(r.expires_at).toLocaleDateString("fa-IR"):"—"}</td><td><span className="badge green">{r.status}</span></td><td><div className="actions"><button className="mini" onClick={()=>navigator.clipboard.writeText(r.config_text)}><Copy size={14}/></button><button className="mini" onClick={()=>del(r.id)}><Trash2 size={14}/></button></div></td></tr>)}</tbody></table>{!rows.length&&<div className="empty">هنوز کانفیگی ساخته نشده است.</div>}</div></section></>
}
