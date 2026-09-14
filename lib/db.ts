import { Pool } from "pg";

type Row = Record<string, any>;

let pool: Pool | null = null;
const memory: Record<string, Row[]> = {
  users: [],
  configs: [],
  subscriptions: [],
  activities: []
};

function useMemory() {
  return !process.env.DATABASE_URL;
}

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL?.includes("railway") || process.env.NODE_ENV === "production"
        ? { rejectUnauthorized: false } : undefined,
      max: 5
    });
  }
  return pool;
}

export async function sql<T = Row>(text: string, values: any[] = []): Promise<T[]> {
  if (useMemory()) return memoryQuery<T>(text, values);
  const result = await getPool().query(text, values);
  return result.rows as T[];
}

function memoryQuery<T>(text: string, values: any[]): T[] {
  const t = text.toLowerCase().replace(/\s+/g, " ").trim();
  if (t.startsWith("select") && t.includes("from users")) return memory.users as T[];
  if (t.startsWith("select") && t.includes("from configs")) return memory.configs as T[];
  if (t.startsWith("select") && t.includes("from subscriptions")) {
    if (t.includes("where token=$1")) return memory.subscriptions.filter((x:any)=>x.token===values[0]) as T[];
    return memory.subscriptions as T[];
  }
  if (t.startsWith("select") && t.includes("from activities")) return memory.activities as T[];
  if (t.startsWith("select") && t.includes("from users") && t.includes("where id=$1")) return memory.users.filter((x:any)=>x.id===values[0]) as T[];
  if (t.startsWith("insert into users")) {
    const row = {id: crypto.randomUUID(), username: values[0], email: values[1], password_hash: values[2], traffic_limit: values[3], expires_at: values[4], max_devices: values[5], status: "active", created_at: new Date().toISOString()};
    memory.users.push(row); return [row] as T[];
  }
  if (t.startsWith("insert into configs")) {
    const row = {id: crypto.randomUUID(), name: values[0], protocol: values[1], country: values[2], server: values[3], port: values[4], traffic_limit: values[5], expires_at: values[6], max_users: values[7], config_text: values[8], status: "active", created_at: new Date().toISOString()};
    memory.configs.push(row); return [row] as T[];
  }
  if (t.startsWith("insert into activities")) { const row={id:crypto.randomUUID(),action:values[0],created_at:new Date().toISOString()}; memory.activities.unshift(row); return [row] as T[]; }
  if (t.startsWith("insert into subscriptions")) {
    const row = {id: crypto.randomUUID(), token: values[0], user_id: values[1], traffic_limit: values[2], expires_at: values[3], status: "active", created_at: new Date().toISOString()};
    memory.subscriptions.push(row); return [row] as T[];
  }
  return [] as T[];
}

export async function initDb() {
  if (useMemory()) {
    if (!memory.users.length) {
      const username = process.env.ADMIN_USERNAME || "admin";
      const password = process.env.ADMIN_PASSWORD || "admin123";
      const { hashPassword } = await import("./password");
      memory.users.push({
        id: "admin",
        username, email: "admin@dark.local", password_hash: await hashPassword(password),
        traffic_limit: 0, expires_at: null, max_devices: 99, status: "active",
        role: "admin", created_at: new Date().toISOString()
      });
      memory.activities.unshift({id: crypto.randomUUID(), action: "سیستم در حالت Demo اجرا شد", created_at: new Date().toISOString()});
    }
    return;
  }
  await sql(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      password_hash TEXT NOT NULL,
      traffic_limit BIGINT DEFAULT 0,
      used_traffic BIGINT DEFAULT 0,
      expires_at TIMESTAMPTZ,
      max_devices INT DEFAULT 1,
      status TEXT DEFAULT 'active',
      role TEXT DEFAULT 'user',
      created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS configs (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      protocol TEXT NOT NULL,
      country TEXT,
      server TEXT,
      port INT,
      traffic_limit BIGINT DEFAULT 0,
      used_traffic BIGINT DEFAULT 0,
      expires_at TIMESTAMPTZ,
      max_users INT DEFAULT 1,
      config_text TEXT NOT NULL,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token TEXT UNIQUE NOT NULL,
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      traffic_limit BIGINT DEFAULT 0,
      used_traffic BIGINT DEFAULT 0,
      expires_at TIMESTAMPTZ,
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS subscription_configs (
      subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
      config_id UUID REFERENCES configs(id) ON DELETE CASCADE,
      PRIMARY KEY(subscription_id, config_id)
    );
    CREATE TABLE IF NOT EXISTS activities (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      action TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );
  `);
  const admin = await sql<{id:string}>("SELECT id FROM users WHERE username=$1 LIMIT 1", [process.env.ADMIN_USERNAME || "admin"]);
  if (!admin.length) {
    const { hashPassword } = await import("./password");
    await sql("INSERT INTO users(username,email,password_hash,traffic_limit,max_devices,status,role) VALUES($1,$2,$3,0,99,'active','admin')",
      [process.env.ADMIN_USERNAME || "admin", "admin@dark.local", await hashPassword(process.env.ADMIN_PASSWORD || "admin123")]);
  }
}

export async function all<T=Row>(table: string) {
  await initDb();
  return sql<T>(`SELECT * FROM ${table} ORDER BY created_at DESC`);
}
