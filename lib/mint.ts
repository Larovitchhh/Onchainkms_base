import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

// TU BUILDER CODE DE BASE.DEV
const BUILDER_CODE = "bc_hxe1a2qc";

/**
 * Función para convertir el Builder Code en el sufijo hexadecimal requerido (ERC-8021)
 */
function getBuilderSuffix(code: string): string {
  // Convertimos el string a hex y lo preparamos para el calldata
  return ethers.hexlify(ethers.toUtf8Bytes(code));
}

export async function mintActivity(activity: any, xp: number) {
  try {
    const { signer, address } = await getWallet()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    const domain = window.location.origin;
    const metadataURL = `${domain}/api/nft?sport=${activity.type}&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}`;

    console.log("Minting with Builder Code:", BUILDER_CODE);

    // 1. Preparamos los datos de la transacción normal
    const data = contract.interface.encodeFunctionData("mintActivity", [
      address,
      BigInt(Math.floor(activity.distance)),
      BigInt(Math.floor(xp)),
      "manual_activity",
      metadataURL
    ]);

    // 2. Añadimos el sufijo del Builder Code al final del calldata (Atribución Onchain)
    // El estándar ERC-8021 permite simplemente concatenar datos al final
    const suffix = getBuilderSuffix(BUILDER_CODE);
    const finalData = data + suffix.slice(2); // concatenamos sin el '0x'

    // 3. Enviamos la transacción manualmente con el calldata modificado
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      data: finalData
    });

    await tx.wait()
    
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
