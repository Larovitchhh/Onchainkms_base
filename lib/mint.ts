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

  console.log("Wallet:", address)
  console.log("Contract:", CONTRACT_ADDRESS)
  console.log("Activity:", activity)
  console.log("XP:", xp)

  const contract = new ethers.Contract(
   CONTRACT_ADDRESS,
   CONTRACT_ABI,
   signer
  )

  console.log("Sending transaction...")

  const tx = await contract.mintActivity(
   address,
   xp,
   activity.distance,
   activity.duration,
   activity.elevation
  )

  console.log("TX sent:", tx.hash)

  await tx.wait()

  console.log("TX confirmed")

  alert("Activity minted!")

  return true

 }catch(err:any){

  console.error("MINT ERROR FULL:", err)

  if(err?.reason){
   alert("Mint failed: " + err.reason)
  }
  else if(err?.shortMessage){
   alert("Mint failed: " + err.shortMessage)
  }
  else if(err?.message){
   alert("Mint failed: " + err.message)
  }
  else{
   alert("Mint failed. Check console.")
  }

  throw err

 }

}
