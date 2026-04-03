import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"

export async function mintActivity(activity: any, xp: number, connector: any) {
  try {
    // Obtenemos el provider de Wagmi/Viem y lo pasamos a Ethers
    const provider = await connector.getProvider();
    const browserProvider = new ethers.BrowserProvider(provider);
    const signer = await browserProvider.getSigner();
    const address = await signer.getAddress();

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    const domain = window.location.origin;
    const metadataURL = `${domain}/api/nft?sport=${activity.type}&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}`;

    console.log("Minting with metadata:", metadataURL);

    // Ajuste: Aseguramos que los valores sean BigInt o números limpios para Ethers v6
    const tx = await contract.mintActivity(
      address,
      BigInt(Math.floor(activity.distance)),
      BigInt(Math.floor(xp)),
      "manual_activity",
      metadataURL
    )

    const receipt = await tx.wait()
    
    return {
      success: true,
      hash: tx.hash,
      metadataURL: metadataURL,
      sport: activity.type,
      distance: activity.distance,
      xp: xp
    };
  } catch (err: any) {
    console.error("mint error:", err)
    throw err;
  }
}
