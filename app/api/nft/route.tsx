import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url)

  const sport = searchParams.get("sport") || "run"
  const km = searchParams.get("km") || "0"
  const time = searchParams.get("time") || "0"
  const elev = searchParams.get("elev") || "0"
  const xp = searchParams.get("xp") || "0"

  const host = req.headers.get("host")
  const protocol = req.url.startsWith("https") ? "https" : "http"

  const template = `${protocol}://${host}/nft/${sport}.png`

  return new ImageResponse(

    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "120px",
          color: "white",
          fontSize: 80,
          fontWeight: 700,
          fontFamily: "sans-serif"
        }}
      >

        <img
          src={template}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            textShadow: "0 4px 12px rgba(0,0,0,0.8)"
          }}
        >

          <div style={{ fontSize: 120 }}>
            {sport.toUpperCase()}
          </div>

          <div>{km} KM</div>

          <div>{time} MIN</div>

          <div>{elev} M</div>

          <div style={{ color: "#FFD700" }}>
            {xp} XP
          </div>

        </div>

      </div>
    ),

    {
      width: 1792,
      height: 1024
    }

  )

}
