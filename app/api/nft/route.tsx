import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. Extraer parámetros con valores por defecto
    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    // 2. Construir la URL absoluta a piñón fijo
    // Usamos tu dominio real para que no haya dudas en el Edge Runtime
    const baseUrl = "https://onchainkms-base.vercel.app";
    const backgroundImage = `${baseUrl}/nft/${sport}.png`;

    console.log("Generando NFT para:", sport, "con imagen:", backgroundImage);

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
            backgroundColor: "#0f172a", // Fallback por si acaso
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            paddingLeft: "120px",
            color: "white",
          }}
        >
          {/* Contenedor de Texto con Sombra Fuerte para que resalte */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              textShadow: "4px 4px 15px rgba(0,0,0,0.9)",
              fontFamily: "sans-serif",
            }}
          >
            <div style={{ 
              fontSize: 130, 
              fontWeight: 900, 
              marginBottom: "30px", 
              letterSpacing: "-2px",
              textTransform: "uppercase" 
            }}>
              {sport}
            </div>
            
            <div style={{ fontSize: 75, fontWeight: 700 }}>
              {km} <span style={{ fontSize: 40, marginLeft: 10, opacity: 0.8 }}>KM</span>
            </div>
            
            <div style={{ fontSize: 75, fontWeight: 700 }}>
              {time} <span style={{ fontSize: 40, marginLeft: 10, opacity: 0.8 }}>MIN</span>
            </div>
            
            <div style={{ fontSize: 75, fontWeight: 700 }}>
              {elev} <span style={{ fontSize: 40, marginLeft: 10, opacity: 0.8 }}>M ELEV</span>
            </div>
            
            <div style={{ 
              fontSize: 110, 
              fontWeight: 900, 
              color: "#FFD700", 
              marginTop: "30px",
              display: "flex",
              alignItems: "center"
            }}>
              {xp} <span style={{ fontSize: 50, marginLeft: 15 }}>XP</span>
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
    console.error("Error en el generador de NFT:", e.message);
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
