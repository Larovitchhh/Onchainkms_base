"use client"

import { mintStacksActivity } from "../lib/mintStacks"

type Activity = {
 type:string
 distance:number
 duration:number
 elevation:number
}

type Props = {
 activity:Activity
 xp:number
}

export default function MintStacksButton({activity,xp}:Props){

 async function handleMintStacks(){

  console.log("Stacks mint clicked")
  console.log(activity)
  console.log(xp)

  try{

   await mintStacksActivity(activity,xp)

  }catch(err){

   console.error(err)
   alert("Stacks mint failed")

  }

 }

 return(

  <button
   type="button"
   onClick={handleMintStacks}
   style={{
    padding:"10px 20px",
    background:"#f7931a",
    color:"white",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold",
    marginLeft:"10px"
   }}
  >
   Mint on Stacks
  </button>

 )

}
