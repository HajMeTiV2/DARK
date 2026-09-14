import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileCog,
  Link2,
  ScanLine,
  Activity,
  Settings2,
  LogOut
} from "lucide-react";

import MobileNav from "./MobileNav";


const nav = [
  ["داشبورد","/dashboard",LayoutDashboard],
  ["کاربران","/dashboard/users",Users],
  ["کانفیگ‌ها","/dashboard/configs",FileCog],
  ["اشتراک‌ها","/dashboard/subscriptions",Link2],
  ["IP اسکنر","/dashboard/scanner",ScanLine],
  ["گزارشات","/dashboard/reports",Activity],
  ["تنظیمات","/dashboard/settings",Settings2]
];



export default function Layout({
 children
}:{
 children:React.ReactNode
}){


return (

<div className="layout">


<aside className="sidebar glass">


<div className="brand">

<img src="/logo.svg" alt="DARK"/>

<div>

<b>DARK</b>

<small>
@Mehtif
</small>

</div>

</div>



<nav>

{
nav.map(([title,url,Icon]:any)=>(

<Link
href={url}
key={url}
>

<Icon size={18}/>

<span>
{title}
</span>

</Link>

))
}

</nav>



<form
action="/api/auth/logout"
method="post"
>

<button className="logout">

<LogOut size={17}/>

<span>
خروج
</span>

</button>

</form>



</aside>





<main className="content">


<header className="topbar">


<div className="mobile-brand">

<img src="/logo.svg" alt="DARK"/>

<div>

<b>
DARK
</b>

<small>
@Mehtif
</small>

</div>


</div>



<div className="search">

<span>
⌕
</span>

<input
placeholder="جستجو..."
/>

</div>




<div className="userpill">


<div className="avatar">
M
</div>


<div>

<b>
Mehtif
</b>

<small>
Administrator
</small>

</div>


</div>



</header>



{children}



</main>




<MobileNav />


</div>

)

}
