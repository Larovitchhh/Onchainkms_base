import { ethers } from "ethers"

const BASE_CHAIN_ID = "0x2105" // 8453 en hex

export async function getWallet(){

 if(!(window as any).ethereum){
  throw new Error("MetaMask not installed")
 }

 const ethereum = (window as any).ethereum

 // cambiar a Base si no está
 try{

  await ethereum.request({
   method: "wallet_switchEthereumChain",
   params: [{ chainId: BASE_CHAIN_ID }]
  })

 }catch(switchError:any){

  // si Base no está añadida
  if(switchError.code === 4902){

   await ethereum.request({
    method: "wallet_addEthereumChain",
    params:[{
     chainId: BASE_CHAIN_ID,
     chainName: "Base Mainnet",
     nativeCurrency:{
      name:"Ethereum",
      symbol:"ETH",
      decimals:18
     },
     rpcUrls:["https://mainnet.base.org"],
     blockExplorerUrls:["https://basescan.org"]
    }]
   })

  }

 }

 const provider = new ethers.BrowserProvider(ethereum)

 await provider.send("eth_requestAccounts",[])

 const signer = await provider.getSigner()

 const address = await signer.getAddress()

 return {
  provider,
  signer,
  address
 }

}
