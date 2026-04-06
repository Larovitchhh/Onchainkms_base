import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { address, blockchain, sport, km, elev, time, xp, hash } = await req.json();
    const client = await db.connect();
    
    // IMPORTANTE: .toLowerCase() para evitar problemas de búsqueda luego
    await client.sql`
      INSERT INTO activities (wallet_address, blockchain, sport, distance, elevation, duration, xp, tx_hash)
      VALUES (${address.toLowerCase()}, ${blockchain}, ${sport}, ${km}, ${elev}, ${time}, ${xp}, ${hash})
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");
    const mode = searchParams.get("mode");

    const client = await db.connect();

    // MODO RANKING: Sumamos todo y ordenamos por número de actividades
    if (mode === "ranking") {
      const { rows } = await client.sql`
        SELECT 
          wallet_address, 
          COUNT(*) as total_activities, 
          SUM(CAST(xp AS DECIMAL)) as total_xp, 
          SUM(CAST(distance AS DECIMAL)) as total_km, 
          SUM(CAST(elevation AS DECIMAL)) as total_elevation,
          SUM(CAST(duration AS DECIMAL)) as total_time
        FROM activities 
        GROUP BY wallet_address 
        ORDER BY total_activities DESC 
        LIMIT 20
      `;
      return NextResponse.json(rows);
    }

    // MODO PERFIL: Historial individual
    if (address) {
      const { rows } = await client.sql`
        SELECT * FROM activities 
        WHERE LOWER(wallet_address) = ${address.toLowerCase()} 
        ORDER BY created_at DESC
      `;
      return NextResponse.json(rows);
    }

    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
