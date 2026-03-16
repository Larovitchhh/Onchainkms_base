"use client";

import { useEffect } from "react";
import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"

export default function Home() {
  
  useEffect(() => {
    const initFarcaster = async () => {
      if (typeof window !== "undefined") {
        // Solo enviamos el mensaje si detectamos que estamos en un frame
        const isFrame = window.parent !== window;
        
        if (isFrame) {
          window.parent.postMessage({ type: "ready" }, "*");
        }

        // Intento de inicialización segura del SDK
        try {
          const sdk = (window as any).farcaster?.sdk;
          if (sdk && typeof sdk.actions.ready === 'function') {
            await sdk.actions.ready();
          }
        } catch (e) {
          console.warn("Farcaster SDK not ready or not found");
        }
      }
    };

    initFarcaster();
  }, []);

  return (
    <main style={{ padding: 40, maxWidth: '600px', margin: '0 auto' }}>
      <ConnectWallet />
      <div style={{ margin: '20px 0' }}>
        <ConnectStacks />
      </div>
      <ActivityForm />
    </main>
  );
}
