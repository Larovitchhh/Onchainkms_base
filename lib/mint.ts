import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

export async function mintActivity(activity: any, xp: number) {
  try {
    const { signer, address } = await getWallet()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    // Construimos la URL de la imagen dinámica para que OpenSea/Base la lea
    const domain = window.location.origin;
    const metadataURL = `${domain}/api/nft?sport=${activity.type}&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}`;

    console.log("Minting with metadata:", metadataURL);

    const tx = await contract.mintActivity(
      address,
      Math.floor(activity.distance), // KM
      Math.floor(xp),                // XP
      "manual_activity",             // Strava ID
      metadataURL                    // La URL de tu API
    )

    const receipt = await tx.wait()
    
    // Retornamos el objeto con la info para el botón de compartir
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
