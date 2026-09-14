import "./globals.css";
import type { Metadata } from "next";
export const metadata:Metadata={title:"DARK Panel",description:"DARK by @Mehtif"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fa" dir="rtl"><body>{children}</body></html>}
