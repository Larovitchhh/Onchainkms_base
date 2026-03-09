"use client"

import { mintActivity } from "../lib/mint"

export default function MintButton({activity,xp}:any){

 async function handleMint(){

  try{

   await mintActivity(activity,xp)

   alert("Activity minted!")

  }catch(err){

   alert("Mint failed")

  }

 }

 return(

  <button
   onClick={handleMint}
   style={{
    padding:"10px 20px",
    background:"#16a34a",
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
