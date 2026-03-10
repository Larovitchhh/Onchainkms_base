"use client";

import React, { useState, useEffect } from "react";

// --- Mock de xpCalculator integrado para evitar errores de importación ---
const calculateXP = (
  type: "run" | "swim" | "mtb" | "road",
  distance: number,
  duration: number,
  elevation: number
): number => {
  let baseXP = 0;
  switch (type) {
    case "run": baseXP = distance * 10; break;
    case "swim": baseXP = distance * 40; break;
    case "mtb": baseXP = distance * 5 + elevation * 0.1; break;
    case "road": baseXP = distance * 3 + elevation * 0.05; break;
    default: baseXP = 0;
  }
  return Math.round(baseXP + duration * 0.5);
};

// --- Componentes de Botón integrados para evitar errores de resolución ---

const MintButton = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    onClick={() => console.log("Minting on Base...", { activity, xp })}
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
  >
    <span>Mint en Base (L2)</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
  </button>
);

const MintStacksButton = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    onClick={() => console.log("Minting on Stacks...", { activity, xp })}
    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm flex items-center justify-center gap-2"
  >
    <span>Mint en Stacks (BTC)</span>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  </button>
);

// --- Componente Principal ---

export default function App() {
  const [type, setType] = useState<"run" | "swim" | "mtb" | "road">("run");
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [elevation, setElevation] = useState(0);

  // Calculamos el XP basado en los inputs actuales
  const xp = calculateXP(
    type,
    distance,
    duration,
    elevation
  );

  const activity = {
    type,
    distance,
    duration,
    elevation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="p-6 bg-white rounded-2xl shadow-xl max-w-md mx-auto border border-blue-50">
        <div className="flex justify-center mb-4">
           {/* Logo representativo simplificado */}
           <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
             OK
           </div>
        </div>
        
        <h2 className="text-2xl font-black text-blue-900 mb-2 text-center uppercase tracking-tight">OnChainKms</h2>
        <p className="text-gray-500 text-sm text-center mb-8 italic">Convierte tu sudor en XP</p>
        
        <div className="space-y-5">
          {/* Selector de Deporte */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Deporte</label>
            <select
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all appearance-none cursor-pointer text-gray-800"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="swim">Natación 🏊</option>
              <option value="run">Running 🏃</option>
              <option value="mtb">MTB 🚵</option>
              <option value="road">Ciclismo Carretera 🚴</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Input Distancia */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Distancia (km)</label>
              <input
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all text-gray-800"
                placeholder="0.0"
                type="number"
                onChange={(e) => setDistance(Number(e.target.value))}
              />
            </div>

            {/* Input Duración */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Minutos</label>
              <input
                className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all text-gray-800"
                placeholder="0"
                type="number"
                onChange={(e) => setDuration(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Input Desnivel */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase mb-1 ml-1">Desnivel Positivo (m)</label>
            <input
              className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-xl outline-none transition-all text-gray-800"
              placeholder="0"
              type="number"
              onChange={(e) => setElevation(Number(e.target.value))}
            />
          </div>

          {/* Panel de XP */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl text-center shadow-lg transform hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 right-0 p-2 opacity-10">
               <svg width="100" height="100" viewBox="0 0 24 24" fill="white"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
            </div>
            <span className="text-blue-100 block text-xs uppercase tracking-widest font-bold mb-1">XP ACUMULADO</span>
            <span className="text-5xl font-black text-white drop-shadow-md">{xp}</span>
          </div>

          {/* Botones de Acción */}
          <div className="space-y-3 pt-2">
            <MintButton activity={activity} xp={xp} />
            <MintStacksButton activity={activity} xp={xp} />
          </div>
          
          <p className="text-[10px] text-gray-400 text-center mt-4 uppercase tracking-tighter">
            onchainkms v2.0 • secure sports tracking
          </p>
        </div>
      </div>
    </div>
  );
}
