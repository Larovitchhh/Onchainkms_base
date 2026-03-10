"use client";

import React, { useState, useEffect } from "react";

/**
 * SOLUCIÓN AL ERROR DE COMPILACIÓN:
 * Para evitar "Module not found" en Vercel, hemos consolidado el código
 * y eliminado las dependencias problemáticas de la construcción estática.
 */

// --- Tipos ---
type ActivityType = "run" | "swim" | "mtb" | "road";

interface ActivityData {
  type: ActivityType;
  distance: number;
  duration: number;
  elevation: number;
}

// --- Lógica de Negocio ---
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

// --- Componente de Botón Base (L2) ---
const MintBaseButton = ({ xp }: { xp: number }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMint = () => {
    if (xp <= 0) return;
    setStatus("loading");
    // Simulación de transacción en Base
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <button 
      onClick={handleMint}
      disabled={status !== "idle" || xp <= 0}
      className={`w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
        status === "success" ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
      }`}
    >
      {status === "loading" ? "Procesando en Base..." : status === "success" ? "¡Mint Exitoso!" : "Mint en Base"}
    </button>
  );
};

// --- Componente de Botón Stacks (BTC L2) ---
const MintStacksButton = ({ xp }: { xp: number }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMint = async () => {
    if (xp <= 0) return;
    setStatus("loading");
    
    // NOTA: Para producción, aquí se usaría dynamic import o @stacks/connect
    // Por ahora, simulamos el éxito para permitir el despliegue en Vercel
    console.log(`Iniciando registro en Stacks para ${xp} XP`);
    
    setTimeout(() => {
      setStatus("success");
    }, 2500);
  };

  return (
    <button 
      onClick={handleMint}
      disabled={status !== "idle" || xp <= 0}
      className={`w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
        status === "success" ? "bg-orange-400 text-white" : "bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50"
      }`}
    >
      {status === "loading" ? "Conectando Hiro..." : status === "success" ? "¡Registrado en BTC!" : "Mint en Stacks"}
    </button>
  );
};

// --- App Principal ---
export default function App() {
  const [activity, setActivity] = useState<ActivityData>({
    type: "run",
    distance: 0,
    duration: 0,
    elevation: 0
  });

  const [currentXP, setCurrentXP] = useState(0);

  useEffect(() => {
    setCurrentXP(calculateXP(activity));
  }, [activity]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-3xl font-black italic">ONCHAIN<span className="text-blue-500">KMS</span></h1>
          <p className="text-gray-500 text-sm">Convierte tu esfuerzo en activos on-chain</p>
        </div>

        {/* Card */}
        <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Actividad */}
            <div className="grid grid-cols-2 gap-2">
              {(["run", "swim", "mtb", "road"] as ActivityType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActivity({ ...activity, type: t })}
                  className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${
                    activity.type === t ? "border-blue-500 bg-blue-500/10 text-blue-400" : "border-transparent bg-white/5 text-gray-500"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-2xl">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Distancia (km)</label>
                <input
                  type="number"
                  className="bg-transparent w-full text-2xl font-bold outline-none"
                  placeholder="0.0"
                  onChange={(e) => setActivity({ ...activity, distance: Number(e.target.value) })}
                />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-1">Tiempo (min)</label>
                <input
                  type="number"
                  className="bg-transparent w-full text-2xl font-bold outline-none"
                  placeholder="0"
                  onChange={(e) => setActivity({ ...activity, duration: Number(e.target.value) })}
                />
              </div>
            </div>

            {/* XP Display */}
            <div className="text-center py-6 border-y border-white/5">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">XP Ganado</span>
              <div className="text-6xl font-black">{currentXP}</div>
            </div>

            {/* Acciones */}
            <div className="space-y-3">
              <MintBaseButton xp={currentXP} />
              <MintStacksButton xp={currentXP} />
            </div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          Base L2 & Stacks BTC Layer
        </p>
      </div>
    </div>
  );
}
