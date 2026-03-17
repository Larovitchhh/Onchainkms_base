import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

// IMPORTANTE: Cambiamos a 'nodejs' para que NO use el motor Edge que da el error de CSP
export const runtime = "nodejs"; 

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sport = searchParams.get("sport") || "road";
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    const imgUrl = `https://onchainkms-base.vercel.app/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: '100% 100%',
          backgroundColor: 'black',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '80px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', color: 'white', fontWeight: 'bold' }}>
            <span style={{ fontSize: 100 }}>{sport.toUpperCase()}</span>
            <span style={{ fontSize: 60 }}>{km} KM</span>
            <span style={{ fontSize: 80, color: '#FFD700' }}>{xp} XP</span>
          </div>
        </div>
      ),
      { width: 1792, height: 1024 }
    );
  } catch (e: any) {
    return new Response(`Error`, { status: 500 });
  }
}
