import { ImageResponse } from "@vercel/og"

export const runtime = "edge"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
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
            width: "1792px",
            height: "1024px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "#111",
            color: "white",
            fontSize: 60,
            gap: 20
          }}
        >
          <div>{sport}</div>
          <div>{km}</div>
          <div>{time}</div>
          <div>{elev}</div>
          <div>{xp}</div>
        </div>
      ),
      {
        width: 1792,
        height: 1024
      }
    )
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: err.message,
        stack: err.stack
      }),
      { status: 500 }
    )
  }
}
