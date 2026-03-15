import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

// CAMBIO CLAVE: Usamos 'nodejs' en lugar de 'edge' para tener más memoria (8GB vs 128MB)
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

    // MODO JSON
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

    // MODO IMAGEN
    const backgroundImage = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#000",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            color: "white",
            position: "relative",
          }}
        >
          {/* Overlay de seguridad para ver si el texto renderiza */}
          <div style={{
            position: "absolute",
            top: 40,
            left: 40,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "20px"
          }}>
            <div style={{ fontSize: 80, fontWeight: "bold" }}>{sport.toUpperCase()}</div>
            <div style={{ fontSize: 50 }}>{km} KM | {time} MIN</div>
            <div style={{ fontSize: 50 }}>{elev} M</div>
            <div style={{ fontSize: 70, color: "#fbbf24", marginTop: "20px" }}>{xp} XP</div>
          </div>
        </div>
      ),
      {
        width: 1792,
        height: 1024,
      }
    );
  } catch (e: any) {
    // Si falla, ahora sí veremos el error en el navegador
    return new Response(`Error crítico: ${e.message}`, { status: 500 });
  }
}
