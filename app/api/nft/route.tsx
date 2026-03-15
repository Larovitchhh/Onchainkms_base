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

    // 2. MODO IMAGEN: Descargamos la imagen antes de renderizar
    const imagePath = `${baseURL}/nft/${sport}.png`;
    
    // Hacemos fetch de la imagen de fondo para convertirla en ArrayBuffer
    const response = await fetch(imagePath);
    if (!response.ok) throw new Error(`No se pudo cargar la imagen: ${imagePath}`);
    const imageData = await response.arrayBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#000",
            color: "white",
            position: "relative",
          }}
        >
          {/* Imagen de fondo usando los datos binarios directamente */}
          <img 
            src={imageData as any} 
            width="1792" 
            height="1024" 
            style={{ position: 'absolute', top: 0, left: 0 }}
          />

          {/* Overlay y Texto */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }} />

          <div style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "80px",
            marginTop: "auto",
            marginBottom: "auto"
          }}>
            <div style={{ fontSize: 40, color: "#fbbf24", marginBottom: 10 }}>ONCHAIN KMS</div>
            <div style={{ fontSize: 140, fontWeight: "900", textTransform: "uppercase", margin: 0 }}>
              {sport}
            </div>
            <div style={{ display: "flex", gap: "30px", fontSize: 60, marginTop: 20 }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              fontSize: 80, 
              background: "#fbbf24", 
              color: "black", 
              padding: "10px 40px", 
              borderRadius: "20px",
              marginTop: 40,
              alignSelf: "flex-start"
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
    console.error("DEBUG ERROR:", e.message);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
