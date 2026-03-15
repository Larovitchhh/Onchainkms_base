import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Recoger parámetros
    const sport = (searchParams.get("sport") || "road").toLowerCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";
    const isJson = searchParams.get("json") === "1";

    // Detectar el host para el JSON
    const host = req.headers.get("host") || "onchainkms-base.vercel.app";
    const baseURL = `https://${host}`;

    // 2. MODO JSON (Metadata)
    if (isJson) {
      return new Response(JSON.stringify({
        name: `Onchain ${sport.toUpperCase()}`,
        description: `Activity NFT: ${km}km, ${time}min, ${elev}m. Total XP: ${xp}`,
        image: `${baseURL}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "Distance", value: Number(km) },
          { trait_type: "XP", value: Number(xp) }
        ]
      }), { headers: { "content-type": "application/json" } });
    }

    // 3. MODO IMAGEN (El diseño)
    // Usamos la URL de Vercel para el despliegue para asegurar que encuentre el archivo
    const imgUrl = new URL(`/nft/${sport}.png`, req.url).toString();

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
            backgroundColor: "#020617",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "100% 100%",
            color: "white",
            padding: "80px",
          }}
        >
          {/* Capa de contraste */}
          <div 
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
            }} 
          />

          <div style={{ display: "flex", flexDirection: "column", position: 'relative' }}>
            <span style={{ fontSize: 35, color: "#fbbf24", fontWeight: "bold", letterSpacing: "4px" }}>
              ONCHAIN KMS
            </span>
            
            <h1 style={{ fontSize: 150, margin: "10px 0", fontWeight: 900, textTransform: "uppercase" }}>
              {sport}
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", fontSize: 60, fontWeight: "bold" }}>
                {km} <span style={{ fontSize: 25, marginLeft: 10, alignSelf: 'center' }}>KM</span>
              </div>
              <div style={{ display: "flex", fontSize: 60, fontWeight: "bold" }}>
                {time} <span style={{ fontSize: 25, marginLeft: 10, alignSelf: 'center' }}>MIN</span>
              </div>
            </div>

            <div style={{
              marginTop: "40px",
              padding: "10px 40px",
              background: "#fbbf24",
              color: "black",
              fontSize: 70,
              fontWeight: "900",
              borderRadius: "15px",
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
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
