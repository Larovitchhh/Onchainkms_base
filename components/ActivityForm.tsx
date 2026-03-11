"use client";

import React, { useState } from "react";

/**
 * SOLUCIÓN DE COMPILACIÓN:
 * - Se eliminan dependencias externas (lucide-react) para evitar errores en Vercel.
 * - Se usan SVGs inline para máxima compatibilidad y velocidad.
 * - Se mantiene la lógica de minteo y la estética premium.
 */

// Iconos SVG Inline para evitar errores de "Module not found"
const Icons = {
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Run: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M13 4v16M17 4v16M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
    </svg>
  ),
  Swim: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  ),
  Bike: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <circle cx="5.5" cy="17.5" r="3.5" />
      <circle cx="18.5" cy="17.5" r="3.5" />
      <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
    </svg>
  ),
  Mtb: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
      <path d="M14.1 6a2 2 0 1 1-4.2 0 2 2 0 0 1 4.2 0Z" />
      <path d="m15 11-10 2" />
      <path d="m15 11 2 4h3" />
      <path d="m15 11-3-4" />
      <path d="m7 17 3-4" />
      <path d="M3 17h4" />
    </svg>
  )
};

const calculateXP = (type: string, distance: number, duration: number, elevation: number) => {
  let baseXP = 0;
  const dist = Number(distance) || 0;
  const dur = Number(duration) || 0;
  const elev = Number(elevation) || 0;

  switch (type) {
    case "run": baseXP = dist * 10; break;
    case "swim": baseXP = dist * 40; break;
    case "mtb": baseXP = dist * 5 + elev * 0.1; break;
    case "road": baseXP = dist * 3 + elev * 0.05; break;
    default: baseXP = 0;
  }
  return Math.round(baseXP + (dur * 0.5));
};

const MintButtonBase = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    onClick={() => console.log("Minting on Base...", { activity, xp })}
    className="group relative w-full overflow-hidden rounded-xl bg-blue-600 p-[2px] transition-all hover:scale-[1.02] active:scale-95"
  >
    <div className="relative flex items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-6 py-4 font-black italic tracking-tighter text-white transition-all group-hover:bg-blue-500">
      <Icons.Zap />
      MINT ON BASE
    </div>
  </button>
);

const MintButtonStacks = ({ activity, xp }: { activity: any; xp: number }) => (
  <button 
    onClick={() => console.log("Minting on Stacks...", { activity, xp })}
    className="group relative w-full overflow-hidden rounded-xl bg-orange-600 p-[2px] transition-all hover:scale-[1.02] active:scale-95"
  >
    <div className="relative flex items-center justify-center gap-2 rounded-[10px] bg-[#1a1a1a] px-6 py-4 font-black italic tracking-tighter text-orange-500 border border-orange-600/50 transition-all group-hover:bg-orange-950/20">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-black">
        <span className="text-[10px] font-bold">₿</span>
      </div>
      MINT ON STACKS
    </div>
  </button>
);

export default function ActivityForm() {
  const [type, setType] = useState("run");
  const [distance, setDistance] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [elevation, setElevation] = useState<number | "">("");

  const xp = calculateXP(type, Number(distance), Number(duration), Number(elevation));

  const activityIcons: Record<string, any> = {
    run: <Icons.Run />,
    swim: <Icons.Swim />,
    mtb: <Icons.Mtb />,
    road: <Icons.Bike />
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-white">
      <div className="fixed top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-orange-600/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Icons.Zap />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">
            ONCHAIN<span className="text-blue-500">KMS</span>
          </h1>
          <p className="mt-1 text-[10px] font-bold tracking-[0.4em] text-gray-500">PROOF OF PHYSICAL WORK</p>
        </div>

        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="p-8">
            <div className="mb-8 grid grid-cols-2 gap-3">
              {["run", "swim", "mtb", "road"].map((id) => (
                <button
                  key={id}
                  onClick={() => setType(id)}
                  className={`flex items-center justify-center gap-2 rounded-xl py-3 text-[10px] font-black transition-all border ${
                    type === id
                      ? "border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "border-white/5 bg-white/5 text-gray-500 hover:bg-white/10"
                  }`}
                >
                  {activityIcons[id]}
                  {id.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {[
                { label: "Distance", val: distance, set: setDistance, unit: "KM" },
                { label: "Duration", val: duration, set: setDuration, unit: "MIN" },
                { label: "Elevation", val: elevation, set: setElevation, unit: "M" },
              ].map((field) => (
                <div key={field.label} className="group relative rounded-2xl border border-white/5 bg-black/40 p-4 transition-all focus-within:border-blue-500/50">
                  <label className="mb-1 block text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                    {field.label}
                  </label>
                  <div className="flex items-end justify-between">
                    <input
                      type="number"
                      value={field.val}
                      onChange={(e) => field.set(e.target.value === "" ? "" : Number(e.target.value))}
                      placeholder="0.0"
                      className="w-full bg-transparent text-3xl font-black outline-none placeholder:text-gray-800"
                    />
                    <span className="mb-1 text-xs font-black text-blue-500/50 italic">{field.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="my-8 flex flex-col items-center justify-center py-6 border-y border-white/5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 opacity-60">ESTIMATED YIELD</span>
              <div className="flex items-center gap-3">
                <span className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {xp}
                </span>
                <span className="text-xl font-black italic text-blue-500 mt-4">XP</span>
              </div>
            </div>

            <div className="space-y-4">
              <MintButtonBase activity={{ type, distance, duration, elevation }} xp={xp} />
              <MintButtonStacks activity={{ type, distance, duration, elevation }} xp={xp} />
            </div>
          </div>

          <div className="bg-white/5 px-8 py-4 text-center">
            <p className="text-[9px] font-bold tracking-widest text-gray-600">
              SECURED BY BASE & STACKS PROTOCOL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
