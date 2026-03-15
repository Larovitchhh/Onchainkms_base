import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Parámetros
  const sport = (searchParams.get("sport") || "road").toLowerCase();
  const km = searchParams.get("km") || "0";
  const time = searchParams.get("time") || "0";
  const elev = searchParams.get("elev") || "0";
  const xp = searchParams.get("xp") || "0";

  // URL Directa (ya vimos que https://onchainkms-base.vercel.app/nft/mtb.png funciona)
  const imgUrl = `https://onchainkms-base.vercel.app/nft/${sport}.png`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "black",
        }}
      >
        {/* Imagen de fondo */}
        <img
          src={imgUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Capa de texto */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            padding: "60px",
            background: "linear-gradient(to right, rgba(0,0,0,0.8), transparent)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#fbbf24", fontSize: "25px", fontWeight: "bold" }}>ONCHAIN KMS</span>
          <h1 style={{ color: "white", fontSize: "100px", margin: "10px 0", textTransform: "uppercase" }}>{sport}</h1>
          <div style={{ display: "flex", gap: "30px", color: "white", fontSize: "40px" }}>
            <span>{km} KM</span>
            <span>{time} MIN</span>
            <span>{elev} M</span>
          </div>
          <div style={{ backgroundColor: "#fbbf24", color: "black", padding: "10px 30px", borderRadius: "10px", marginTop: "30px", fontSize: "40px", fontWeight: "bold" }}>
            {xp} XP
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
