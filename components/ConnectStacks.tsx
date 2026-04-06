"use client"
import { useState, useEffect } from "react"
import { connectStacks, userSession } from "../lib/stacksAuth"

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      // Priorizamos la dirección de mainnet explícitamente
      const stxAddr = userData.profile.stxAddress?.mainnet || userData.profile.stxAddress;
      setAddress(stxAddr);
    }
  }, [])

  if (!mounted) return null

  const handleConnect = async () => {
    try {
      await connectStacks();
    } catch (error) {
      console.error("Stacks connection error:", error);
    }
  }

  const handleLogout = () => {
    userSession.signUserOut();
    window.location.reload(); // Forzamos recarga para limpiar todo el estado
  }

  const formatSTX = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <button
        onClick={address ? undefined : handleConnect}
        style={{
          padding: "10px 20px",
          background: address ? "rgba(85, 70, 255, 0.1)" : "#5546ff",
          color: "white",
          border: address ? "1px solid rgba(85, 70, 255, 0.3)" : "none",
          borderRadius: "8px",
          cursor: address ? "default" : "pointer",
          fontWeight: "bold",
          fontSize: "12px"
        }}
      >
        {address ? `STX: ${formatSTX(address)}` : "Connect Stacks"}
      </button>
      {address && (
        <button 
          onClick={handleLogout}
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.2)", color: "white", borderRadius: "8px", padding: "0 10px", cursor: "pointer", fontSize: "10px" }}
        >
          ✕
        </button>
      )}
    </div>
  )
}
