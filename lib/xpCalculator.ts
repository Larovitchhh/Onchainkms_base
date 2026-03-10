type ActivityType =
 | "swim"
 | "run"
 | "mtb"
 | "road"

export function calculateXP(
 type:ActivityType,
 distance:number,
 duration:number,
 elevation:number
){

 let multiplier = 1

 if(type === "swim") multiplier = 20
 if(type === "run") multiplier = 5
 if(type === "mtb") multiplier = 2
 if(type === "road") multiplier = 1

 const baseXP = distance * multiplier

 const durationBonus = Math.floor(duration / 60) * 30

 const elevationBonus = Math.floor(elevation / 100) * 20

 const totalXP =
  Math.floor(baseXP + durationBonus + elevationBonus)

 return totalXP
}
