import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sport = (searchParams.get("sport") || "road").toLowerCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";
    const isJson = searchParams.get("json") === "1";

    const host = req.headers.get("host") || "onchainkms-base.vercel.app";
    const baseURL = `https://${host}`;

    // 1. MODO JSON
    if (isJson) {
      return new Response(JSON.stringify({
        name: `Onchain ${sport.toUpperCase()}`,
        image: `${baseURL}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "XP", value: Number(xp) }
        ]
      }), { headers: { "content-type": "application/json" } });
    }

    // 2. MODO IMAGEN
    const imgUrl = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#020617", // FONTO DE SEGURIDAD (Si la imagen falla, se verá esto)
            color: "white",
            padding: "60px",
            position: "relative",
          }}
        >
          {/* Intentamos cargar la imagen de fondo. Si es muy pesada, el motor la ignorará y usará el bgColor */}
          <img
            src={imgUrl}
            width="1200"
            height="630"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
            }}
          />

          {/* Overlay para legibilidad */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.85), rgba(0,0,0,0.2))",
          }} />

          <div style={{ display: "flex", flexDirection: "column", position: "relative", marginTop: "auto" }}>
            <span style={{ fontSize: 28, color: "#fbbf24", fontWeight: "bold", letterSpacing: 2 }}>
              ONCHAIN KMS
            </span>
            <h1 style={{ fontSize: 110, margin: "10px 0", fontWeight: 900, textTransform: "uppercase" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "30px", fontSize: 45, fontWeight: "bold" }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: 30, 
              padding: "12px 35px", 
              background: "#fbbf24", 
              color: "black", 
              fontSize: 50, 
              fontWeight: "bold", 
              borderRadius: 15,
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
    // Si hay un error catastrófico, devolvemos un texto simple para no dar blanco
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
