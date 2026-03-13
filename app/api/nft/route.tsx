import { ImageResponse } from "@vercel/og"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const sport = searchParams.get("sport") || "road"
  const km = searchParams.get("km") || "0"
  const time = searchParams.get("time") || "0"
  const elev = searchParams.get("elev") || "0"
  const xp = searchParams.get("xp") || "0"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg,#0f172a,#1e3a8a)",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
          gap: 20,
          fontFamily: "Arial"
        }}
      >
        <div>{sport.toUpperCase()}</div>
        <div>{km} KM</div>
        <div>{time} MIN</div>
        <div>{elev} M</div>
        <div style={{ color: "#FFD700" }}>{xp} XP</div>
      </div>
    ),
    {
      width: 1792,
      height: 1024
    }
  )
}
