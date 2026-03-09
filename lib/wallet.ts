import { ethers } from "ethers"

export async function getWallet(){

 if(!(window as any).ethereum){
  throw new Error("MetaMask not installed")
 }

 const provider = new ethers.BrowserProvider((window as any).ethereum)

 await provider.send("eth_requestAccounts",[])

 const signer = await provider.getSigner()

 const address = await signer.getAddress()

 return {
  provider,
  signer,
  address
 }

}
