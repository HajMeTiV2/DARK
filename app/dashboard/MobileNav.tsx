"use client";


import Link from "next/link";
import {usePathname} from "next/navigation";

import {
 LayoutDashboard,
 Users,
 FileCog,
 Link2,
 ScanLine,
 Settings2
} from "lucide-react";



const items=[

{
 title:"خانه",
 url:"/dashboard",
 icon:LayoutDashboard
},

{
 title:"کاربر",
 url:"/dashboard/users",
 icon:Users
},

{
 title:"کانفیگ",
 url:"/dashboard/configs",
 icon:FileCog
},

{
 title:"ساب",
 url:"/dashboard/subscriptions",
 icon:Link2
},

{
 title:"اسکن",
 url:"/dashboard/scanner",
 icon:ScanLine
},

{
 title:"تنظیم",
 url:"/dashboard/settings",
 icon:Settings2
}

];



export default function MobileNav(){


const pathname=usePathname();



return (

<nav className="mobile-nav">


{
items.map(item=>{


const Icon=item.icon;

const active =
pathname===item.url ||
pathname.startsWith(item.url+"/");


return (

<Link

href={item.url}

key={item.url}

className={
active ? "active" : ""
}

>


<Icon size={20}/>


<span>
{item.title}
</span>


</Link>


)


})

}


</nav>

)

}
