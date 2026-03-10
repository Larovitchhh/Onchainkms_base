"use client";

import React, { useState, useEffect } from "react";

// --- Configuración ---
const STACKS_CONTRACT_ADDRESS = "SP1AJVMEGSMD6QCSZ1669Z5G90GEHVK2MEM7J0AHH";
const STACKS_CONTRACT_NAME = "onchainkms-stacks";
const apiKey = ""; // La plataforma inyectará esto automáticamente

// --- Tipos de Actividad ---
type ActivityType = "run" | "swim" | "mtb" | "road";

interface ActivityData {
  type: ActivityType;
  distance: number;
  duration: number;
  elevation: number;
}

export default function App() {
  const [mounted, setMounted] = useState(false);
  const [activity, setActivity] = useState<ActivityData>({
    type: "run",
    distance: 0,
    duration: 0,
    elevation: 0
  });
  const [currentXP, setCurrentXP] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Estados para la IA de Gemini
  const [aiAdvice, setAiAdvice] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Evitar errores de hidratación asegurando que el componente esté montado
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const calculateXP = () => {
      const { type, distance, duration, elevation } = activity;
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
    setCurrentXP(calculateXP());
  }, [activity]);

  // --- Función Gemini API: AI Coach ---
  const getAiCoachAdvice = async () => {
    if (currentXP <= 0) return;
    setIsAiLoading(true);
    setAiAdvice("");

    const systemPrompt = "Eres un coach deportivo cyberpunk de élite. Analiza los datos y da un consejo de 1 frase motivadora y técnica.";
    const userQuery = `Actividad: ${activity.type}, Distancia: ${activity.distance}km, XP: ${currentXP}.`;

    const fetchWithRetry = async (retries = 5, delay = 1000): Promise<any> => {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        if (!response.ok) throw new Error("API Limit");
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise(r => setTimeout(r, delay));
          return fetchWithRetry(retries - 1, delay * 2);
        }
        throw err;
      }
    };

    try {
      const result = await fetchWithRetry();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiAdvice(text || "Optimización completada. Sigue adelante.");
    } catch (err) {
      setAiAdvice("Error de conexión neuronal.");
    } finally {
      setIsAiLoading(false);
    }
  };

  // --- Función de Mint (Segura para Build/SSR) ---
  const handleStacksMint = async () => {
    if (typeof window === "undefined" || currentXP <= 0) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      // Importación dinámica obligatoria para evitar fallos de build en Next.js
      const { openContractCall } = await import("@stacks/connect");
      const { StacksMainnet } = await import("@stacks/network");
      const { uintCV } = await import("@stacks/transactions");

      const network = new StacksMainnet();

      await openContractCall({
        network,
        contractAddress: STACKS_CONTRACT_ADDRESS,
        contractName: STACKS_CONTRACT_NAME,
        functionName: "mint-activity-xp",
        functionArgs: [uintCV(currentXP)],
        appDetails: {
          name: "OnChainKMS",
          icon: typeof window !== "undefined" ? window.location.origin + "/logo.png" : "",
        },
        onFinish: (data: any) => {
          setStatus("success");
          getAiCoachAdvice();
        },
        onCancel: () => {
          setStatus("idle");
        },
      });
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Error de comunicación con la wallet Stacks.");
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-600 rounded-2xl mb-4 shadow-xl shadow-blue-500/20">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">ONCHAIN<span className="text-blue-500">KMS</span></h1>
          <p className="text-gray-500 text-[10px] font-bold tracking-[0.2em]">BTC & BASE PROTOCOL</p>
        </div>

        <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
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

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-1 tracking-widest">Kilómetros</label>
              <input
                type="number"
                className="bg-transparent w-full text-2xl font-bold outline-none"
                placeholder="0.0"
                value={activity.distance || ""}
                onChange={(e) => setActivity({ ...activity, distance: Number(e.target.value) })}
              />
            </div>

            <div className="text-center py-6 border-y border-white/5">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">XP CALCULADO</span>
              <div className="text-6xl font-black tabular-nums">{currentXP}</div>
            </div>

            {aiAdvice && (
              <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl animate-pulse">
                <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">✨ AI COACH RESPONSE</p>
                <p className="text-xs text-gray-300 italic">"{aiAdvice}"</p>
              </div>
            )}

            <div className="space-y-3">
              <button 
                onClick={handleStacksMint}
                disabled={status === "loading" || currentXP <= 0}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-30"
              >
                {status === "loading" ? "MINTEANDO..." : "MINT EN STACKS (BTC)"}
              </button>

              <button
                onClick={getAiCoachAdvice}
                disabled={isAiLoading || currentXP <= 0}
                className="w-full py-3 border border-blue-500/50 text-blue-400 font-bold text-xs rounded-2xl hover:bg-blue-500/10 transition-all"
              >
                {isAiLoading ? "PROCESANDO..." : "✨ ANALIZAR RENDIMIENTO"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
