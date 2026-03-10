"use client"

import { mintActivity } from "../lib/mint"

type Activity = {
 distance:number
 duration:number
 elevation:number
}

type Props = {
 activity: Activity
 xp: number
}

export default function MintButton({ activity, xp }: Props){

 async function handleMint(){

  console.log("CLICK DETECTED")
  console.log("activity:", activity)
  console.log("xp:", xp)

  try{

   await mintActivity(activity, xp)

  }catch(err){

   console.error("Mint error:", err)
   alert("Mint failed")

  }

 }

 return(

  <button
   type="button"
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
