"use client"

import { mintActivity } from "../lib/mint"

export default function MintButton({activity,xp}:any){

 async function handleMint(){

  const user = (window as any).ethereum.selectedAddress

  if(!user){
   alert("Connect wallet first")
   return
  }

  await mintActivity({
   user,
   xp,
   distance:activity.distance,
   duration:activity.duration,
   elevation:activity.elevation
  })

 }

 return(

  <button
   onClick={handleMint}
   style={{
    padding:"10px 20px",
    background:"#0052FF",
    color:"white",
    border:"none",
    borderRadius:"8px"
   }}
  >
   Mint Activity
  </button>

 )

}
