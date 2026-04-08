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
      const { signer } = await getWallet();
      
      // Obtenemos la red de forma segura para Ethers v6
      const network = await signer.provider.getNetwork();
      const chainId = Number(network.chainId);
      
      console.log("Network detectada:", chainId);

      // Si no es Celo (42220), intentamos pedir el cambio de red
      if (chainId !== 42220) {
        setStatus('Cambiando a red Celo...');
        try {
          await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xa4ec' }], // 42220 en hexadecimal
          });
          // Si el cambio es exitoso, pedimos al usuario que pulse otra vez para refrescar el signer
          setStatus('Red cambiada. Pulsa de nuevo para mintear.');
          setLoading(false);
          return;
        } catch (switchError: any) {
          // Si la red no está agregada, podrías agregar el código para añadirla aquí
          setStatus('Error: Cambia manualmente a Celo Mainnet en tu wallet.');
          setLoading(false);
          return;
        }
      }

      setStatus('Solicitando firma para OnchainPass...');
      const tx = await mintCeloPass(signer);
      console.log("Resultado transacción:", tx);
      
      setStatus('¡Éxito! NFT de Celo reclamado correctamente.');
    } catch (err: any) {
      console.error("Error completo:", err);
      
      if (err.message?.includes('user rejected')) {
        setStatus('Transacción cancelada.');
      } else {
        setStatus(err.reason || 'Error en el proceso. Asegúrate de tener saldo para el gas.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#020617] text-white">
      {/* Background Decor */}
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
