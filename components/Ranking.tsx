"use client"
import { useState, useEffect, useMemo } from "react"

// NOTA: Asegúrate de pasar la address desde tu layout o auth provider
// Si usas Stacks/Hiro, suele venir de 'userSession.loadUserData().profile.stxAddress.mainnet'
export default function Ranking({ currentUserAddress = "0x8c96...f7ed" }) { // He puesto la de tu imagen por defecto para pruebas
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch('/webhook?mode=ranking')
        const data = await res.json()
        // Guardamos los datos con su índice original (el ranking real)
        const rankedData = (Array.isArray(data) ? data : []).map((user, index) => ({
          ...user,
          originalRank: index + 1
        }))
        setLeaderboard(rankedData)
      } catch (err) {
        console.error("Error fetching ranking:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchRanking()
  }, [])

  // Esta es la clave: Reordenamos la lista para que TÚ salgas primero
  const sortedLeaderboard = useMemo(() => {
    if (!currentUserAddress) return leaderboard;
    
    const list = [...leaderboard];
    const myIndex = list.findIndex(u => 
      u.wallet_address.toLowerCase() === currentUserAddress.toLowerCase()
    );

    if (myIndex > -1) {
      const myData = list.splice(myIndex, 1)[0]; // Quitamos al usuario de su sitio
      return [myData, ...list]; // Lo ponemos al principio
    }
    return list;
  }, [leaderboard, currentUserAddress]);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", color: "white", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "2px", margin: 0 }}>GLOBAL LEADERBOARD</h2>
        <p style={{ opacity: 0.5, fontSize: "14px", marginTop: "8px" }}>Ranked by total activities minted</p>
      </div>

      <div style={{ 
        background: "rgba(15, 23, 42, 0.4)", 
        borderRadius: "24px", 
        border: "1px solid rgba(255,255,255,0.05)", 
        backdropFilter: "blur(10px)",
        overflowX: "auto" 
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
          <thead>
            <tr style={{ background: "rgba(255,255,255,0.02)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <th style={thStyle}># RANK</th>
              <th style={thStyle}>USER</th>
              <th style={thStyleCenter}>ACTIVITIES</th>
              <th style={thStyleCenter}>XP</th>
              <th style={thStyleCenter}>KMS</th>
              <th style={thStyleCenter}>ELEV</th>
              <th style={thStyleCenter}>TIME</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: "60px", textAlign: "center", opacity: 0.3 }}>Analyzing athletes...</td></tr>
            ) : sortedLeaderboard.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "60px", textAlign: "center", opacity: 0.3 }}>No activities recorded yet.</td></tr>
            ) : (
              sortedLeaderboard.map((user, index) => {
                const isMe = user.wallet_address.toLowerCase() === currentUserAddress?.toLowerCase();
                const rank = user.originalRank; // Usamos el ranking real, no el índice del array

                return (
                  <tr key={user.wallet_address} style={{ 
                    borderBottom: "1px solid rgba(255,255,255,0.02)", 
                    background: isMe ? "rgba(56, 189, 248, 0.1)" : (index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"),
                    // Si es el usuario, le ponemos un borde brillante a la izquierda
                    boxShadow: isMe ? "inset 4px 0 0 #38bdf8" : "none"
                  }}>
                    <td style={{ padding: "16px", fontWeight: "900", fontSize: "18px" }}>
                      {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`}
                    </td>
                    <td style={{ padding: "16px", fontFamily: "monospace", color: isMe ? "#fff" : "#38bdf8", fontWeight: "bold" }}>
                      {formatAddress(user.wallet_address)}
                      {isMe && <span style={{ marginLeft: '8px', fontSize: '10px', color: '#38bdf8', border: '1px solid #38bdf8', padding: '2px 6px', borderRadius: '10px'}}>YOU</span>}
                    </td>
                    <td style={tdStyleCenterBold}>{user.total_activities}</td>
                    <td style={{ ...tdStyleCenterBold, color: "#FFD700" }}>{Math.floor(user.total_xp).toLocaleString()}</td>
                    <td style={tdStyleCenter}>{Number(user.total_km).toFixed(1)} km</td>
                    <td style={tdStyleCenter}>{Math.floor(user.total_elevation)}m</td>
                    <td style={tdStyleCenter}>
                      {user.total_time < 60 ? `${user.total_time}m` : `${(user.total_time / 60).toFixed(1)}h`}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const thStyle: React.CSSProperties = { padding: "20px 16px", textAlign: "left", fontSize: "11px", fontWeight: "900", opacity: 0.4, letterSpacing: "1px" };
const thStyleCenter: React.CSSProperties = { ...thStyle, textAlign: "center" };
const tdStyleCenter: React.CSSProperties = { padding: "16px", textAlign: "center", fontSize: "14px", fontWeight: "500" };
const tdStyleCenterBold: React.CSSProperties = { ...tdStyleCenter, fontWeight: "900", fontSize: "16px" };
