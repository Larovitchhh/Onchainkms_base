import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; 

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

    // 1. MODO JSON (Para los marketplaces de NFT)
    if (isJson) {
      return new Response(JSON.stringify({
        name: `Onchain ${sport.toUpperCase()}`,
        description: `Activity NFT: ${km}km - ${xp} XP`,
        image: `${baseURL}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "XP", value: Number(xp) }
        ]
      }), { headers: { "content-type": "application/json" } });
    }

    // 2. MODO IMAGEN
    const backgroundImage = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#020617",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          {/* Overlay oscuro para legibilidad si la imagen tarda en cargar */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            padding: "80px",
            position: "relative",
            marginTop: "auto",
            marginBottom: "auto"
          }}>
            <span style={{ fontSize: 30, color: "#fbbf24", fontWeight: "bold", letterSpacing: 4 }}>
              ONCHAIN KMS
            </span>
            <h1 style={{ fontSize: 140, margin: "10px 0", fontWeight: 900, textTransform: "uppercase" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "40px", fontSize: 60, fontWeight: "bold" }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: 40, 
              padding: "15px 40px", 
              background: "#fbbf24", 
              color: "black", 
              fontSize: 60, 
              fontWeight: "bold", 
              borderRadius: 20 
            }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      { width: 1792, height: 1024 }
    );
  } catch (e: any) {
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
