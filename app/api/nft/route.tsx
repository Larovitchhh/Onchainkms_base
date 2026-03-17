import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sport = searchParams.get("sport") || "road";
  const km = searchParams.get("km") || "0";
  const time = searchParams.get("time") || "0";
  const elev = searchParams.get("elev") || "0";
  const xp = searchParams.get("xp") || "0";

  // Usamos la URL absoluta de tu producción
  const imgUrl = `https://onchainkms-base.vercel.app/nft/${sport}.png`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "100% 100%",
          backgroundColor: "#000",
          color: "white",
          paddingLeft: "100px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", textShadow: "4px 4px 10px rgba(0,0,0,0.8)" }}>
          <div style={{ fontSize: 120, fontWeight: "bold", textTransform: "uppercase" }}>{sport}</div>
          <div style={{ fontSize: 70 }}>{km} KM</div>
          <div style={{ fontSize: 70 }}>{time} MIN</div>
          <div style={{ fontSize: 70 }}>{elev} M ELEV</div>
          <div style={{ fontSize: 100, color: "#FFD700", marginTop: "20px" }}>{xp} XP</div>
        </div>
      </div>
    ),
    { width: 1792, height: 1024 }
  );
}
