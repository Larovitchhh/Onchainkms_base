import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "nodejs"; // CAMBIAMOS A NODEJS para poder leer archivos locales

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    // 1. Leemos la imagen directamente desde el sistema de archivos (Server-side)
    // Esto evita que Vercel tenga que hacerse una petición HTTP a sí mismo
    const fs = require('fs');
    const path = require('path');
    
    let base64Image = "";
    try {
      const filePath = path.join(process.cwd(), 'public', 'nft', `${sport}.png`);
      const imageBuffer = fs.readFileSync(filePath);
      base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    } catch (err) {
      console.error("Error leyendo archivo:", err);
      // Fallback a una URL externa si el FS falla por alguna razón de permisos
      base64Image = `https://onchainkms-base.vercel.app/nft/${sport}.png`;
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
            // USAMOS EL BASE64 DIRECTO
            backgroundImage: `url(${base64Image})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            paddingLeft: "120px",
            color: "white",
          }}
        >
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px", 
            textShadow: "4px 4px 15px rgba(0,0,0,0.9)",
            fontFamily: "sans-serif" 
          }}>
            <div style={{ fontSize: 130, fontWeight: 900, marginBottom: "30px", textTransform: "uppercase" }}>
              {sport}
            </div>
            <div style={{ fontSize: 75, fontWeight: 700 }}>{km} KM</div>
            <div style={{ fontSize: 75, fontWeight: 700 }}>{time} MIN</div>
            <div style={{ fontSize: 75, fontWeight: 700 }}>{elev} M ELEV</div>
            <div style={{ fontSize: 110, fontWeight: 900, color: "#FFD700", marginTop: "30px" }}>
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
