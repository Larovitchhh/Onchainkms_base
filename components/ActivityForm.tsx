"use client";

import React, { useState, useEffect } from "react";

/**
 * NOTA DE DEPURACIÓN:
 * Se han integrado las funciones de 'calculateXP' y componentes de botones
 * directamente en este archivo para resolver los errores de resolución de módulos
 * y asegurar que la previsualización funcione correctamente.
 */

// --- Lógica de Negocio Integrada ---
const calculateXP = (
  type: string,
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
  return Math.round(baseXP + (duration || 0) * 0.5);
};

// --- Sub-componentes Visuales (Simulación de los originales) ---
const MintButton = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-3"
    onClick={() => console.log("Minting on Base...", { activity, xp })}
  >
    MINT EN BASE
  </button>
);

const MintStacksButton = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3"
    onClick={() => console.log("Minting on Stacks...", { activity, xp })}
  >
    MINT EN STACKS (BTC)
  </button>
);

export default function ActivityForm() {
  const [type, setType] = useState("run");
  const [distance, setDistance] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [elevation, setElevation] = useState<number | "">("");

  const xp = calculateXP(
    type,
    Number(distance) || 0,
    Number(duration) || 0,
    Number(elevation) || 0
  );

  const activity = {
    type,
    distance: Number(distance) || 0,
    duration: Number(duration) || 0,
    elevation: Number(elevation) || 0,
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      {/* Encabezado Estético */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/20">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <h1 className="text-3xl font-black italic tracking-tighter uppercase text-white">
          ONCHAIN<span className="text-blue-500">KMS</span>
        </h1>
        <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em]">LOG YOUR ACTIVITY</p>
      </div>

      {/* Tarjeta Principal */}
      <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-[100px] rounded-full"></div>

        <div className="relative z-10 space-y-6">
          {/* Selector de Tipo */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "run", label: "RUNNING" },
              { id: "swim", label: "SWIMMING" },
              { id: "mtb", label: "MTB" },
              { id: "road", label: "ROAD BIKE" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setType(opt.id)}
                className={`py-3 rounded-xl text-[10px] font-black transition-all border-2 ${
                  type === opt.id
                    ? "border-blue-500 bg-blue-500/10 text-blue-400"
                    : "border-transparent bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Entradas de Datos */}
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-colors">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1 tracking-widest">
                Distance (km)
              </label>
              <input
                type="number"
                placeholder="0.0"
                className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-gray-700"
                value={distance}
                onChange={(e) => {
                  const v = e.target.value;
                  setDistance(v === "" ? "" : Number(v));
                }}
              />
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-colors">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1 tracking-widest">
                Duration (minutes)
              </label>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-gray-700"
                value={duration}
                onChange={(e) => {
                  const v = e.target.value;
                  setDuration(v === "" ? "" : Number(v));
                }}
              />
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-colors">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1 tracking-widest">
                Elevation (meters)
              </label>
              <input
                type="number"
                placeholder="0"
                className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-gray-700"
                value={elevation}
                onChange={(e) => {
                  const v = e.target.value;
                  setElevation(v === "" ? "" : Number(v));
                }}
              />
            </div>
          </div>

          {/* Visualización de XP */}
          <div className="text-center py-6 border-y border-white/5">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
              XP EARNED
            </span>
            <div className="text-6xl font-black tabular-nums text-white">
              {xp}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="space-y-3 flex flex-col pt-2">
            <div className="w-full transform active:scale-95 transition-transform">
              <MintButton activity={activity} xp={xp} />
            </div>
            <div className="w-full transform active:scale-95 transition-transform">
              <MintStacksButton activity={activity} xp={xp} />
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-8 text-center opacity-30">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          On-Chain Sports Protocol v2.0
        </p>
      </footer>
    </div>
  );
}
