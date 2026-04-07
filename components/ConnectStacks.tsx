"use client"

import { connectStacks } from "../lib/stacksAuth"

export default function ConnectStacks(){

 return(

  <button
   onClick={connectStacks}
   style={{
    padding:"10px 20px",
    background:"#5546ff",
    color:"white",
    border:"none",
    borderRadius:"8px",
    cursor:"pointer",
    fontWeight:"bold",
    marginBottom:"20px"
   }}
  >
   Connect Stacks Wallet
  </button>

 )

}
