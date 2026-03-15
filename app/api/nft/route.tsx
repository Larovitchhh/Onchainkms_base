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
    // Usamos fetch con la URL absoluta pero con un cache-control agresivo
    // Esto evita problemas de lectura de disco y de permisos
    const imageUrl = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#020617",
            position: "relative",
            flexDirection: "column",
          }}
        >
          {/* Usamos el componente img de satori que acepta URLs directamente en Edge */}
          <img
            src={imageUrl}
            width="1200"
            height="630"
            style={{ 
              position: "absolute", 
              top: 0, 
              left: 0, 
              objectFit: "cover" 
            }}
          />

          {/* Filtro de contraste para el texto */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
            display: "flex",
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            padding: "60px",
            marginTop: "auto",
            marginBottom: "auto"
          }}>
            <span style={{ fontSize: 24, color: "#fbbf24", fontWeight: "bold", letterSpacing: 4 }}>
              ONCHAIN KMS
            </span>
            <h1 style={{ fontSize: 100, margin: "10px 0", fontWeight: 900, textTransform: "uppercase", color: "white" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "30px", fontSize: 40, fontWeight: "bold", color: "white" }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
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
      { 
        width: 1200, 
        height: 630,
        // Añadimos esto para depurar si hay errores de red internos
        debug: false 
      }
    );
  } catch (e: any) {
    return new Response(`ERROR: ${e.message}`, { status: 500 });
  }
}
