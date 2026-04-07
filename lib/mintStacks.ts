import { openContractCall } from "@stacks/connect";
import { STACKS_MAINNET } from "@stacks/network";
import { uintCV, stringAsciiCV, PostConditionMode, ClarityValue } from "@stacks/transactions";
import { userSession } from "./stacksAuth";

export async function mintStacksActivity(activity: any, xp: number) {
  try {
    if (!userSession.isUserSignedIn()) {
      throw new Error("Connect Stacks wallet first");
    }

    const network = STACKS_MAINNET; 
    const userData = userSession.loadUserData();
    
    // Preparamos los argumentos con el tipo ClarityValue explícito
    const functionArgs: ClarityValue[] = [
      stringAsciiCV(activity.type),
      uintCV(Math.floor(Number(activity.distance))),
      uintCV(Math.floor(Number(activity.duration))),
      uintCV(Math.floor(Number(activity.elevation))),
      uintCV(Math.floor(Number(xp)))
    ];

    await openContractCall({
      network,
      anchorMode: 1,
      postConditionMode: PostConditionMode.Allow,
      contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
      contractName: "onchainkms-stacks", 
      functionName: "mint-activity",
      functionArgs: functionArgs as any[], // Forzamos compatibilidad de array
      appDetails: {
        name: "Onchain KMs",
        icon: typeof window !== "undefined" ? window.location.origin + "/favicon.ico" : "",
      },
      onFinish: async (data) => {
        console.log("TX Sent:", data.txId);
      }
    });
  } catch (err: any) {
    console.error("Stacks Mint Error:", err);
    throw err;
  }
}
