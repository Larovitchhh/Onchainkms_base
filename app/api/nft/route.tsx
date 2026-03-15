import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Leemos parámetros
    const sport = (searchParams.get("sport") || "MTB").toUpperCase();
    const km = searchParams.get("km") || "0";
    const xp = searchParams.get("xp") || "0";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#111",
            color: "white",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "sans-serif",
          }}
        >
          <h1 style={{ fontSize: 100, color: "#fbbf24" }}>{sport}</h1>
          <p style={{ fontSize: 50 }}>{km} KM - {xp} XP</p>
          <p style={{ fontSize: 20, color: "#444" }}>ONCHAIN KMS BASE</p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    return new Response("Error Interno", { status: 500 });
  }
}
