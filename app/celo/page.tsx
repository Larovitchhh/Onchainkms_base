'use client';

import { useState } from 'react';
import { mintCeloPass } from '../../lib/celoService';
import { ethers } from 'ethers';

export default function CeloCompetitionPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    setStatus('Conectando con MiniPay...');
    
    try {
      if (!(window as any).ethereum) throw new Error("No wallet detected. Please use MiniPay/Opera.");

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      
      // Verificamos red pero sin forzar cambios bruscos que rompan MiniPay
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      if (chainId !== 42220) {
        setStatus('Cambiando a red Celo...');
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa4ec' }], 
          });
        } catch (switchError) {
          throw new Error("Por favor, cambia tu wallet a la red Celo.");
        }
      }

      setStatus('Firmando transacción...');
      const tx = await mintCeloPass(signer);
      
      console.log("Transacción enviada:", tx);
      setStatus('¡Éxito! OnchainPass reclamado correctamente.');
      
    } catch (err: any) {
      console.error("Error en Celo Mint:", err);
      if (err.message?.includes('user rejected')) {
        setStatus('Transacción cancelada.');
      } else {
        setStatus(err.reason || err.message || "Error al conectar.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#020617] text-white">
      {/* Meta tag también aquí por seguridad */}
      <meta name="talentapp:project_verification" content="5d27841495571f9cfccbf3dddab81d3ca2cd85ac74981ba76e0e5aea487401d6327ffae28f299646c7ad1a915956bdee0d045819495b52df3c0515e001e4d964" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-[#35D07F]/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-[#FBCC5C]/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-md w-full p-8 border border-white/10 rounded-3xl bg-slate-900/50 backdrop-blur-xl shadow-2xl">
        <div className="mb-6 inline-flex p-4 rounded-2xl bg-gradient-to-br from-[#35D07F] to-[#FBCC5C]">
          <span className="text-3xl">🏃‍♂️</span>
        </div>
        
        <h1 className="text-3xl font-black mb-2 tracking-tight">ONCHAIN ATHLETE</h1>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
          Estás en el portal de <strong>Celo</strong>. 
          Mintea tu OnchainPass para certificar tu nivel como atleta.
        </p>
        
        <button 
          onClick={handleMint}
          disabled={loading}
          className="w-full py-4 bg-[#FBCC5C] text-black font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(251,204,92,0.3)]"
        >
          {loading ? 'PROCESANDO...' : 'MINT ONCHAIN PASS'}
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
      </div>
    </div>
  );
}
