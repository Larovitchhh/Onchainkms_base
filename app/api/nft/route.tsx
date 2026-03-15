import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sport = (searchParams.get("sport") || "road") as string;
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";
    const json = searchParams.get("json");

    const protocol = req.nextUrl.protocol;
    const host = req.headers.get("host");
    const baseURL = `${protocol}//${host}`;

    // 1. MODO METADATA (JSON)
    if (json) {
      const metadata = {
        name: `${sport.toUpperCase()} Session`,
        description: `Activity NFT with ${xp} XP earned on Onchain Sports.`,
        image: `${baseURL}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "Distance", value: `${km} km` },
          { trait_type: "Duration", value: `${time} min` },
          { trait_type: "Elevation", value: `${elev} m` },
          { trait_type: "XP", value: Number(xp) }
        ]
      };
      return new Response(JSON.stringify(metadata), {
        headers: { "content-type": "application/json" }
      });
    }

    // 2. MODO IMAGEN (PNG dinámico)
    // Usamos la ruta de tus archivos en /public/nft/
    const backgroundImage = `${baseURL}/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "100% 100%",
            color: "white",
            fontFamily: "sans-serif",
            position: "relative",
          }}
        >
          {/* Overlay gradiente para legibilidad */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%)',
            display: 'flex'
          }} />

          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "80px",
            zIndex: 10
          }}>
            <span style={{ fontSize: 40, color: '#3b82f6', letterSpacing: '4px', marginBottom: -10 }}>
              ONCHAIN SPORTS
            </span>
            <h1 style={{ fontSize: 160, margin: 0, textTransform: 'uppercase', fontWeight: 900 }}>
              {sport}
            </h1>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: 60, opacity: 0.8 }}>📍</span>
                <span style={{ fontSize: 70 }}>{km} <small style={{ fontSize: 30 }}>KM</small></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: 60, opacity: 0.8 }}>⏱️</span>
                <span style={{ fontSize: 70 }}>{time} <small style={{ fontSize: 30 }}>MIN</small></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <span style={{ fontSize: 60, opacity: 0.8 }}>🏔️</span>
                <span style={{ fontSize: 70 }}>{elev} <small style={{ fontSize: 30 }}>M</small></span>
              </div>
            </div>

            <div style={{
              marginTop: '40px',
              padding: '10px 30px',
              background: '#FFD700',
              color: 'black',
              fontSize: 50,
              fontWeight: 'bold',
              borderRadius: '10px',
              alignSelf: 'flex-start'
            }}>
              +{xp} XP
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
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
