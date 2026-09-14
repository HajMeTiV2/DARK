# DARK Panel 2.0 — Railway Ready

پنل کامل اولیه DARK by @Mehtif با Next.js App Router.

## قابلیت‌ها
- Login واقعی با session cookie و password hashing
- PostgreSQL روی Railway
- حالت Demo بدون DATABASE_URL برای تست سریع
- Dashboard
- Users CRUD (ساخت کاربر)
- Config CRUD (ساخت/حذف/کپی)
- پروتکل‌های UI: VLESS, VMess, Trojan, Shadowsocks, Hysteria2, TUIC, SSTP
- Subscription token و صفحه عمومی `/sub/:token`
- Copy All Configs و Copy تک‌کانفیگ
- Responsive برای موبایل و دسکتاپ
- Activity log
- تنظیمات برند DARK / @Mehtif / @V2rayTun0
- IP Scanner امن برای رنج‌های مستندسازی/آزمایشی؛ اسکن عمومی Cloudflare در این نسخه عمداً فعال نیست.

## اجرای محلی
```bash
npm install
npm run dev
```
باز کن:
`http://localhost:3000/login`

بدون DATABASE_URL، Demo mode فعال است:
- username: `admin`
- password: `admin123`

## Deploy روی Railway
1. فایل‌ها را در GitHub قرار بده.
2. در Railway از GitHub یک Service بساز.
3. یک PostgreSQL Service اضافه کن.
4. Variable زیر را برای Web Service تنظیم کن:
   - `DATABASE_URL` = اتصال PostgreSQL
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_APP_URL`
5. Deploy را انجام بده.
6. Domain عمومی Railway را بساز و تست کن.

Railway خودش Build/Start را از package.json تشخیص می‌دهد؛ در صورت نیاز:
- Build: `npm run build`
- Start: `npm start`

## نکته مهم
این نسخه از نظر پنل و backend عملیاتی است، اما «تولید خودکار URI مخصوص هر پروتکل» و «موتور اسکن IPهای عمومی» عمداً جدا نگه داشته شده‌اند. متن کانفیگ واقعی را می‌توان در Config Builder ذخیره کرد و Subscription آن را منتشر می‌کند. برای اسکن شبکه، فقط محدوده‌هایی را بررسی کنید که مجوز آن را دارید.
