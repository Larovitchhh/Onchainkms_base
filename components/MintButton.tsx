"use client"

import { mintActivity } from "../lib/mint"

export default function MintButton({activity,xp}:any){

 async function handleMint(){

  try{

   if(!(window as any).ethereum){
    alert("Install MetaMask")
    return
   }

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

  }catch(err){

   console.error(err)
   alert("Mint failed")

  }

 }

 return(

  <button
   onClick={handleMint}
   style={{
    padding:"10px 20px",
    background:"#0052FF",
    color:"white",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold"
   }}
  >
   Mint Activity
  </button>

 )

}
