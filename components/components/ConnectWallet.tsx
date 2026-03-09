"use client"

import { useState } from "react"

export default function ConnectWallet(){

 const [account,setAccount] = useState<string | null>(null)

 async function connect(){

  if(!(window as any).ethereum){
   alert("Install MetaMask")
   return
  }

  const accounts = await (window as any).ethereum.request({
   method:"eth_requestAccounts"
  })

  setAccount(accounts[0])

 }

 return(

  <div style={{marginTop:"20px"}}>

   {account ? (

    <p>
     Connected: {account.slice(0,6)}...{account.slice(-4)}
    </p>

   ):(

    <button onClick={connect}>
     Connect Wallet
    </button>

   )}

  </div>

 )

}
