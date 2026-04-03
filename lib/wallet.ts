import { ethers } from "ethers"

const BASE_CHAIN_ID = "0x2105" // 8453 en hex

export async function getWallet() {
  if (!(window as any).ethereum) {
    throw new Error("No crypto wallet found. Please use Base App or MetaMask.");
  }

  const ethereum = (window as any).ethereum;

  // Verificamos si ya estamos en Base para evitar pop-ups innecesarios
  const currentChain = await ethereum.request({ method: 'eth_chainId' });
  
  if (currentChain !== BASE_CHAIN_ID) {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: BASE_CHAIN_ID }]
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: BASE_CHAIN_ID,
            chainName: "Base Mainnet",
            nativeCurrency: { name: "Ethereum", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://mainnet.base.org"],
            blockExplorerUrls: ["https://basescan.org"]
          }]
        });
      }
    }
  }

  const provider = new ethers.BrowserProvider(ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return { provider, signer, address };
}
