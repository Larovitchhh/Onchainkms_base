import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import { uintCV, stringAsciiCV, PostConditionMode } from "@stacks/transactions"
import { userSession } from "./stacksAuth"

export async function mintStacksActivity(activity: any, xp: number) {
  try {
    if (!userSession.isUserSignedIn()) {
      throw new Error("Connect Stacks wallet first")
    }

    const network = new StacksMainnet({ url: "https://api.mainnet.hiro.so" })
    
    await openContractCall({
      network,
      anchorMode: 1,
      postConditionMode: PostConditionMode.Allow,
      // IMPORTANTE: Asegúrate de que este nombre coincida con tu Clarinet.toml [cite: 2025-12-27]
      contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
      contractName: "onchainkms-stacks", 
      functionName: "mint-activity",
      functionArgs: [
        stringAsciiCV(activity.type),
        uintCV(Math.floor(Number(activity.distance))), // Sin decimales
        uintCV(Math.floor(Number(activity.duration))),
        uintCV(Math.floor(Number(activity.elevation))),
        uintCV(Math.floor(Number(xp)))
      ],
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: (data) => {
        console.log("Transaction ID:", data.txId)
      }
    })
  } catch (err) {
    console.error("Mint Error:", err)
    throw err
  }
}
