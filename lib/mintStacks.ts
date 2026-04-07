import { openContractCall } from "@stacks/connect";
import { STACKS_MAINNET } from "@stacks/network";
import { uintCV, stringAsciiCV, PostConditionMode } from "@stacks/transactions";
import { userSession } from "./stacksAuth";

export async function mintStacksActivity(activity: any, xp: number) {
  try {
    if (!userSession.isUserSignedIn()) {
      throw new Error("Connect Stacks wallet first");
    }

    const network = STACKS_MAINNET; 
    const userData = userSession.loadUserData();
    
    // Forzamos el tipado a any[] para evitar el error de "No overload matches this call"
    const functionArgs: any[] = [
      stringAsciiCV(activity.type),
      uintCV(Math.floor(Number(activity.distance))),
      uintCV(Math.floor(Number(activity.duration))),
      uintCV(Math.floor(Number(activity.elevation))),
      uintCV(Math.floor(Number(xp)))
    ];

    await openContractCall({
      network: network as any, // Bypass de versión de network
      anchorMode: 1,
      postConditionMode: PostConditionMode.Allow,
      contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
      contractName: "onchainkms-stacks", 
      functionName: "mint-activity",
      functionArgs: functionArgs,
      appDetails: {
        name: "Onchain KMs",
        icon: typeof window !== "undefined" ? window.location.origin + "/favicon.ico" : "",
      },
      onFinish: async (data: any) => {
        console.log("TX Sent:", data.txId);
      }
    } as any); // Forzamos el objeto completo para que no valide overloads
  } catch (err: any) {
    console.error("Stacks Mint Error:", err);
    throw err;
  }
}
