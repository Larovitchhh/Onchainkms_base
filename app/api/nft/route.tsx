import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    const protocol = req.url.startsWith('https') ? 'https' : 'http';
    const host = req.headers.get('host');
    // Esto pilla run.png, road.png, etc de tu carpeta /public/nft/
    const backgroundImage = `${protocol}://${host}/nft/${sport}.png`;

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
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            color: "white",
            fontFamily: "sans-serif",
            paddingLeft: "120px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", textShadow: "4px 4px 8px rgba(0,0,0,0.7)" }}>
            <div style={{ fontSize: 130, fontWeight: 900, marginBottom: "30px", letterSpacing: "-2px" }}>
              {sport.toUpperCase()}
            </div>
            <div style={{ fontSize: 70, fontWeight: 700 }}>{km} KM</div>
            <div style={{ fontSize: 70, fontWeight: 700 }}>{time} MIN</div>
            <div style={{ fontSize: 70, fontWeight: 700 }}>{elev} M ELEV</div>
            <div style={{ fontSize: 100, fontWeight: 900, color: "#FFD700", marginTop: "20px" }}>{xp} XP</div>
          </div>
        </div>
      ),
      { width: 1792, height: 1024 }
    );
  } catch (e: any) {
    return new Response(`Error al generar imagen`, { status: 500 });
  }
}
