"use client"

import { useState } from "react"
import { getWallet } from "../lib/wallet"

export default function ConnectWallet(){

 const [address,setAddress] = useState<string>("")

 async function connect(){

  try{

   const wallet = await getWallet()

   setAddress(wallet.address)

  }catch(err){

   alert("Wallet connection failed")

  }

 }

 if(address){

  return(
   <div>
    Connected: {address.slice(0,6)}...{address.slice(-4)}
   </div>
  )

 }

 return(

  <button
   onClick={connect}
   style={{
    padding:"10px 20px",
    background:"#0052FF",
    color:"white",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer"
   }}
  >
   Connect Wallet
  </button>

 )

}
