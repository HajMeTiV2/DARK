import { NextResponse } from "next/server";
import { initDb, sql } from "@/lib/db";


export async function GET(
  _: Request,
  { params }: { params: Promise<{ token: string }> }
) {

  await initDb();

  const { token } = await params;


  const subscriptions = await sql<any>(
    `
    SELECT *
    FROM subscriptions
    WHERE token=$1
    AND status='active'
    LIMIT 1
    `,
    [token]
  );


  if (!subscriptions.length) {

    return NextResponse.json(
      {
        error:"Subscription not found"
      },
      {
        status:404
      }
    );

  }



  const subscription = subscriptions[0];



  const configs = await sql<any>(
    `
    SELECT
      c.id,
      c.name,
      c.protocol,
      c.country,
      c.server,
      c.port,
      c.config_text,
      c.traffic_limit,
      c.expires_at

    FROM configs c

    INNER JOIN subscription_configs sc

    ON sc.config_id = c.id

    WHERE sc.subscription_id=$1

    AND c.status='active'

    ORDER BY c.created_at DESC

    `,
    [
      subscription.id
    ]
  );



  return NextResponse.json(
    {
      subscription,
      configs,
      debug:{
        subscription_id:subscription.id,
        configs_found:configs.length
      }
    }
  );

}
