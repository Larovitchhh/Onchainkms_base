import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

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
          paddingLeft: '120px', // Un poco más de aire a la izquierda
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            color: 'white', 
            fontFamily: 'sans-serif',
            textShadow: '4px 4px 10px rgba(0,0,0,0.8)' // Sombra para que se lea perfecto sobre cualquier fondo
          }}>
            {/* Quitamos el Deporte y ponemos los datos clave */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ fontSize: 90, fontWeight: 900 }}>{km} KM</span>
              <span style={{ fontSize: 60, fontWeight: 700, opacity: 0.9 }}>{time} MIN</span>
              <span style={{ fontSize: 60, fontWeight: 700, opacity: 0.9 }}>{elev} M ELEV</span>
              
              {/* El XP resaltado en dorado abajo */}
              <span style={{ 
                fontSize: 100, 
                fontWeight: 900, 
                color: '#FFD700', 
                marginTop: '30px' 
              }}>
                {xp} XP
              </span>
            </div>
          </div>
        </div>
      ),
      { width: 1792, height: 1024 }
    );
  } catch (e: any) {
    return new Response(`Error`, { status: 500 });
  }
}
