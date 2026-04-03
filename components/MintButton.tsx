"use client"
import { useState } from "react"
import { mintActivity } from "../lib/mint"

export default function MintButton({ activity, xp }: { activity: any, xp: number }) {
  const [isMinting, setIsMinting] = useState(false);
  const [mintedData, setMintedData] = useState<any>(null);

  async function handleMint() {
    setIsMinting(true);
    try {
      // Llamamos a la función de tu lib/mint.ts
      const result = await mintActivity(activity, xp);
      setMintedData(result);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Mint failed. Make sure you are on Base network.");
    } finally {
      setIsMinting(false);
    }
  }

  const handleShare = () => {
    if (!mintedData) return;

    const shareText = `¡He minteado mi actividad de ${mintedData.sport} en OnChainKMS! 🔵\n\n📊 Distancia: ${mintedData.distance} KM\n✨ XP: ${mintedData.xp}\n\nWeb: https://onchainkms-base.vercel.app/`;
    
    // Compartir en Warpcast/Baseapp
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(mintedData.metadataURL)}`;
    
    window.open(shareUrl, "_blank");
  };

  if (mintedData) {
    return (
      <button
        onClick={handleShare}
        style={{
          width: "100%",
          padding: "16px",
          background: "#0052FF",
          color: "white",
          border: "none",
          borderRadius: "14px",
          cursor: "pointer",
          fontWeight: "900",
          fontSize: "13px",
          textTransform: "uppercase",
          letterSpacing: "1px",
          boxShadow: "0 4px 14px rgba(0, 82, 255, 0.39)"
        }}
      >
        Compartir en Baseapp
      </button>
    );
  }

  return (
    <button
      onClick={handleMint}
      disabled={isMinting}
      style={{
        width: "100%",
        padding: "16px",
        background: "white",
        color: "#020617",
        border: "none",
        borderRadius: "14px",
        cursor: isMinting ? "not-allowed" : "pointer",
        fontWeight: "900",
        fontSize: "13px",
        textTransform: "uppercase",
        letterSpacing: "1px",
        opacity: isMinting ? 0.6 : 1
      }}
    >
      {isMinting ? "Minteando..." : "Mint on Base"}
    </button>
  )
}
