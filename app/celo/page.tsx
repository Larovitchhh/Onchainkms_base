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
      const network = await signer.provider.getNetwork();
      
      if (Number(network.chainId) !== 42220) {
        setStatus('Error: Cambia a la red Celo Mainnet.');
        setLoading(false);
        return;
      }

      setStatus('Minteando OnchainPass...');
      await mintCeloPass(signer);
      setStatus('¡Éxito! NFT de Celo reclamado.');
    } catch (err: any) {
      console.error(err);
      setStatus('Error en el proceso. Verifica tu saldo en CELO.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#020617] text-white">
      <div className="max-w-md w-full p-8 border border-white/10 rounded-3xl bg-slate-900/50 backdrop-blur-xl shadow-2xl">
        <h1 className="text-3xl font-black mb-6">CELO BUILDER</h1>
        <button 
          onClick={handleMint}
          disabled={loading}
          className="w-full py-4 bg-[#FBCC5C] text-black font-extrabold rounded-2xl shadow-[0_0_20px_rgba(251,204,92,0.3)] disabled:opacity-50"
        >
          {loading ? 'PROCESANDO...' : 'MINT ONCHAIN PASS'}
        </button>
        {status && (
          <div className={`mt-6 p-4 rounded-xl text-xs font-bold border ${status.includes('Éxito') ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}
