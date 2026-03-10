"use client";

import React, { useState, useEffect } from "react";

// --- Configuración del Contrato Stacks ---
const STACKS_CONTRACT_ADDRESS = "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH";
const STACKS_CONTRACT_NAME = "onchainkms-stacks";

// --- Tipos ---
type ActivityType = "run" | "swim" | "mtb" | "road";

interface ActivityData {
  type: ActivityType;
  distance: number;
  duration: number;
  elevation: number;
}

// --- Lógica de XP ---
const calculateXP = (data: ActivityData): number => {
  const { type, distance, duration, elevation } = data;
  let baseXP = 0;
  switch (type) {
    case "run": baseXP = distance * 10; break;
    case "swim": baseXP = distance * 40; break;
    case "mtb": baseXP = distance * 5 + elevation * 0.1; break;
    case "road": baseXP = distance * 3 + elevation * 0.05; break;
    default: baseXP = 0;
  }
  return Math.round(baseXP + (duration || 0) * 0.5);
};

export default function App() {
  const [activity, setActivity] = useState<ActivityData>({
    type: "run",
    distance: 0,
    duration: 0,
    elevation: 0
  });
  const [currentXP, setCurrentXP] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setCurrentXP(calculateXP(activity));
  }, [activity]);

  // --- Función de Mint para Stacks (Carga Dinámica para evitar errores de Build) ---
  const handleStacksMint = async () => {
    if (currentXP <= 0) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      // Importamos dinámicamente para que Vercel no falle al compilar
      // @ts-ignore - Ignoramos check de tipos en build time
      const { openContractCall } = await import("@stacks/connect");
      // @ts-ignore
      const { StacksMainnet } = await import("@stacks/network");
      // @ts-ignore
      const { uintCV } = await import("@stacks/transactions");

      const network = new StacksMainnet();

      await openContractCall({
        network,
        contractAddress: STACKS_CONTRACT_ADDRESS,
        contractName: STACKS_CONTRACT_NAME,
        functionName: "mint-activity-xp", // Asegúrate de que este nombre coincida con tu .clar
        functionArgs: [uintCV(currentXP)],
        appDetails: {
          name: "OnChainKMS",
          icon: window.location.origin + "/logo.png",
        },
        onFinish: (data: any) => {
          console.log("TX Sent:", data.txId);
          setStatus("success");
        },
        onCancel: () => {
          setStatus("idle");
        },
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Error al conectar con la wallet de Stacks.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter">ONCHAIN<span className="text-blue-500">KMS</span></h1>
          <p className="text-gray-500 text-sm font-medium">Bitcoin & Base Rewards</p>
        </div>

        <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[100px] rounded-full"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-2 gap-2">
              {(["run", "swim", "mtb", "road"] as ActivityType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActivity({ ...activity, type: t })}
                  className={`py-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                    activity.type === t ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-transparent bg-white/5 text-gray-500"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-colors">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1 tracking-widest">Distancia (km)</label>
                <input
                  type="number"
                  className="bg-transparent w-full text-2xl font-bold outline-none placeholder:text-gray-800"
                  placeholder="0.0"
                  value={activity.distance || ""}
                  onChange={(e) => setActivity({ ...activity, distance: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="text-center py-6 border-y border-white/5">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">XP ACUMULADO</span>
              <div className="text-6xl font-black tabular-nums">{currentXP}</div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleStacksMint}
                disabled={status === "loading" || currentXP <= 0}
                className={`w-full font-black py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 group ${
                  status === "success" 
                    ? "bg-green-500 text-white" 
                    : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-30 disabled:grayscale"
                }`}
              >
                <span className="bg-white/20 p-1 rounded-md">
                   <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </span>
                {status === "loading" ? "CONECTANDO HIRO..." : status === "success" ? "¡MINT EXITOSO!" : "MINT EN STACKS (BTC)"}
              </button>

              {status === "error" && (
                <p className="text-red-500 text-[10px] text-center font-bold">{errorMessage}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all">
          <div className="text-[10px] font-bold text-gray-400 flex items-center gap-2">
            <span>NETWORK</span>
            <span className="bg-white/10 px-2 py-0.5 rounded text-white">MAINNET</span>
          </div>
        </div>
      </div>
    </div>
  );
}
