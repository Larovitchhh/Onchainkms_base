import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import {
 uintCV,
 stringAsciiCV,
 PostConditionMode // Importante para la velocidad
} from "@stacks/transactions"

import { userSession } from "./stacksAuth"

type Activity = {
 type: string
 distance: number
 duration: number
 elevation: number
}

export async function mintStacksActivity(activity: Activity, xp: number) {
 console.log("Stacks mint start")

 try {
  if (!userSession.isUserSignedIn()) {
   throw new Error("Connect Stacks wallet first")
  }

  const network = new StacksMainnet()

  // Limpiamos los números para evitar errores de tipo en la simulación
  const dist = Math.floor(Number(activity.distance) || 0)
  const dur = Math.floor(Number(activity.duration) || 0)
  const elev = Math.floor(Number(activity.elevation) || 0)
  const points = Math.floor(Number(xp) || 0)

  await openContractCall({
   network,
   // OPTIMIZACIONES DE VELOCIDAD
   anchorMode: 1, // Permite cualquier tipo de bloque para ir más rápido
   postConditionMode: PostConditionMode.Allow, // Relaja la simulación para que el popup cargue ya

   contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
   contractName: "onchainkms-stacks",
   functionName: "mint-activity",
   functionArgs: [
    stringAsciiCV(activity.type || "run"),
    uintCV(dist),
    uintCV(dur),
    uintCV(elev),
    uintCV(points)
   ],

   appDetails: {
    name: "Onchain Sports",
    icon: window.location.origin + "/favicon.png"
   },

   onFinish: (data) => {
    console.log("Stacks TX:", data)
    alert("¡Transacción enviada! ID: " + data.txId)
   },

   onCancel: () => {
    console.log("User cancelled")
   }
  })

 } catch (err: any) {
  console.error("STACKS ERROR:", err)
  alert(
   err?.message ||
   err?.toString() ||
   "Stacks mint failed"
  )
 }
}
