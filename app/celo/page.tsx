'use client';

import { useState } from 'react';
import { getWallet } from '../../lib/wallet';
import { mintCeloPass } from '../../lib/celoService';
import { ethers } from 'ethers';

export default function CeloCompetitionPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    setStatus('Conectando con Celo...');
    
    try {
      if (!window.ethereum) throw new Error("No wallet detected");

      try {
        await (window as any).ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xa4ec' }], 
        });
      } catch (err: any) {
        if (err.code === 4902) {
          await (window as any).ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0xa4ec',
              chainName: 'Celo Mainnet',
              nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
              rpcUrls: ['https://forno.celo.org'],
              blockExplorerUrls: ['https://celoscan.io']
            }]
          });
        } else {
          throw err;
        }
      }

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== 42220) {
        throw new Error("La wallet sigue en otra red. Por favor, selecciona Celo manualmente.");
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
        setStatus(err.reason || err.message || "Error al conectar. Intenta refrescar.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#020617] text-white">
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
