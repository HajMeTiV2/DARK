"use client";

import {useEffect,useState} from "react";
import {
 Users,
 FileCog,
 Link2,
 Activity
} from "lucide-react";


export default function Dashboard(){

const [d,setD]=useState<any>(null);


useEffect(()=>{

fetch("/api/dashboard")
.then(r=>r.json())
.then(setD)

},[]);



const s=d?.stats || {
users:0,
configs:0,
subscriptions:0,
traffic:0
};



const cards=[

{
title:"کاربران فعال",
value:s.users,
icon:Users
},

{
title:"کانفیگ‌ها",
value:s.configs,
icon:FileCog
},

{
title:"اشتراک‌ها",
value:s.subscriptions,
icon:Link2
},

{
title:"مصرف کل",
value:
`${(Number(s.traffic)/1073741824).toFixed(1)} GB`,
icon:Activity
}

];



return (

<>


<div className="pagehead">

<div>

<h1>
داشبورد
</h1>

<p>
وضعیت کلی DARK
</p>

</div>


<a
className="btn"
href="/dashboard/configs/new"
>
+ کانفیگ
</a>


</div>





<div className="mobile-dashboard-grid">


{
cards.map((c:any)=>{

const Icon=c.icon;


return (

<div
className="mobile-stat-card glass"
key={c.title}
>


<div className="mobile-stat-top">


<span>
{c.title}
</span>


<div className="iconbox">

<Icon size={18}/>

</div>


</div>


<strong>
{c.value}
</strong>


</div>

)

})

}


</div>






<div className="mobile-dashboard-box glass">


<div className="cardtitle">

<h3>
مصرف هفتگی
</h3>

<span className="badge blue">
LIVE
</span>

</div>



<div className="chart">


{
[35,52,43,61,50,74,64,88].map((x,i)=>(

<div
className="bar"
style={{
height:`${x}%`
}}
key={i}
/>

))

}


</div>


</div>







<div className="mobile-dashboard-box glass">


<h3>
پروتکل‌ها
</h3>


<div className="protocol-list">


{
[
["VLESS","38%"],
["VMess","24%"],
["Trojan","16%"],
["Shadowsocks","12%"],
["Hysteria2","10%"]

].map(x=>(


<div key={x[0]}>

<span>
{x[0]}
</span>

<b>
{x[1]}
</b>

</div>


))

}


</div>


</div>





<div className="mobile-dashboard-box glass">


<h3>
آخرین فعالیت‌ها
</h3>


<div className="activity">


{
(d?.activities||[]).map((x:any)=>(

<div key={x.id}>

<span>
{x.action}
</span>


<small>
{
new Date(x.created_at)
.toLocaleString("fa-IR")
}
</small>


</div>

))

}


</div>


</div>



</>

)

}
