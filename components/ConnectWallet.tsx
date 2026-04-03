"use client"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { injected } from "wagmi/connectors"

export default function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected && address) {
    return (
      <div 
        onClick={() => disconnect()}
        className="tech-font" 
        style={{
          padding: "8px 16px",
          background: "rgba(56, 189, 248, 0.1)",
          border: "1px solid #38bdf8",
          borderRadius: "12px",
          color: "#38bdf8",
          fontSize: "13px",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer"
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    )
  }

  return (
    <button
      onClick={() => connect({ connector: injected() })}
      className="glow-border"
      style={{
        padding: "12px 24px",
        background: "#0052FF",
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px"
      }}
    >
      Connect Base
    </button>
  )
}
