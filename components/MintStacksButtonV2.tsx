"use client";

import { useState } from "react";
import { mintStacksActivityV2 } from "../lib/mintStacksV2";

export default function MintStacksButtonV2({ activity, xp }: any) {
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    try {
      await mintStacksActivityV2(activity, xp);
    } catch (error) {
      console.error("Error en el componente V2:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleMint}
      disabled={loading}
      style={{
        padding: "12px 24px",
        background: loading ? "#ccc" : "#5546FF", // Color Stacks
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: loading ? "not-allowed" : "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.2s"
      }}
    >
      {loading ? "Procesando..." : "🔥 Mint on Stacks V2"}
    </button>
  );
}
