"use client"

import { useEffect, useState } from "react";
import { connectStacks, userSession } from "../lib/stacksAuth";

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (userSession.isUserSignedIn()) {
      setIsConnected(true);
    }
  }, []);

  // No renderizar nada hasta que estemos en el cliente para evitar errores de hidratación
  if (!mounted) return null;

  if (isConnected) {
    const userData = userSession.loadUserData();
    const address = userData.profile.stxAddress.mainnet;
    
    return (
      <div style={{
        padding: "8px 16px",
        background: "rgba(85, 70, 255, 0.1)",
        border: "1px solid #5546ff",
        borderRadius: "12px",
        color: "#5546ff",
        fontSize: "13px",
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        fontWeight: "bold"
      }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#5546ff", boxShadow: "0 0 8px #5546ff" }} />
        STX: {address.slice(0, 4)}...{address.slice(-4)}
      </div>
    );
  }

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Iniciando conexión con Stacks...");
    connectStacks();
  };

  return (
    <button
      onClick={handleConnect}
      className="glow-border"
      style={{
        padding: "12px 24px",
        background: "#5546ff",
        color: "white",
        border: "none",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "1px",
        fontSize: "12px",
        boxShadow: "0 4px 14px 0 rgba(85, 70, 255, 0.39)"
      }}
    >
      Connect Stacks
    </button>
  );
}
