import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Parámetros
    const sport = (searchParams.get("sport") || "road").toLowerCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";
    const isJson = searchParams.get("json") === "1";

    // 2. Construcción de URL Base para Vercel
    const host = req.headers.get("host") || "onchainkms-base.vercel.app";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseURL = `${protocol}://${host}`;

    // MODO METADATA (JSON)
    if (isJson) {
      const metadata = {
        name: `Onchain ${sport.toUpperCase()}`,
        description: `Activity NFT: ${km}km, ${time}min, ${elev}m. Total XP: ${xp}`,
        image: `${baseURL}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "Distance", value: Number(km) },
          { trait_type: "XP", value: Number(xp) }
        ]
      };
      return new Response(JSON.stringify(metadata), {
        headers: { "content-type": "application/json" }
      });
    }

    // MODO IMAGEN (PNG)
    // Importante: Referencia absoluta a la imagen en /public/nft/
    const backgroundImage = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: "#000", // Fondo de seguridad
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            color: "white",
            padding: "80px",
            fontFamily: "sans-serif",
          }}
        >
          {/* Overlay para legibilidad */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }} 
          />

          <div style={{ display: "flex", flexDirection: "column", zIndex: 10 }}>
            <span style={{ fontSize: 40, color: '#fbbf24', fontWeight: 'bold' }}>ONCHAIN KMS</span>
            <h1 style={{ fontSize: 140, margin: "10px 0", textTransform: 'uppercase', fontWeight: 900 }}>
              {sport}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ fontSize: 60 }}>{km} KM</span>
              <span style={{ fontSize: 60 }}>{time} MIN</span>
              <span style={{ fontSize: 60 }}>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: '40px', 
              fontSize: 80, 
              background: '#fbbf24', 
              color: 'black', 
              padding: '10px 30px', 
              borderRadius: '15px',
              fontWeight: 'bold' 
            }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      {
        width: 1792,
        height: 1024,
      }
    );
  } catch (e: any) {
    console.error("Error en API NFT:", e.message);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
