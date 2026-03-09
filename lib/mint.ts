import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"
import { getWallet } from "./wallet"

type Activity = {
 distance:number
 duration:number
 elevation:number
}

export async function mintActivity(activity:Activity,xp:number){

 try{

  const {signer,address} = await getWallet()

  const contract = new ethers.Contract(
   CONTRACT_ADDRESS,
   CONTRACT_ABI,
   signer
  )

  const tx = await contract.mintActivity(
   address,
   activity.distance,
   xp,
   "manual_activity",
   "ipfs://activity"
  )

  await tx.wait()

  alert("Activity minted!")

 }catch(err:any){

  console.error(err)

  alert(err.reason || err.message || "Mint failed")

 }

}
