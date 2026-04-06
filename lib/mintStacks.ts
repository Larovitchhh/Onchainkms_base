import { openContractCall } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import { uintCV, stringAsciiCV, PostConditionMode } from "@stacks/transactions"
import { userSession } from "./stacksAuth"

export async function mintStacksActivity(activity: any, xp: number) {
  try {
    if (!userSession.isUserSignedIn()) {
      throw new Error("Connect Stacks wallet first");
    }

    const network = new StacksMainnet({ url: "https://api.mainnet.hiro.so" });
    const userData = userSession.loadUserData();
    const stxAddress = userData.profile.stxAddress.mainnet;

    await openContractCall({
      network,
      anchorMode: 1,
      postConditionMode: PostConditionMode.Allow,
      // REVISA: ¿Es este el nombre exacto en Hiro Platform?
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
        // El fetch al webhook se mantiene igual...
      }
    });
  } catch (err: any) {
    console.error("Stacks Mint Error:", err);
    throw err;
  }
}
