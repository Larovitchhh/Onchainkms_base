"use client"

import { connectStacks } from "../lib/stacksAuth"

export default function ConnectStacks() {
  async function handleClick() {
    console.log("CLICK EN CONNECT STACKS")
    try {
      await connectStacks()
      console.log("connectStacks terminó")
    } catch (err) {
      console.error("Error en connectStacks:", err)
      alert("Error conectando Stacks wallet")
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
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
