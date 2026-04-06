import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

// POST: Para guardar una nueva actividad tras el minteo
export async function POST(req: Request) {
  try {
    const { address, blockchain, sport, km, elev, time, xp, hash } = await req.json();
    const client = await db.connect();
    
    await client.sql`
      INSERT INTO activities (wallet_address, blockchain, sport, distance, elevation, duration, xp, tx_hash)
      VALUES (${address}, ${blockchain}, ${sport}, ${km}, ${elev}, ${time}, ${xp}, ${hash})
    `;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Para leer las actividades de un perfil o para el Ranking
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const mode = searchParams.get("mode"); // Para diferenciar si queremos perfil o ranking

  const client = await db.connect();

  // MODO RANKING: Sumamos XP por wallet
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

  // MODO PERFIL: Todas las actividades de una dirección
  if (address) {
    const { rows } = await client.sql`
      SELECT * FROM activities 
      WHERE wallet_address = ${address} 
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  }

  return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
}
