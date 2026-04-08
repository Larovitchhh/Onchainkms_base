'use client';
import { useState, useEffect } from 'react';
import { getWallet } from '@/lib/wallet';
import { mintCeloPass } from '@/lib/celoService';

export default function CeloCompetitionPage() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMint = async () => {
    setLoading(true);
    try {
      const { signer } = await getWallet();
      const network = await signer.provider.getNetwork();
      
      // Verificamos si está en Celo (Chain ID 42220)
      if (network.chainId !== 42220) {
        setStatus('Error: Cambia tu wallet a la red Celo Mainnet');
        setLoading(false);
        return;
      }

      setStatus('Minteando tu OnchainPass en Celo...');
      await mintCeloPass(signer);
      setStatus('¡Éxito! NFT de Celo reclamado correctamente.');
    } catch (err: any) {
      console.error(err);
      setStatus(err.reason || 'Error en el proceso de minteo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-[#121212] text-white">
      <div className="max-w-md p-8 border border-[#38bdf8] rounded-2xl bg-black/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
        <h1 className="text-3xl font-bold mb-4">Celo Builder Program</h1>
        <p className="text-gray-400 mb-8">Reclama tu OnchainPass exclusivo para la campaña Proof of Ship.</p>
        
        <button 
          onClick={handleMint}
          disabled={loading}
          className="w-full py-4 bg-[#fbcc5c] text-black font-extrabold rounded-xl hover:scale-105 transition-transform disabled:opacity-50"
        >
          {loading ? 'Procesando...' : 'MINT ONCHAIN PASS'}
        </button>

        {status && (
          <p className={`mt-6 p-3 rounded-lg text-sm ${status.includes('Éxito') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
