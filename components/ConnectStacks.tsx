"use client"
import { showConnect } from "@stacks/connect"
import { userSession } from "../lib/stacksAuth"

export default function ConnectStacks() {
  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/logo.png",
      },
      redirectTo: "/",
      onFinish: () => {
        window.location.reload();
      },
      userSession,
    });
  };

  const logout = () => {
    userSession.signUserOut();
    window.location.reload();
  };

  if (userSession.isUserSignedIn()) {
    const user = userSession.loadUserData();
    const addr = user.profile.stxAddress.mainnet || user.profile.stxAddress;
    return (
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ background: "rgba(85, 70, 255, 0.1)", padding: "10px", borderRadius: "8px", border: "1px solid #5546ff", fontSize: "12px" }}>
          STX: {addr.slice(0,4)}...{addr.slice(-4)}
        </div>
        <button onClick={logout} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>✕</button>
      </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      style={{
        padding: "10px 20px",
        background: "#5546ff",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
      }}
    >
      Connect Stacks
    </button>
  );
}
