"use client"

import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import {
 uintCV,
 stringAsciiCV
} from "@stacks/transactions"

export default function MintStacksButton({activity,xp}:any){

 async function mintStacks(){

  const network = new StacksMainnet()

  await openContractCall({

   network,

   contractAddress: "TU_DIRECCION_STACKS",
   contractName: "sports-activity",
   functionName: "mint-activity",

   functionArgs: [

    stringAsciiCV(activity.type),

    uintCV(activity.distance),

    uintCV(activity.duration),

    uintCV(activity.elevation),

    uintCV(xp)

   ],

   appDetails:{
    name:"Onchain Sports",
    icon:""
   },

   onFinish:(data)=>{
    console.log("Stacks tx:",data)
   }

  })

 }

 return(

  <button
   onClick={mintStacks}
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
