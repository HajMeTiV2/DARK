import crypto from "crypto";
import { cookies } from "next/headers";
import { initDb, sql } from "./db";

const COOKIE = "dark_session";

function secret() { return process.env.AUTH_SECRET || "development-secret-change-me"; }
function sign(value: string) {
  return crypto.createHmac("sha256", secret()).update(value).digest("hex");
}
export function makeSession(userId: string) {
  const value = `${userId}.${Date.now()}`;
  return `${value}.${sign(value)}`;
}
export function validSession(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const value = `${parts[0]}.${parts[1]}`;
  return crypto.timingSafeEqual(Buffer.from(parts[2]), Buffer.from(sign(value)));
}
export async function currentUser() {
  await initDb();
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!validSession(token)) return null;
  const id = token!.split(".")[0];
  const rows = await sql("SELECT id,username,email,role,status FROM users WHERE id=$1 LIMIT 1", [id]);
  return rows[0] || null;
}
export const sessionCookie = COOKIE;
