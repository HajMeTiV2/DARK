import Link from "next/link";
import {
LayoutDashboard,
Users,
FileCog,
Link2,
ScanLine,
Activity,
Settings2,
LogOut,
Menu
} from "lucide-react";

import MobileNav from "./MobileNav";


const nav=[
["داشبورد","/dashboard",LayoutDashboard],
["کاربران","/dashboard/users",Users],
["کانفیگ‌ها","/dashboard/configs",FileCog],
["اشتراک‌ها","/dashboard/subscriptions",Link2],
["اسکنر","/dashboard/scanner",ScanLine],
["گزارشات","/dashboard/reports",Activity],
["تنظیمات","/dashboard/settings",Settings2]
];


export default function Layout({
children
}:{
children:React.ReactNode
}){


return (

<div className="dark-shell">


{/* desktop sidebar */}

<aside className="dark-sidebar">


<div className="dark-logo">

<img src="/logo.svg"/>

<div>

<b>DARK</b>

<small>
@Mehtif
</small>

</div>

</div>



<nav>

{
nav.map(([name,url,Icon]:any)=>(

<Link
href={url}
key={url}
>

<Icon size={18}/>

<span>
{name}
</span>

</Link>

))
}

</nav>



<form action="/api/auth/logout" method="post">

<button className="dark-logout">

<LogOut size={17}/>

خروج

</button>

</form>


</aside>





{/* main */}


<main className="dark-main">


<header className="dark-header">


<div className="mobile-title">


<img src="/logo.svg"/>


<div>

<b>
DARK
</b>


<small>
@Mehtif
</small>


</div>


</div>



<div className="dark-search">

<input placeholder="جستجو..."/>

</div>



<div className="dark-user">

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



<section className="dark-page">

{children}

</section>


</main>



<MobileNav/>


</div>


)

}
