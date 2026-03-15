import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

type Activity = {
 distance:number
 duration:number
 elevation:number
}

export async function mintActivity(activity:Activity, xp:number){

 console.log("mintActivity called")
 console.log("activity:",activity)
 console.log("xp:",xp)

 try{

  const {signer,address} = await getWallet()

  console.log("wallet connected:",address)

  const contract = new ethers.Contract(
   CONTRACT_ADDRESS,
   CONTRACT_ABI,
   signer
  )

  console.log("sending transaction...")

  const tx = await contract.mintActivity(
   address,
   activity.distance,
   xp,
   "manual_activity",
   `${window.location.origin}/api/nft?sport=road&km=${activity.distance}&time=${activity.duration}&elev=${activity.elevation}&xp=${xp}&json=1`
  )

  console.log("tx sent:",tx)

  await tx.wait()

  console.log("tx confirmed")

  alert("Activity minted!")

 }catch(err:any){

  console.error("mint error:",err)

  alert(err.reason || err.message || "Mint failed")

 }

}
