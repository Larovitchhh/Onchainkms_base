"use client"
import { mintActivity } from "../lib/mint"

export default function MintButton({ activity, xp }: { activity: any, xp: number }) {
  async function handleMint() {
    try {
      await mintActivity(activity, xp)
    } catch (err) {
      alert("Mint failed")
    }
  }

  return (
    <button
      onClick={handleMint}
      style={{
        width: "100%",
        padding: "16px",
        background: "white",
        color: "#020617",
        border: "none",
        borderRadius: "14px",
        cursor: "pointer",
        fontWeight: "900",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        transition: "transform 0.1s"
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.98)"}
      onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      Mint on Base
    </button>
  )
}
