import { ethers } from "ethers"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./contract"

export async function mintActivity(activity:any, xp:number){

 if(!(window as any).ethereum){
  alert("Connect wallet first")
  return
 }

 try{

  const provider = new ethers.BrowserProvider((window as any).ethereum)

  const signer = await provider.getSigner()

  const contract = new ethers.Contract(
   CONTRACT_ADDRESS,
   CONTRACT_ABI,
   signer
  )

  const tx = await contract.mintActivity(
   activity.sport,
   activity.distance,
   activity.elevation,
   activity.duration,
   xp
  )

  await tx.wait()

  alert("Activity minted!")

 }catch(err){

  console.error(err)

  alert("Mint failed")

 }

}
