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

    const network = new StacksMainnet({
      url: "https://api.mainnet.hiro.so" 
    })

    await openContractCall({
      network,
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

      onFinish: async (data) => {
        console.log("Stacks TX Success:", data.txId);
        
        // PERSISTENCIA EN BASE DE DATOS - Ajustada a /webhook
        try {
          const userData = userSession.loadUserData();
          const stxAddress = userData.profile.stxAddress.mainnet;

          await fetch("/webhook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              address: stxAddress.toLowerCase(),
              blockchain: "stacks",
              sport: activity.type,
              km: activity.distance,
              elev: activity.elevation,
              time: activity.duration,
              xp: xp,
              hash: data.txId
            })
          });
          console.log("Stacks activity saved to internal DB");
        } catch (dbErr) {
          console.error("DB Error after Stacks mint:", dbErr);
        }

        alert("Minted on Stacks!");
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
