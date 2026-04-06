"use client"
import { showConnect, UserSession, AppConfig } from "@stacks/connect"

export default function ConnectStacks() {
  const handleConnect = () => {
    const authOptions = {
      appDetails: {
        name: "OnchainKMs",
        icon: window.location.origin + "/favicon.ico",
      },
      userSession: new UserSession({ appConfig: new AppConfig(["store_write"]) }),
      onFinish: () => { window.location.reload(); },
    };
    showConnect(authOptions);
  };

  return (
    <button 
      onClick={handleConnect}
      style={{ padding: "10px 20px", background: "#5546ff", color: "white", borderRadius: "8px", fontWeight: "bold", border: "none", cursor: "pointer" }}
    >
      Connect Stacks
    </button>
  );
}
