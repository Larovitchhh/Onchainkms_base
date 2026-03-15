import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

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

    // 2. MODO IMAGEN - LECTURA DE DISCO (FS)
    // Buscamos la imagen en la carpeta public/nft
    const filePath = path.join(process.cwd(), "public", "nft", `${sport}.png`);
    
    let base64Image = "";
    try {
      const imageBuffer = fs.readFileSync(filePath);
      base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;
    } catch (e) {
      console.error("No se pudo leer el archivo de imagen:", filePath);
      // Si falla la lectura, el código seguirá adelante y usará el fondo oscuro
    }

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
          {/* Si logramos leer la imagen, la ponemos de fondo */}
          {base64Image && (
            <img
              src={base64Image}
              width="1200"
              height="630"
              style={{ position: "absolute", top: 0, left: 0, objectFit: "cover" }}
            />
          )}

          {/* Filtro de contraste */}
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
            <span style={{ fontSize: 24, color: "#fbbf24", fontWeight: "bold", letterSpacing: 4 }}>
              ONCHAIN KMS
            </span>
            <h1 style={{ fontSize: 110, margin: "10px 0", fontWeight: 900, textTransform: "uppercase", color: "white" }}>
              {sport}
            </h1>
            <div style={{ display: "flex", gap: "30px", fontSize: 45, fontWeight: "bold", color: "white" }}>
              <span>{km} KM</span>
              <span>{time} MIN</span>
              <span>{elev} M</span>
            </div>
            <div style={{ 
              marginTop: 30, padding: "12px 40px", background: "#fbbf24", color: "black", 
              fontSize: 55, fontWeight: "bold", borderRadius: 15, alignSelf: "flex-start" 
            }}>
              {xp} XP
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e: any) {
    return new Response(`ERROR_TECNICO: ${e.message}`, { status: 500 });
  }
}
