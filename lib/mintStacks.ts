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

export async function mintStacksActivity(activity:Activity,xp:number){

 console.log("Stacks mint start")

 try{

  const network = new StacksMainnet()

  await openContractCall({

   network,

   contractAddress:"SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
   contractName:"onchainkms-stacks",

   functionName:"mint-activity",

   functionArgs:[

    stringAsciiCV(activity.type),

    uintCV(activity.distance),

    uintCV(activity.duration),

    uintCV(activity.elevation),

    uintCV(xp)

   ],

   appDetails:{
    name:"Onchain Sports",
    icon:window.location.origin + "/favicon.ico"
   },

   onFinish:(data)=>{
    console.log("Stacks TX:",data)
    alert("Minted on Stacks!")
   },

   onCancel:()=>{
    console.log("User cancelled")
   }

  })

 }catch(err:any){

  console.error("STACKS ERROR:",err)

  alert(
   err?.message ||
   err?.toString() ||
   "Stacks mint failed"
  )

 }

}
