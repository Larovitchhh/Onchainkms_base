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
    
    // Detectamos si lo que se pide es la imagen o el JSON
    const isImageRequest = searchParams.get("image") === "true";

    // 1. SI ES UNA PETICIÓN DE IMAGEN (La que genera el visual)
    if (isImageRequest) {
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
            paddingLeft: '650px', 
          }}>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              color: 'white', 
              fontFamily: 'sans-serif',
              textShadow: '4px 4px 10px rgba(0,0,0,0.8)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: 90, fontWeight: 900 }}>{km} KM</span>
                <span style={{ fontSize: 60, fontWeight: 700, opacity: 0.9 }}>{time} MIN</span>
                <span style={{ fontSize: 60, fontWeight: 700, opacity: 0.9 }}>{elev} M ELEV</span>
                
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
    }

    // 2. SI ES LA PETICIÓN POR DEFECTO (Devuelve el JSON que Base App necesita)
    const currentUrl = req.url;
    const imageUrl = `${currentUrl}&image=true`;

    const metadata = {
      name: `Onchain Activity: ${sport.toUpperCase()}`,
      description: `Activity on Base: ${km}km with ${xp} XP earned.`,
      image: imageUrl, // Aquí le damos a la app la URL de la imagen que generamos arriba
      attributes: [
        { trait_type: "Sport", value: sport },
        { trait_type: "Distance", value: `${km} km` },
        { trait_type: "Elevation", value: `${elev} m` },
        { trait_type: "Experience", value: Number(xp) }
      ]
    };

    return new Response(JSON.stringify(metadata), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (e: any) {
    return new Response(`Error generating NFT data`, { status: 500 });
  }
}
