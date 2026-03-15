import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge"; // Volvemos a Edge por velocidad

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sport = (searchParams.get("sport") || "road").toUpperCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#000", // FONTO NEGRO SOLIDO (Sin imágenes pesadas)
            color: "white",
            padding: "80px",
            justifyContent: "center"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", borderLeft: "10px solid #fbbf24", paddingLeft: "40px" }}>
            <p style={{ fontSize: 40, color: '#fbbf24', margin: 0 }}>ONCHAIN KMS</p>
            <h1 style={{ fontSize: 160, margin: "20px 0", fontWeight: 900 }}>{sport}</h1>
            <div style={{ display: 'flex', gap: '40px', fontSize: 60 }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ marginTop: '40px', fontSize: 100, fontWeight: 'bold', color: '#fbbf24' }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 } // Tamaño estándar más ligero
    );
  } catch (e: any) {
    return new Response("Error fatal", { status: 500 });
  }
}
