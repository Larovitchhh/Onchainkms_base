import { ethers } from "ethers"
import { contractAddress, contractABI } from "./contract"

export async function mintActivity(data:any){

 const provider = new ethers.BrowserProvider(window.ethereum)

 const signer = await provider.getSigner()

 const contract = new ethers.Contract(
  contractAddress,
  contractABI,
  signer
 )

 const tx = await contract.mintActivity(
  data.user,
  data.xp,
  data.distance,
  data.duration,
  data.elevation
 )

 await tx.wait()

 alert("Activity minted!")

}
