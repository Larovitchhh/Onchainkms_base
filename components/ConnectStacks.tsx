"use client"
import { userSession } from "../lib/stacksAuth"

export default function ConnectStacks() {
  if (typeof window === "undefined") return null;

  if (userSession.isUserSignedIn()) {
    const user = userSession.loadUserData();
    const addr = user.profile.stxAddress.mainnet || user.profile.stxAddress;
    return (
      <button onClick={() => { userSession.signUserOut(); window.location.reload(); }}
        style={{ padding: "10px", color: "white", background: "none", border: "1px solid #5546ff", borderRadius: "8px" }}>
        STX: {addr.slice(0,4)}...{addr.slice(-4)} ✕
      </button>
    );
  }

  return (
    <button
      onClick={() => (window as any).forceStacksConnect()}
      style={{
        padding: "10px 20px",
        background: "#5546ff",
        color: "white",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer"
      }}
    >
      Connect Stacks
    </button>
  );
}
