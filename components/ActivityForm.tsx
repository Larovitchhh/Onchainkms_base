
  distance: number;
  duration: number;
  elevation: number;
}

// --- Logic Helpers ---
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
  return Math.round(baseXP + duration * 0.5);
};

// --- Sub-components (Integrated to avoid import errors) ---

const MintButtonBase = ({ xp }: { xp: number }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMint = () => {
    setStatus("loading");
    // Simulate Base L2 Transaction
    setTimeout(() => setStatus("success"), 2000);
  };

  return (
    <button 
      onClick={handleMint}
      disabled={status !== "idle"}
      className={`w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
        status === "success" ? "bg-green-500 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
      }`}
    >
      {status === "loading" ? (
        <span className="animate-pulse">Procesando en Base...</span>
      ) : status === "success" ? (
        "¡Mint Exitoso! (L2)"
      ) : (
        <>
          <span>Mint en Base</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        </>
      )}
    </button>
  );
};

const MintStacksButton = ({ xp }: { xp: number }) => {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleMint = () => {
    setStatus("loading");
    // Simulate Stacks/BTC Contract Call
    console.log("Iniciando llamada a contrato en Stacks para XP:", xp);
    setTimeout(() => setStatus("success"), 2500);
  };

  return (
    <button 
      onClick={handleMint}
      disabled={status !== "idle"}
      className={`w-full font-bold py-4 px-6 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
        status === "success" ? "bg-orange-400 text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
      }`}
    >
      {status === "loading" ? (
        <span className="animate-pulse">Llamando a Hiro Wallet...</span>
      ) : status === "success" ? (
        "¡Registrado en Bitcoin!"
      ) : (
        <>
          <span>Mint en Stacks</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </>
      )}
    </button>
  );
};

// --- Main App Component ---

export default function App() {
  const [activity, setActivity] = useState<ActivityData>({
    type: "run",
    distance: 0,
    duration: 0,
    elevation: 0
  });

  const currentXP = calculateXP(activity);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-blue-600 to-cyan-400 shadow-[0_0_40px_rgba(37,99,235,0.4)] mb-6 transform -rotate-3">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h1 className="text-4xl font-black tracking-tight mb-2 italic">ONCHAIN<span className="text-blue-500">KMS</span></h1>
          <p className="text-gray-400 font-medium">Libera el poder de tus entrenamientos</p>
        </header>

        {/* Form Card */}
        <div className="bg-[#16161a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-sm">
          <div className="space-y-6">
            {/* Sport Select */}
            <div>
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Actividad</label>
              <div className="grid grid-cols-2 gap-2">
                {(["run", "swim", "mtb", "road"] as ActivityType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActivity({ ...activity, type: t })}
                    className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border-2 ${
                      activity.type === t 
                      ? "border-blue-500 bg-blue-500/10 text-blue-400" 
                      : "border-transparent bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Numeric Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Distancia (km)</label>
                <input
                  type="number"
                  step="0.1"
                  className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-white/10"
                  placeholder="0.0"
                  onChange={(e) => setActivity({ ...activity, distance: Number(e.target.value) })}
                />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Tiempo (min)</label>
                <input
                  type="number"
                  className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-white/10"
                  placeholder="0"
                  onChange={(e) => setActivity({ ...activity, duration: Number(e.target.value) })}
                />
              </div>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <label className="block text-[10px] font-black text-gray-500 uppercase mb-2">Desnivel Positivo (m)</label>
              <input
                type="number"
                className="bg-transparent w-full text-2xl font-bold outline-none text-white placeholder:text-white/10"
                placeholder="0"
                onChange={(e) => setActivity({ ...activity, elevation: Number(e.target.value) })}
              />
            </div>

            {/* XP Display */}
            <div className="py-8 border-y border-white/5 flex flex-col items-center justify-center">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">Recompensa Estimada</span>
              <div className="flex items-baseline gap-2">
                <span className="text-7xl font-black text-white tabular-nums">{currentXP}</span>
                <span className="text-xl font-bold text-gray-600">XP</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 pt-2">
              <MintButtonBase xp={currentXP} />
              <MintStacksButton xp={currentXP} />
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Powered by Base & Stacks • Secure Protocol v1.4
          </p>
        </footer>
      </main>
    </div>
  );
}
