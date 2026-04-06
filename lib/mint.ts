import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

const BUILDER_CODE = "bc_hxe1a2qc";

function getBuilderSuffix(code: string): string {
  return ethers.hexlify(ethers.toUtf8Bytes(code));
}

export async function mintActivity(activity: any, xp: number) {
  try {
    const { signer, address } = await getWallet()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

    const domain = window.location.origin;
    const metadataURL = `${domain}/api/nft?sport=${activity.type}&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}`;

    console.log("Minting with Builder Code:", BUILDER_CODE);

    // 1. Preparamos los datos
    const data = contract.interface.encodeFunctionData("mintActivity", [
      address,
      BigInt(Math.floor(activity.distance)),
      BigInt(Math.floor(xp)),
      "manual_activity",
      metadataURL
    ]);

    const suffix = getBuilderSuffix(BUILDER_CODE);
    const finalData = data + suffix.slice(2);

    // 2. Enviamos la transacción
    const tx = await signer.sendTransaction({
      to: CONTRACT_ADDRESS,
      data: finalData
    });

    console.log("Waiting for confirmation...");
    await tx.wait();

    // 3. PERSISTENCIA EN BASE DE DATOS (Vercel Postgres)
    try {
      await fetch("/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: address.toLowerCase(),
          blockchain: "base",
          sport: activity.type,
          km: activity.distance,
          elev: activity.elevation,
          time: activity.duration,
          xp: xp,
          hash: tx.hash
        })
      });
      console.log("Activity saved to internal DB");
    } catch (dbErr) {
      console.error("Failed to save to DB, but mint was successful:", dbErr);
    }
    
    return {
      success: true,
      hash: tx.hash,
      metadataURL,
      sport: activity.type,
      distance: activity.distance,
      xp: xp
    };
  } catch (err: any) {
    console.error("mint error:", err)
    throw err;
  }
}
