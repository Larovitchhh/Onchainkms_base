import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Parámetros con valores por defecto
    const sport = (searchParams.get("sport") || "road").toLowerCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";
    const isJson = searchParams.get("json") === "1";

    const host = req.headers.get("host") || "onchainkms-base.vercel.app";
    const baseURL = `https://${host}`;

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
    // Usamos new URL() para asegurar que la ruta sea válida para Vercel
    const backgroundImage = new URL(`/nft/${sport}.png`, baseURL).toString();

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
            backgroundColor: "#111", // Fondo oscuro por si falla la imagen
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            color: "white",
            padding: "80px",
          }}
        >
          {/* Overlay oscuro para asegurar contraste */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex'
            }} 
          />

          <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
            <p style={{ fontSize: 40, color: '#fbbf24', margin: 0 }}>ONCHAIN KMS</p>
            <h1 style={{ fontSize: 160, margin: "20px 0", fontWeight: 900 }}>
              {sport.toUpperCase()}
            </h1>
            <div style={{ display: 'flex', gap: '40px', fontSize: 60 }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: '40px', 
              fontSize: 80, 
              color: '#fbbf24',
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
    return new Response(`Error de generación: ${e.message}`, { status: 500 });
  }
}
