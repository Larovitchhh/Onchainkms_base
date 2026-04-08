'use client';

import { useState } from 'react';
// Usamos rutas relativas para asegurar que el build de Vercel encuentre los módulos
import { getWallet } from '../../lib/wallet';
import { mintCeloPass } from '../../lib/celoService';

export default function CeloCompetitionPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    setStatus(''); // Limpiamos mensajes previos
    
    try {
      const { signer } = await getWallet();
      
      // En Ethers v6, obtenemos la red del provider
      const network = await signer.provider.getNetwork();
      
      // Celo Mainnet Chain ID es 42220. 
      // En v6 network.chainId es un bigint, por lo que usamos Number() o comparamos con 42220n
      if (Number(network.chainId) !== 42220) {
        setStatus('Error: Cambia tu wallet a la red Celo Mainnet en tu billetera.');
        setLoading(false);
        return;
      }

      setStatus('Solicitando firma para el OnchainPass...');
      const receipt = await mintCeloPass(signer);
      
      console.log("Mint exitoso:", receipt);
      setStatus('¡Éxito! NFT de Celo reclamado correctamente. Ya puedes verlo en tu perfil.');
      
    } catch (err: any) {
      console.error("Error en Celo Mint:", err);
      
      // Manejo de errores amigable
      if (err.message?.includes('user rejected')) {
        setStatus('Transacción cancelada por el usuario.');
      } else if (err.reason) {
        setStatus(`Error: ${err.reason}`);
      } else {
        setStatus('Error en el proceso de minteo. Verifica que tengas saldo en CELO.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#020617] text-white">
      {/* Glow effect background para que encaje con tu estética */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-[#35D07F]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-[#FBCC5C]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full p-8 border border-white/10 rounded-3xl bg-slate-900/50 backdrop-blur-xl shadow-2xl">
        <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#35D07F] to-[#FBCC5C]">
          <span className="text-3xl">🏆</span>
        </div>
        
        <h1 className="text-3xl font-black mb-2 tracking-tight">CELO BUILDER</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Estás en el portal oficial de <strong>Proof of Ship</strong>. 
          Mintea tu OnchainPass para certificar tu participación en el ecosistema Celo.
        </p>
        
        <button 
          onClick={handleMint}
          disabled={loading}
          className="w-full py-4 bg-[#FBCC5C] text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(251,204,92,0.3)]"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              PROCESANDO...
            </div>
          ) : 'MINT ONCHAIN PASS'}
        </button>

        {status && (
          <div className={`mt-6 p-4 rounded-xl text-xs font-bold border ${
            status.includes('Éxito') 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border-red-500/20 text-red-400'
          }`}>
            {status}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-50">
          <span className="text-[10px] font-bold tracking-widest uppercase">Network: Celo Mainnet</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#35D07F]">Verified Contract</span>
        </div>
      </div>
    </div>
  );
}
