"use client"
import { useState, useEffect, useMemo } from "react"

export default function Ranking() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // CAMBIO 1: Aquí debes poner tu dirección real o la lógica que use tu app para saber quién está logueado
  // Viendo tu captura, tu dirección termina en ...f7ed
  const currentUserAddress = "0x8c96...f7ed"; 

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch('/webhook?mode=ranking')
        const data = await res.json()
        
        // Guardamos los datos asegurándonos de que cada uno mantenga su posición real
        const rankedData = (Array.isArray(data) ? data : []).map((user, index) => ({
          ...user,
          realRank: index + 1 // Guardamos el puesto (1, 2, 3...)
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

  // CAMBIO 2: Reordenamos la lista SOLO para la vista, sin alterar los datos originales
  const displayList = useMemo(() => {
    if (!currentUserAddress || leaderboard.length === 0) return leaderboard;

    const list = [...leaderboard];
    // Buscamos tu índice en el array
    const myIndex = list.findIndex(u => 
      u.wallet_address.toLowerCase().includes(currentUserAddress.toLowerCase().replace('...', ''))
    );

    if (myIndex > 0) { // Si estás en la lista y NO eres ya el primero
      const myData = list.splice(myIndex, 1)[0];
      return [myData, ...list]; // Te ponemos arriba
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
            ) : leaderboard.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: "60px", textAlign: "center", opacity: 0.3 }}>No activities recorded yet.</td></tr>
            ) : (
              displayList.map((user, index) => {
                // Verificamos si esta fila es la del usuario conectado
                const isMe = user.wallet_address.toLowerCase().includes(currentUserAddress.toLowerCase().replace('...', ''));
                const rank = user.realRank;

                return (
                  <tr key={user.wallet_address} style={{ 
                    borderBottom: "1px solid rgba(255,255,255,0.02)", 
                    background: isMe ? "rgba(56, 189, 248, 0.12)" : (index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"),
                    boxShadow: isMe ? "inset 4px 0 0 #38bdf8" : "none"
                  }}>
                    <td style={{ padding: "16px", fontWeight: "900", fontSize: "18px" }}>
                      {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`}
                    </td>
                    <td style={{ padding: "16px", fontFamily: "monospace", color: isMe ? "#fff" : "#38bdf8", fontWeight: "bold" }}>
                      {formatAddress(user.wallet_address)}
                      {isMe && <span style={{marginLeft: '8px', fontSize: '10px', color: '#38bdf8'}}>(YOU)</span>}
                    </td>
                    <td style={tdStyleCenterBold}>{user.total_activities}</td>
                    <td style={{ ...tdStyleCenterBold, color: "#FFD700" }}>{Math.floor(user.total_xp).toLocaleString()}</td>
                    <td style={tdStyleCenter}>{Number(user.total_km).toFixed(1)} km</td>
                    <td style={tdStyleCenter}>{Math.floor(user.total_elevation)}m</td>
                    <td style={tdStyleCenter}>
                      {user.total_time < 60 
                        ? `${user.total_time}m` 
                        : `${(user.total_time / 60).toFixed(1)}h`}
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
