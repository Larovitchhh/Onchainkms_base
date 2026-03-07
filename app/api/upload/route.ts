export async function POST(req:Request){

 const data = await req.json()

 const metadata = {
  name: "Sport Activity",
  description: "Proof of Workout",
  attributes: [
   {trait_type:"sport", value:data.sport},
   {trait_type:"distance_km", value:data.distance},
   {trait_type:"duration_min", value:data.duration},
   {trait_type:"elevation_m", value:data.elevation},
   {trait_type:"xp", value:data.xp}
  ]
 }

 return Response.json({
  success:true,
  metadata
 })

}
