"use client";


import Link from "next/link";
import {
LayoutDashboard,
FileCog,
Link2,
ScanLine,
Users
} from "lucide-react";

import {usePathname} from "next/navigation";



const items=[

["خانه","/dashboard",LayoutDashboard],

["کاربران","/dashboard/users",Users],

["کانفیگ","/dashboard/configs",FileCog],

["ساب","/dashboard/subscriptions",Link2],

["اسکن","/dashboard/scanner",ScanLine]

];



export default function MobileNav(){


const path=usePathname();



return (

<nav className="bottom-nav">


{
items.map(([name,url,Icon]:any)=>(


<Link
href={url}
key={url}
className={
path===url ? "active":""
}
>


<Icon size={21}/>

<span>
{name}
</span>


</Link>


))

}



</nav>


)

}
