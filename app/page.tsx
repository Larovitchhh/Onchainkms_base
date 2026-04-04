"use client"
import { useEffect, useState } from "react"
import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"
import Profile from "../components/Profile"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'activity' | 'ranking' | 'profile'>('activity');
  const [userContext, setUserContext] = useState<any>(null);

  useEffect(() => {
    const initBaseSDK = async () => {
      try {
        const sdk = (window as any).frameSDK;
        if (sdk?.actions?.ready) {
          // CAPTURAMOS EL CONTEXTO DE BASE (Nombre, PFP, etc.)
          const context = await sdk.context;
          setUserContext(context);
          sdk.actions.ready();
        }
      } catch (error) {
        console.error("Base SDK Error:", error);
      }
    };
    initBaseSDK();
  }, []);

  const tabButtonStyle = (tab: string) => ({
    padding: "10px 20px",
    cursor: "pointer",
    border: "none",
    background: "none",
    color: activeTab === tab ? "#38bdf8" : "rgba(255,255,255,0.5)",
    borderBottom: activeTab === tab ? "2px solid #38bdf8" : "2px solid transparent",
    fontWeight: "900",
    fontSize: "12px",
    letterSpacing: "1px",
    transition: "all 0.3s ease"
  });

  return (
    <main style={{ padding: "40px 20px", minHeight: "100vh", color: "white", background: "#020617" }}>
      {/* HEADER */}
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto 40px auto", 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center" 
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img src="/logo.png" alt="OnchainKMs" style={{ height: "40px" }} />
          <span style={{ fontWeight: "900", fontSize: "20px", letterSpacing: "-1px" }}>
            ONCHAIN<span style={{ color: "#38bdf8" }}>KMS</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <ConnectWallet />
          <ConnectStacks />
        </div>
      </div>

      {/* HERO (Solo en Activity) */}
      {activeTab === 'activity' && (
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "12px", letterSpacing: "-2px" }}>
            TRACK. EARN. <span style={{ color: "#38bdf8" }}>MINT.</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>
            Convert your physical effort into onchain reputation.
          </p>
        </div>
      )}

      {/* TABS MENU */}
      <div style={{ 
        maxWidth: "600px", 
        margin: "0 auto 30px auto", 
        display: "flex", 
        justifyContent: "center", 
        gap: "10px",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
      }}>
        <button onClick={() => setActiveTab('activity')} style={tabButtonStyle('activity')}>ACTIVITY</button>
        <button onClick={() => setActiveTab('ranking')} style={tabButtonStyle('ranking')}>RANKING</button>
        <button onClick={() => setActiveTab('profile')} style={tabButtonStyle('profile')}>PROFILE</button>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {activeTab === 'activity' && <ActivityForm />}
        
        {activeTab === 'ranking' && (
          <div style={{ textAlign: "center", padding: "60px", background: "rgba(15, 23, 42, 0.6)", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h2 style={{ fontWeight: "900", fontSize: "24px" }}>GLOBAL <span style={{ color: "#38bdf8" }}>LEADERBOARD</span></h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "10px" }}>Competición próximamente disponible...</p>
          </div>
        )}

        {activeTab === 'profile' && <Profile user={userContext?.user} />}
      </div>
    </main>
  )
}
