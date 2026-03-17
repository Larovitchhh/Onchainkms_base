import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

// Usamos el runtime de NodeJS para poder leer archivos del disco duro de Vercel
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    const fs = require('fs');
    const path = require('path');

    // 1. Intentamos leer el archivo JPG directamente del sistema
    let base64Image = "";
    try {
      // Buscamos el archivo en /public/nft/[deporte].jpg
      const filePath = path.join(process.cwd(), 'public', 'nft', `${sport}.jpg`);
      const imageBuffer = fs.readFileSync(filePath);
      base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    } catch (err) {
      console.error("Error leyendo JPG:", err);
      // Fallback a URL pública si el sistema de archivos falla
      base64Image = `https://onchainkms-base.vercel.app/nft/${sport}.jpg`;
    }

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
            backgroundColor: "#000",
            backgroundImage: `url(${base64Image})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            paddingLeft: "120px",
            color: "white",
          }}
        >
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
              textTransform: "uppercase",
              letterSpacing: "-2px"
            }}>
              {sport}
            </div>
            
            <div style={{ fontSize: 80, fontWeight: 800 }}>
              {km} <span style={{ fontSize: 40, opacity: 0.8 }}>KM</span>
            </div>
            
            <div style={{ fontSize: 80, fontWeight: 800 }}>
              {time} <span style={{ fontSize: 40, opacity: 0.8 }}>MIN</span>
            </div>
            
            <div style={{ fontSize: 80, fontWeight: 800 }}>
              {elev} <span style={{ fontSize: 40, opacity: 0.8 }}>M ELEV</span>
            </div>
            
            <div style={{ 
              fontSize: 110, 
              fontWeight: 900, 
              color: "#FFD700", 
              marginTop: "40px",
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
    return new Response(`Error: ${e.message}`, { status: 500 });
  }
}
