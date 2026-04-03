"use client"
import { useState } from "react"
import { getWallet } from "../lib/wallet"

export default function ConnectWallet() {
  const [address, setAddress] = useState<string>("")
  const [isSigning, setIsSigning] = useState(false)

  async function connectAndSign() {
    try {
      setIsSigning(true);
      const { signer, address: userAddress } = await getWallet();

      // --- ESTO ES EL SIWE (Sign-In With Ethereum) ---
      // Creamos un mensaje estándar que el usuario debe firmar
      const domain = window.location.host;
      const message = `${domain} wants you to sign in with your Ethereum account:\n${userAddress}\n\nI accept the OnchainKms terms of service.`;

      // El usuario firma el mensaje en su billetera (Base App / MetaMask)
      const signature = await signer.signMessage(message);
      
      console.log("Firma obtenida con éxito:", signature);
      // -----------------------------------------------

      setAddress(userAddress);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Connection or Signing failed");
    } finally {
      setIsSigning(false);
    }
  }

  if (address) {
    return (
      <div className="tech-font" style={{
        padding: "8px 16px",
        background: "rgba(56, 189, 248, 0.1)",
        border: "1px solid #38bdf8",
        borderRadius: "12px",
        color: "#38bdf8",
        fontSize: "13px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px"
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 8px #38bdf8" }} />
        {address.slice(0, 6)}...{address.slice(-4)}
      </div>
    )
  }

  return (
    <button
      onClick={connectAndSign}
      disabled={isSigning}
      className="glow-border"
      style={{
        padding: "12px 24px",
        background: "#0052FF",
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: isSigning ? "not-allowed" : "pointer",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px",
        opacity: isSigning ? 0.7 : 1
      }}
    >
      {isSigning ? "Firmando..." : "Connect & Sign"}
    </button>
  )
}
