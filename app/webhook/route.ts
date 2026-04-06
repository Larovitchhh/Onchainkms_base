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

    if (mode === "ranking") {
      const { rows } = await client.sql`
        SELECT wallet_address, SUM(xp) as total_xp, COUNT(*) as total_activities
        FROM activities 
        GROUP BY wallet_address 
        ORDER BY total_xp DESC 
        LIMIT 10
      `;
      return NextResponse.json(rows);
    }

    if (address) {
      // Usamos LOWER para comparar siempre en minúsculas
      const { rows } = await client.sql`
        SELECT * FROM activities 
        WHERE LOWER(wallet_address) = ${address.toLowerCase()} 
        ORDER BY created_at DESC
      `;
      return NextResponse.json(rows);
    }

    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
