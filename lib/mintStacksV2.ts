import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import { userSession } from "./stacksAuth";

export async function mintStacksActivityV2(activity: any, xp: number) {
  console.log("🚀 INICIANDO MINTEO STACKS V2");
  console.log("Datos:", { activity, xp });

  if (!userSession.isUserSignedIn()) {
    console.error("❌ ERROR: Usuario no logueado en Stacks");
    alert("¡Conecta tu cartera de Stacks primero!");
    return;
  }

  const network = new StacksMainnet();
  
  // Limpiamos los números por si vienen como strings o con decimales
  const distance = Math.floor(Number(activity.distance) || 0);
  const duration = Math.floor(Number(activity.duration) || 0);
  const elevation = Math.floor(Number(activity.elevation) || 0);
  const totalXp = Math.floor(Number(xp) || 0);

  const txOptions = {
    network,
    contractAddress: "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH",
    contractName: "onchainkms-stacks",
    functionName: "mint-activity",
    functionArgs: [
      stringAsciiCV(activity.type || "run"),
      uintCV(distance),
      uintCV(duration),
      uintCV(elevation),
      uintCV(totalXp),
    ],
    appDetails: {
      name: "Onchain Sports",
      icon: window.location.origin + "/favicon.png",
    },
    onFinish: (data: any) => {
      console.log("✅ TRANSACCIÓN ENVIADA:", data);
      alert("¡Transacción enviada a Stacks! ID: " + data.txId);
    },
    onCancel: () => {
      console.warn("⚠️ El usuario canceló la firma");
    },
  };

  try {
    console.log("📦 Llamando a openContractCall...");
    await openContractCall(txOptions);
  } catch (err) {
    console.error("💀 ERROR CRÍTICO EN SDK STACKS:", err);
    throw err;
  }
}
