"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Activity, FileCog, LayoutDashboard, Link2, LogOut, MoreHorizontal, ScanLine, Settings2, Users, X } from "lucide-react";

const primary = [
  ["خانه", "/dashboard", LayoutDashboard],
  ["کاربران", "/dashboard/users", Users],
  ["کانفیگ", "/dashboard/configs", FileCog],
  ["اشتراک", "/dashboard/subscriptions", Link2],
  ["اسکنر", "/dashboard/scanner", ScanLine],
] as const;

const more = [
  ["گزارشات", "/dashboard/reports", Activity],
  ["تنظیمات", "/dashboard/settings", Settings2],
] as const;

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isMore = more.some(([, href]) => pathname.startsWith(href));

  return (
    <>
      {open && (
        <div className="mobile-more-overlay" onClick={() => setOpen(false)}>
          <div className="mobile-more-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sheet-head">
              <div>
                <b>بیشتر</b>
                <small>دسترسی سریع به بخش‌های دیگر</small>
              </div>
              <button className="mobile-close" onClick={() => setOpen(false)} aria-label="بستن"><X size={19} /></button>
            </div>
            <div className="mobile-more-grid">
              {more.map(([label, href, Icon]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={pathname.startsWith(href) ? "active" : ""}>
                  <span><Icon size={21} /></span>
                  <b>{label}</b>
                </Link>
              ))}
              <form action="/api/auth/logout" method="post">
                <button type="submit">
                  <span className="danger"><LogOut size={21} /></span>
                  <b>خروج</b>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <nav className="mobile-nav" aria-label="ناوبری موبایل">
        {primary.map(([label, href, Icon]) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={active ? "active" : ""}>
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
            </Link>
          );
        })}
        <button className={isMore || open ? "active" : ""} onClick={() => setOpen(true)}>
          <MoreHorizontal size={21} />
          <span>بیشتر</span>
        </button>
      </nav>
    </>
  );
}
