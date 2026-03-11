import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import {
 uintCV,
 stringAsciiCV
} from "@stacks/transactions"

type Activity = {
 type:string
 distance:number
 duration:number
 elevation:number
}

export async function mintStacksActivity(activity:Activity, xp:number){

 try{

  const network = new StacksMainnet()

  await openContractCall({

   network,

   contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
   contractName: "sports-activity",
   functionName: "mint-activity",

   functionArgs:[

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
    alert("Activity minted on Stacks!")
   }

  })

 }catch(err){

  console.error("Stacks mint error:",err)
  alert("Stacks mint failed")

 }

}
