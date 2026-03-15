import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // Nodejs tiene más memoria que Edge para manejar Base64

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
        attributes: [{ trait_type: "Sport", value: sport }, { trait_type: "XP", value: Number(xp) }]
      }), { headers: { "content-type": "application/json" } });
    }

    // 2. MODO IMAGEN - CARGA DIRECTA
    const imageUrl = `${baseURL}/nft/${sport}.png`;
    
    // Convertimos la imagen a Base64 para que Vercel no tenga que "buscarla" fuera
    const imageRes = await fetch(imageUrl);
    const arrayBuffer = await imageRes.arrayBuffer();
    const base64Image = `data:image/png;base64,${Buffer.from(arrayBuffer).toString('base64')}`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#020617",
            position: "relative",
          }}
        >
          {/* Imagen de fondo inyectada como DATA directa */}
          <img
            src={base64Image}
            width="1200"
            height="630"
            style={{ position: "absolute", top: 0, left: 0 }}
          />

          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: "60px",
            marginTop: "auto",
            marginBottom: "auto"
          }}>
            <span style={{ fontSize: 24, color: "#fbbf24", fontWeight: "bold" }}>ONCHAIN KMS</span>
            <h1 style={{ fontSize: 100, margin: "10px 0", fontWeight: 900, textTransform: "uppercase", color: "white" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "30px", fontSize: 40, fontWeight: "bold", color: "white" }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
            </div>
            <div style={{ 
              marginTop: 30, padding: "10px 30px", background: "#fbbf24", color: "black", 
              fontSize: 45, fontWeight: "bold", borderRadius: 12, alignSelf: "flex-start" 
            }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    return new Response(`Error Real: ${e.message}`, { status: 500 });
  }
}
