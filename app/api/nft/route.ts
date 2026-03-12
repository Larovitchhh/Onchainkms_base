import { ImageResponse } from "@vercel/og"

export const runtime = "edge"

export async function GET(req: Request) {

 const { searchParams } = new URL(req.url)

 const sport = searchParams.get("sport") || ""
 const km = searchParams.get("km") || ""
 const time = searchParams.get("time") || ""
 const elev = searchParams.get("elev") || ""
 const xp = searchParams.get("xp") || ""

 const template = `${process.env.NEXT_PUBLIC_SITE_URL}/nft/${sport}.png`

 return new ImageResponse(

  (
   <div
    style={{
     width:"100%",
     height:"100%",
     position:"relative",
     display:"flex",
     fontFamily:"Arial",
     color:"white"
    }}
   >

    {/* background template */}

    <img
     src={template}
     style={{
      position:"absolute",
      width:"100%",
      height:"100%",
      objectFit:"cover"
     }}
    />

    {/* LEFT METADATA */}

    <div
     style={{
      position:"absolute",
      left:80,
      top:220,
      width:500,
      display:"flex",
      flexDirection:"column",
      gap:20
     }}
    >

     <div style={{fontSize:70,fontWeight:800}}>
      {sport.toUpperCase()}
     </div>

     <div style={{fontSize:40}}>
      {km} KM
     </div>

     <div style={{fontSize:40}}>
      {time} MIN
     </div>

     <div style={{fontSize:40}}>
      {elev} M
     </div>

     <div style={{fontSize:48,fontWeight:700,color:"#FFD700"}}>
      {xp} XP
     </div>

    </div>

   </div>
  ),

  {
   width:1792,
   height:1024
  }

 )
}
