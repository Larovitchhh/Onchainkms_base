import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import { userSession } from "./stacksAuth";

export async function mintStacksActivityV2(activity: any, xp: number) {
  console.log("🚀 FORZANDO MINTEO V2");

  if (!userSession.isUserSignedIn()) {
    alert("¡Conecta Stacks!");
    return;
  }

  const network = new StacksMainnet();
  
  // USAMOS VALORES ENTEROS FIJOS PARA LA PRUEBA DE FUEGO
  const txOptions = {
    network,
    contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH", // REVISA QUE SEA ESTA
    contractName: "onchainkms-stacks",
    functionName: "mint-activity",
    functionArgs: [
      stringAsciiCV("run"),         // Hardcoded: tipo
      uintCV(10),                   // Hardcoded: distancia
      uintCV(3600),                 // Hardcoded: duración
      uintCV(100),                  // Hardcoded: elevación
      uintCV(Math.floor(xp) || 500) // Hardcoded/Safe: XP
    ],
    appDetails: {
      name: "Onchain Sports",
      icon: "https://onchainkms-base.vercel.app/favicon.png", // URL absoluta
    },
    onFinish: (data: any) => {
      console.log("✅ TX ENVIADA!", data);
    },
    onCancel: () => console.log("Cancelado"),
  };

  await openContractCall(txOptions as any);
}
