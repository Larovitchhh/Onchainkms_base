import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

// Tu Builder Code único de Base
const BUILDER_CODE = "bc_hxe1a2qc";

export async function mintActivity(activity: any, xp: number) {
  try {
    const { signer, address } = await getWallet()

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    // Construimos la URL de la imagen dinámica
    const domain = window.location.origin;
    const metadataURL = `${domain}/api/nft?sport=${activity.type}&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}`;

    console.log("Minting with metadata:", metadataURL);

    // 1. Preparamos la transacción sin enviarla aún
    const txData = await contract.mintActivity.populateTransaction(
      address,
      Math.floor(activity.distance), // KM
      Math.floor(xp),                // XP
      "manual_activity",             // Strava ID
      metadataURL                    // La URL de tu API
    );

    // 2. Añadimos el Builder Code al final del campo 'data'
    // Esto es lo que permite a Base trackear tu app
    txData.data = txData.data + BUILDER_CODE;

    // 3. Enviamos la transacción modificada a través del signer
    const tx = await signer.sendTransaction(txData);

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
