import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);

  const sport = searchParams.get("sport") || "run";
  const km = searchParams.get("km") || "0";
  const xp = searchParams.get("xp") || "0";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "black",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 80
        }}
      >
        <div>{sport}</div>
        <div>{km} km</div>
        <div>{xp} xp</div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
