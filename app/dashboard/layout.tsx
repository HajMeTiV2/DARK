"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FileCog,
  Link2,
  Radar,
  Settings,
  LogOut
} from "lucide-react";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "داشبورد",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "کاربران",
    href: "/dashboard/users",
    icon: Users
  },
  {
    title: "کانفیگ‌ها",
    href: "/dashboard/configs",
    icon: FileCog
  },
  {
    title: "اشتراک‌ها",
    href: "/dashboard/subscriptions",
    icon: Link2
  },
  {
    title: "اسکنر",
    href: "/dashboard/scanner",
    icon: Radar
  },
  {
    title: "تنظیمات",
    href: "/dashboard/settings",
    icon: Settings
  }
];


function NavItems(){

  const path = usePathname();

  return (
    <>
      {
        menu.map(item=>{

          const Icon=item.icon;
          const active =
            path === item.href ||
            path.startsWith(item.href+"/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={active ? "active":""}
            >
              <Icon size={18}/>
              <span>{item.title}</span>
            </Link>
          )

        })
      }
    </>
  )
}



export default function DashboardLayout({
 children
}:{
 children:React.ReactNode
}){


return (

<div className="layout">


<aside className="sidebar glass">

<div className="brand">

<img src="/logo.png"/>

<div>
<b>DARK</b>
<small>@Mehtif</small>
</div>

</div>


<nav>

<NavItems/>

</nav>


<form action="/api/auth/logout" method="post">

<button className="logout">

<LogOut size={17}/>

خروج

</button>

</form>


</aside>




<main className="content">


<div className="topbar">


<div className="mobile-brand">

<img src="/logo.png"/>

<div>
<b>DARK</b>
<small>@Mehtif</small>
</div>

</div>



<div className="userpill">

<div className="avatar">
D
</div>

<div>
<b>Admin</b>
<small>مدیر پنل</small>
</div>

</div>


</div>



{children}


</main>




<div className="mobile-nav">

<NavItems/>

</div>


</div>


)

}
