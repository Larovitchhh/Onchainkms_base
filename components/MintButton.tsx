"use client"

import { mintActivity } from "../lib/mint"
// Importamos el tipo global que sí incluye el campo 'type' (deporte)
import { Activity } from "../types"

type Props = {
  activity: Activity
  xp: number
}

export default function MintButton({ activity, xp }: Props) {

  async function handleMint() {
    console.log("CLICK DETECTED")
    console.log("activity para mint:", activity)
    console.log("xp para mint:", xp)

    try {
      // Ahora 'activity' cumple con lo que espera lib/mint.ts
      await mintActivity(activity, xp)
    } catch (err) {
      console.error("Mint error:", err)
      alert("Mint failed")
    }
  }

  return (
    <button
      type="button"
      onClick={handleMint}
      style={{
        width: "100%", // Lo ajusto para que llene el contenedor como en tu diseño
        padding: "12px 20px",
        background: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "14px"
      }}
    >
      Mint Activity (Base)
    </button>
  )
}
