import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import satori from "satori"
import { Resvg } from "@resvg/resvg-js"

export const runtime = "nodejs" // importante, no Edge

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const sport = (searchParams.get("sport") || "road").toLowerCase()
    const km = searchParams.get("km") || "0"
    const time = searchParams.get("time") || "0"
    const elev = searchParams.get("elev") || "0"
    const xp = searchParams.get("xp") || "0"

    // Ruta de plantilla
    const templatePath = path.join(process.cwd(), "public", "nft", `${sport}.png`)
    const templateBuffer = fs.readFileSync(templatePath)
    const templateBase64 = templateBuffer.toString("base64")

    // Generar SVG dinámico con Satori
    const svg = await satori(
      <div
        style={{
          width: 1792,
          height: 1024,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url("data:image/png;base64,${templateBase64}")`,
          backgroundSize: "cover",
          color: "white",
          fontFamily: "Arial",
          flexDirection: "column",
          gap: 20,
          fontWeight: 700,
          fontSize: 64
        }}
      >
        <div>{sport.toUpperCase()}</div>
        <div>{km} KM</div>
        <div>{time} MIN</div>
        <div>{elev} M</div>
        <div style={{ color: "#FFD700" }}>{xp} XP</div>
      </div>,
      { width: 1792, height: 1024 }
    )

    // Renderizar SVG a PNG con Resvg
    const resvg = new Resvg(svg)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    return new NextResponse(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png"
      }
    })
  } catch (err: any) {
    return new NextResponse(`Error: ${err.message}`, { status: 500 })
  }
}
