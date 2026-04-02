import ConnectWallet from "../components/ConnectWallet"
import ConnectStacks from "../components/ConnectStacks"
import ActivityForm from "../components/ActivityForm"

export default function Home() {
  return (
    <main style={{ padding: "40px 20px" }}>
      {/* Header Bar */}
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto 60px auto", 
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

      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: "900", marginBottom: "12px", letterSpacing: "-2px" }}>
          TRACK. EARN. <span style={{ color: "#38bdf8" }}>MINT.</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>
          Convert your physical effort into onchain reputation.
        </p>
      </div>

      <ActivityForm />
    </main>
  )
}
