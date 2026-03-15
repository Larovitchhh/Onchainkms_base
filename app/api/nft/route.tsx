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

    const json = searchParams.get("json");

    const protocol = req.url.startsWith("https") ? "https" : "http";
    const host = req.headers.get("host");

    const imageURL =
      `${protocol}://${host}/api/nft?sport=${sport}&km=${km}&time=${time}&elev=${elev}&xp=${xp}`;

    // ---------- METADATA ----------

    if (json) {

      const metadata = {
        name: `${sport.toUpperCase()} Activity`,
        description: "Onchain Sports Activity NFT",
        image: imageURL,
        attributes: [
          { trait_type: "Sport", value: sport },
          { trait_type: "Distance KM", value: Number(km) },
          { trait_type: "Duration MIN", value: Number(time) },
          { trait_type: "Elevation M", value: Number(elev) },
          { trait_type: "XP", value: Number(xp) }
        ]
      };

      return new Response(JSON.stringify(metadata), {
        headers: { "content-type": "application/json" }
      });

    }

    // ---------- IMAGE ----------

    const template = `${protocol}://${host}/nft/${sport}.png`;

    return new ImageResponse(

      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            color: "white",
            fontFamily: "sans-serif",
            fontWeight: "bold",
            paddingLeft: "120px"
          }}
        >

          {/* BACKGROUND */}

          <img
            src={template}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover"
            }}
          />

          {/* TEXT */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              textShadow: "2px 2px 6px rgba(0,0,0,0.6)",
              position: "relative"
            }}
          >

            <div style={{ fontSize: 120 }}>
              {sport.toUpperCase()}
            </div>

            <div style={{ fontSize: 80 }}>
              {km} KM
            </div>

            <div style={{ fontSize: 80 }}>
              {time} MIN
            </div>

            <div style={{ fontSize: 80 }}>
              {elev} M
            </div>

            <div style={{ fontSize: 90, color: "#FFD700" }}>
              {xp} XP
            </div>

          </div>

        </div>
      ),

      {
        width: 1792,
        height: 1024
      }

    );

  } catch (e: any) {

    console.error(e);

    return new Response("Image generation failed", {
      status: 500
    });

  }

}
