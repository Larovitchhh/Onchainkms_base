"use client"

import { useEffect, useState } from "react";
import { connectStacks, userSession } from "../lib/stacksAuth";

export default function ConnectStacks() {
  const [mounted, setMounted] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    // Verificar si ya hay una sesión activa al montar
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setAddress(userData.profile.stxAddress.mainnet);
    }
  }, []);

  // Si no está montado, devolvemos un placeholder del mismo tamaño 
  // para evitar que el layout "salte" (Hydration Mismatch)
  if (!mounted) {
    return <div style={{ width: "140px", height: "40px" }} />;
  }

  // Si ya está conectado, mostramos la dirección (estilo similar a tu ConnectWallet de Base)
  if (address) {
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
        {address.slice(0, 4)}...{address.slice(-4)}
      </div>
    );
  }

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        connectStacks();
      }}
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
        fontSize: "12px"
      }}
    >
      Connect Stacks
    </button>
  );
}
