import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)

 const sport = searchParams.get("sport") || "road"
 const km = searchParams.get("km") || "0"
 const time = searchParams.get("time") || "0"
 const elev = searchParams.get("elev") || "0"
 const xp = searchParams.get("xp") || "0"

 const template = new URL(`/nft/${sport}.png`, req.url).toString()

 return new ImageResponse(

  (
   <div
    style={{
     width: "1792px",
     height: "1024px",
     position: "relative",
     display: "flex",
     fontFamily: "Arial",
     color: "white",
     backgroundImage: `url(${template})`,
     backgroundSize: "cover"
    }}
   >

    <div
     style={{
      position: "absolute",
      left: 80,
      top: 220,
      width: 500,
      display: "flex",
      flexDirection: "column",
      gap: 20
     }}
    >

     <div style={{ fontSize: 70, fontWeight: 800 }}>
      {sport.toUpperCase()}
     </div>

     <div style={{ fontSize: 40 }}>
      {km} KM
     </div>

     <div style={{ fontSize: 40 }}>
      {time} MIN
     </div>

     <div style={{ fontSize: 40 }}>
      {elev} M
     </div>

     <div style={{ fontSize: 48, fontWeight: 700, color: "#FFD700" }}>
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
