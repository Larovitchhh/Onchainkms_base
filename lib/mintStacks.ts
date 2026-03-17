import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import {
 uintCV,
 stringAsciiCV,
 PostConditionMode
} from "@stacks/transactions"

import { userSession } from "./stacksAuth"

export async function mintStacksActivity(activity: any, xp: number) {
 console.log("Stacks mint start")

 try {
  if (!userSession.isUserSignedIn()) {
   throw new Error("Connect Stacks wallet first")
  }

  // OPTIMIZACIÓN 1: Forzar el nodo de respaldo si el de Hiro va lento
  const network = new StacksMainnet({
    url: "https://api.mainnet.hiro.so" // Puedes probar también con "https://api.hiro.so"
  })

  await openContractCall({
   network,
   // OPTIMIZACIÓN 2: No esperar a la simulación pesada
   anchorMode: 1, 
   postConditionMode: PostConditionMode.Allow,

   contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
   contractName: "onchainkms-stacks",
   functionName: "mint-activity",
   functionArgs: [
    stringAsciiCV(activity.type),
    uintCV(Math.floor(activity.distance)),
    uintCV(Math.floor(activity.duration)),
    uintCV(Math.floor(activity.elevation)),
    uintCV(Math.floor(xp))
   ],

   appDetails: {
    name: "Onchain Sports",
    icon: window.location.origin + "/favicon.ico"
   },

   onFinish: (data) => {
    console.log("Stacks TX:", data)
    // Mensaje original limpio
    alert("Minted on Stacks!")
   },

   onCancel: () => {
    console.log("User cancelled")
   }
  })

 } catch (err: any) {
  console.error("STACKS ERROR:", err)
  alert(err?.message || "Stacks mint failed")
 }
}
