import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
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
            backgroundColor: "#020617", // Fondo azul muy oscuro
            color: "white",
            padding: "60px",
            fontFamily: "sans-serif",
            border: "20px solid #fbbf24", // Borde dorado
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
            <span style={{ fontSize: 30, color: "#fbbf24", fontWeight: "bold", letterSpacing: 5 }}>
              ONCHAIN KMS
            </span>
            <h1 style={{ fontSize: 120, margin: "10px 0", fontWeight: "bold" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "40px", fontSize: 50 }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: 40, 
              padding: "20px 40px", 
              background: "#fbbf24", 
              color: "black", 
              fontSize: 60, 
              fontWeight: "bold", 
              borderRadius: 20,
              alignSelf: "flex-start"
            }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Error crítico: ${e.message}`, { status: 500 });
  }
}
