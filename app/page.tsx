"use client"
import { useEffect, useState } from "react"
import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"
import Profile from "../components/Profile"
import Ranking from "../components/Ranking"

export default function Home() {
  const [activeTab, setActiveTab] = useState<'activity' | 'ranking' | 'profile'>('activity');
  
  useEffect(() => {
    const initBaseSDK = async () => {
      try {
        const sdk = (window as any).frameSDK;
        if (sdk?.actions?.ready) {
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
      {/* VERIFICACIÓN TALENT PROTOCOL - No rompe nada visualmente */}
      <title>OnchainKMs | Track & Earn</title>
      <meta name="talentapp:project_verification" content="5d27841495571f9cfccbf3dddab81d3ca2cd85ac74981ba76e0e5aea487401d6327ffae28f299646c7ad1a915956bdee0d045819495b52df3c0515e001e4d964" />

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
        {activeTab === 'activity' && (
            <>
             <div style={{ textAlign: "center", marginBottom: "40px" }}>
               <h1 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "12px", letterSpacing: "-2px" }}>
                 TRACK. EARN. <span style={{ color: "#38bdf8" }}>MINT.</span>
               </h1>
               <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>
                 Convert your physical effort into onchain reputation.
               </p>
             </div>
             <ActivityForm />
            </>
        )}
        {activeTab === 'ranking' && <Ranking />}
        {activeTab === 'profile' && <Profile />}
      </div>
    </main>
  );
}
