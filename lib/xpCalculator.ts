export function calculateXP(type:string, kms:number){

 const multipliers:any = {
  swimming:20,
  running:10,
  mtb:2,
  road:1
 }

 return kms * multipliers[type]
}
