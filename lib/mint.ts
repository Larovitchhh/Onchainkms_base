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
   xp,
   activity.distance,
   activity.duration,
   activity.elevation
  )

  await tx.wait()

  return true

 }catch(err){

  console.error(err)
  throw err

 }

}
