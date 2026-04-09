"use client"
import { useState, useEffect, useMemo } from "react"

interface RankingProps {
  currentUserAddress?: string; // Dirección del usuario conectado
}

export default function Ranking({ currentUserAddress }: RankingProps) {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch('/webhook?mode=ranking')
        const data = await res.json()
        setLeaderboard(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error("Error fetching ranking:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchRanking()
  }, [])

  // Encontramos la posición y datos del usuario conectado
  const userData = useMemo(() => {
    if (!currentUserAddress) return null;
    const index = leaderboard.findIndex(u => u.wallet_address.toLowerCase() === currentUserAddress.toLowerCase());
    if (index === -1) return null;
    return { ...leaderboard[index], rank: index + 1 };
  }, [leaderboard, currentUserAddress]);

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`

  // Componente de fila reutilizable para evitar repetir estilos
  const RankingRow = ({ user, index, isMe }: { user: any, index: number, isMe?: boolean }) => (
    <tr style={{ 
      borderBottom: "1px solid rgba(255,255,255,0.02)", 
      background: isMe ? "rgba(56, 189, 248, 0.15)" : (index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"),
      boxShadow: isMe ? "inset 4px 0 0 #38bdf8" : "none"
    }}>
      <td style={{ padding: "16px", fontWeight: "900", fontSize: "18px" }}>
        {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
      </td>
      <td style={{ padding: "16px", fontFamily: "monospace", color: isMe ? "#fff" : "#38bdf8", fontWeight: "bold" }}>
        {formatAddress(user.wallet_address)} {isMe && <span style={{fontSize: '10px', marginLeft: '5px', verticalAlign: 'middle', opacity: 0.7}}>(YOU)</span>}
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

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", color: "white", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "900", letterSpacing: "2px", margin: 0 }}>GLOBAL LEADERBOARD</h2>
        <p style={{ opacity: 0.5, fontSize: "14px", marginTop: "8px" }}>Ranked by total activities minted</p>
      </div>

      {/* SECCIÓN USUARIO DESTACADO (Solo si existe y no es el top 1) */}
      {userData && userData.rank > 1 && (
        <div style={{ marginBottom: "20px", border: "1px solid #38bdf8", borderRadius: "16px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody style={{ background: "rgba(56, 189, 248, 0.1)" }}>
              <RankingRow user={userData} index={userData.rank - 1} isMe={true} />
            </tbody>
          </table>
        </div>
      )}

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
              leaderboard.map((user, index) => (
                <RankingRow 
                  key={index} 
                  user={user} 
                  index={index} 
                  isMe={user.wallet_address.toLowerCase() === currentUserAddress?.toLowerCase()} 
                />
              ))
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
