import { openContractCall } from "@stacks/connect"
import { STACKS_MAINNET } from "@stacks/network" // Cambiado de StacksMainnet a STACKS_MAINNET
import { uintCV, stringAsciiCV, PostConditionMode } from "@stacks/transactions"
import { userSession } from "./stacksAuth"

export async function mintStacksActivity(activity: any, xp: number) {
  try {
    if (!userSession.isUserSignedIn()) {
      throw new Error("Connect Stacks wallet first");
    }

    // En la v7, simplemente pasamos el objeto STACKS_MAINNET directamente
    const network = STACKS_MAINNET; 
    
    const userData = userSession.loadUserData();
    const stxAddress = userData.profile.stxAddress.mainnet;

    await openContractCall({
      network, // Ahora usa el objeto de la v7
      anchorMode: 1,
      postConditionMode: PostConditionMode.Allow,
      contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
      contractName: "onchainkms-stacks", 
      functionName: "mint-activity",
      functionArgs: [
        stringAsciiCV(activity.type),
        uintCV(Math.floor(Number(activity.distance))),
        uintCV(Math.floor(Number(activity.duration))),
        uintCV(Math.floor(Number(activity.elevation))),
        uintCV(Math.floor(Number(xp)))
      ],
      appDetails: {
        name: "Onchain KMs",
        icon: window.location.origin + "/favicon.ico",
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
