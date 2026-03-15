"use client";

import { useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"

export default function Home() {
  
  // SEÑAL PARA FARCASTER: Quita el Splash Screen
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Notifica a la App de Farcaster que la dApp ya cargó
      window.parent.postMessage({ type: "ready" }, "*");
      
      // Backup por si usan la versión más reciente del SDK inyectado
      try {
        if ((window as any).farcaster?.sdk) {
          (window as any).farcaster.sdk.actions.ready();
        }
      } catch (e) {
        // Silencioso para no ensuciar la consola
      }
    }
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <ConnectWallet />
      <br />
      <ConnectStacks />
      <ActivityForm />
    </main>
  );
}
