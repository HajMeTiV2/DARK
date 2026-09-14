"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileCog,
  Link2,
  Activity,
  Plus,
  Server,
} from "lucide-react";


export default function Dashboard() {

  const [data,setData]=useState<any>(null);


  useEffect(()=>{

    fetch("/api/dashboard")
      .then(r=>r.json())
      .then(setData);

  },[]);



  const stats=data?.stats || {
    users:0,
    configs:0,
    subscriptions:0,
    traffic:0
  };



  const cards=[
    {
      title:"کاربران",
      value:stats.users,
      icon:Users
    },
    {
      title:"کانفیگ‌ها",
      value:stats.configs,
      icon:FileCog
    },
    {
      title:"اشتراک‌ها",
      value:stats.subscriptions,
      icon:Link2
    },
    {
      title:"مصرف",
      value:
      `${(Number(stats.traffic)/1073741824).toFixed(1)} GB`,
      icon:Activity
    }
  ];



return (

<>

<div className="pagehead">

<div>

<h1>DARK Panel</h1>

<p>
مدیریت کامل سرویس‌ها
</p>

</div>


<a
className="btn"
href="/dashboard/configs/new"
>
<Plus size={15}/>
کانفیگ جدید
</a>


</div>



<div className="stats dark-mobile-stats">


{
cards.map((item:any)=>{

const Icon=item.icon;


return (

<div
className="stat glass"
key={item.title}
>


<div className="statrow">

<span className="muted">
{item.title}
</span>


<div className="iconbox">
<Icon size={18}/>
</div>


</div>


<div className="value">
{item.value}
</div>


</div>

)

})
}


</div>





<div className="mobile-dashboard-grid">


<div className="card glass">


<div className="cardtitle">

<h3>
وضعیت سیستم
</h3>

</div>


<div className="server-box">

<Server size={30}/>

<div>

<b>
Online
</b>

<small>
Railway Server
</small>

</div>


</div>


</div>





<div className="card glass">


<div className="cardtitle">

<h3>
فعالیت اخیر
</h3>


</div>



<div className="activity">


{
(data?.activities || [])
.slice(0,5)
.map((x:any)=>(

<div key={x.id}>

<span>
{x.action}
</span>

<small>
{new Date(x.created_at)
.toLocaleDateString("fa-IR")}
</small>

</div>

))

}


</div>


</div>


</div>


</>

)

}
