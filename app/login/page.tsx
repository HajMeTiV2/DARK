"use client";
import Image from "next/image";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function Login(){
 const [username,setUsername]=useState("admin"),[password,setPassword]=useState("admin123"),[error,setError]=useState(""),[loading,setLoading]=useState(false);
 const router=useRouter();
 async function submit(e:React.FormEvent){e.preventDefault();setLoading(true);setError("");const r=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username,password})});const d=await r.json();setLoading(false);if(!r.ok)return setError(d.error||"خطا");router.push("/dashboard");router.refresh()}
 return <main className="loginpage"><form className="loginbox glass" onSubmit={submit}><Image src="/logo.svg" alt="DARK" width={82} height={82}/><h1>DARK</h1><p className="muted">پنل مدیریت حرفه‌ای · by @Mehtif</p><div className="field"><label>نام کاربری</label><input value={username} onChange={e=>setUsername(e.target.value)}/></div><div className="field"><label>رمز عبور</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)}/></div>{error&&<div className="error">{error}</div>}<button className="btn wide" disabled={loading}>{loading?"در حال ورود...":"ورود به پنل"}</button><div className="footer">کانال تلگرام: @V2rayTun0<br/>در Demo بدون DATABASE_URL قابل تست است.</div></form></main>
}
