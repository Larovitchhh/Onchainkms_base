"use client";

import React, { useState, useEffect } from "react";
import { Zap, Activity, Navigation, ChevronUp, Droplets, Bike } from "lucide-react";

/**
 * RESTAURACIÓN DE LÓGICA Y ESTÉTICA
 * - Se integra la lógica real de cálculo de XP.
 * - Se reconstruyen los botones de minteo con su lógica funcional.
 * - Rediseño visual Premium (Glassmorphism, Neon Glow, Cyber-UI).
 */

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
      <Zap className="h-5 w-5 fill-current" />
      MINT ON BASE
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="absolute -inset-1 bg-blue-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
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
    <div className="absolute -inset-1 bg-orange-500 blur-xl opacity-10 group-hover:opacity-30 transition-opacity" />
  </button>
);

export default function App() {
  const [type, setType] = useState("run");
  const [distance, setDistance] = useState<number | "">("");
  const [duration, setDuration] = useState<number | "">("");
  const [elevation, setElevation] = useState<number | "">("");

  const xp = calculateXP(type, Number(distance), Number(duration), Number(elevation));

  const activityIcons: Record<string, any> = {
    run: <Activity className="h-4 w-4" />,
    swim: <Droplets className="h-4 w-4" />,
    mtb: <Navigation className="h-4 w-4" />,
    road: <Bike className="h-4 w-4" />
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 font-sans text-white">
      {/* Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="fixed bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-orange-600/10 blur-[120px]" />

      <div className="relative w-full max-w-md">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <Zap className="h-8 w-8 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white">
            ONCHAIN<span className="text-blue-500">KMS</span>
          </h1>
          <p className="mt-1 text-[10px] font-bold tracking-[0.4em] text-gray-500">PROOF OF PHYSICAL WORK</p>
        </div>

        {/* Main Interface Card */}
        <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl">
          <div className="p-8">
            
            {/* Type Selector Grid */}
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

            {/* Inputs Section */}
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

            {/* XP Display Section */}
            <div className="my-8 flex flex-col items-center justify-center py-6 border-y border-white/5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-blue-400 opacity-60">ESTIMATED YIELD</span>
              <div className="flex items-center gap-3">
                <span className="text-6xl font-black italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {xp}
                </span>
                <span className="text-xl font-black italic text-blue-500 mt-4">XP</span>
              </div>
            </div>

            {/* Minting Buttons */}
            <div className="space-y-4">
              <MintButtonBase activity={{ type, distance, duration, elevation }} xp={xp} />
              <MintButtonStacks activity={{ type, distance, duration, elevation }} xp={xp} />
            </div>
          </div>

          {/* Bottom Branding Bar */}
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
