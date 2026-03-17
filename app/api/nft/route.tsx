import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Extraer parámetros
    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    // Construir URL absoluta para la plantilla PNG
    // Importante: Vercel necesita la URL completa para el fetch en Edge Runtime
    const protocol = req.url.startsWith('https') ? 'https' : 'http';
    const host = req.headers.get('host');
    const backgroundImage = `${protocol}://${host}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "row", // Metadata a la izquierda
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "1792px 1024px",
            backgroundColor: "#0f172a", // Fallback
            color: "white",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            paddingLeft: "100px", // Espaciado desde la izquierda
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ fontSize: 120, marginBottom: "20px" }}>
              {sport.toUpperCase()}
            </div>
            <div style={{ fontSize: 80 }}>{km} KM</div>
            <div style={{ fontSize: 80 }}>{time} MIN</div>
            <div style={{ fontSize: 80 }}>{elev} M</div>
            <div style={{ fontSize: 90, color: "#FFD700" }}>{xp} XP</div>
          </div>
        </div>
      ),
      {
        width: 1792,
        height: 1024,
      }
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response(`Error al generar imagen`, { status: 500 });
  }
}
