import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sport = (searchParams.get("sport") || "road").toLowerCase();
    const km = searchParams.get("km") || "0";
    const time = searchParams.get("time") || "0";
    const elev = searchParams.get("elev") || "0";
    const xp = searchParams.get("xp") || "0";

    // URL absoluta completa
    const imgUrl = `https://onchainkms-base.vercel.app/nft/${sport}.png`;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            backgroundColor: "#000",
            position: "relative",
            flexDirection: "column",
          }}
        >
          {/* La clave es este objeto img: le quitamos el async para que no espere */}
          <img
            src={imgUrl}
            width="1200"
            height="630"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              flexDirection: "column",
              padding: "50px",
              justifyContent: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 25, color: "#fbbf24", fontWeight: "bold" }}>ONCHAIN KMS</span>
              <h1 style={{ fontSize: 110, color: "white", margin: "10px 0", textTransform: "uppercase", fontWeight: 900 }}>
                {sport}
              </h1>
              <div style={{ display: "flex", gap: "30px", fontSize: 45, color: "white", fontWeight: "bold" }}>
                <span>{km} KM</span>
                <span>{time} MIN</span>
                <span>{elev} M</span>
              </div>
              <div
                style={{
                  marginTop: "30px",
                  padding: "15px 35px",
                  backgroundColor: "#fbbf24",
                  color: "black",
                  fontSize: 50,
                  fontWeight: "bold",
                  borderRadius: "12px",
                  alignSelf: "flex-start",
                }}
              >
                {xp} XP
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response("Error fatal", { status: 500 });
  }
}
