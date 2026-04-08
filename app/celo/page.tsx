'use client';

import { useState } from 'react';
import { getWallet } from '../../lib/wallet';
import { mintCeloPass } from '../../lib/celoService';

export default function CeloCompetitionPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    setStatus('');
    
    try {
      // 1. Obtenemos wallet y signer actualizados
      let walletData = await getWallet();
      let network = await walletData.signer.provider.getNetwork();
      let chainId = Number(network.chainId);
      
      console.log("Network detectada inicialmente:", chainId);

      // 2. Si no es Celo (42220), forzamos el cambio
      if (chainId !== 42220) {
        setStatus('Cambiando a red Celo...');
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa4ec' }], // 42220 en hex
          });
          
          // ESPERA CRÍTICA: Damos un segundo para que la wallet procese el cambio
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // 3. RE-OBTENEMOS el wallet data. Esto es vital para que el signer tenga el nuevo chainId
          walletData = await getWallet();
          const newNetwork = await walletData.signer.provider.getNetwork();
          
          if (Number(newNetwork.chainId) !== 42220) {
            throw new Error("No se pudo confirmar el cambio de red. Por favor, cambia a Celo manualmente en Rabby.");
          }
          
          setStatus('Red cambiada con éxito. Preparando firma...');
        } catch (switchError: any) {
          console.error("Error al cambiar de red:", switchError);
          setStatus('Error: Por favor, cambia manualmente a Celo en tu wallet y refresca.');
          setLoading(false);
          return;
        }
      }

      // 4. Procedemos al minteo con el signer actualizado
      setStatus('Solicitando firma en Celo...');
      const tx = await mintCeloPass(walletData.signer);
      console.log("Transacción enviada:", tx);
      
      setStatus('¡Éxito! OnchainPass reclamado correctamente.');
    } catch (err: any) {
      console.error("Error completo:", err);
      
      if (err.message?.includes('user rejected')) {
        setStatus('Transacción cancelada por el usuario.');
      } else if (err.message?.includes('insufficient funds')) {
        setStatus('Error: No tienes suficiente CELO para el gas.');
      } else {
        setStatus(err.reason || err.message || 'Error en el proceso. Revisa tu saldo.');
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

        <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center opacity-50">
          <span className="text-[10px] font-bold tracking-widest uppercase">Network: Celo Mainnet</span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-[#35D07F]">Chain ID: 42220</span>
        </div>
      </div>
    </div>
  );
}
