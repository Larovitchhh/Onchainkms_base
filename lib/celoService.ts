import { ethers } from 'ethers';

const CELO_CONTRACT_ADDRESS = "0xf9525c4b7ba4fd88d3f22f575d0c63889bc7db9f";

// ABI mínimo para interactuar con el contrato
const CELO_ABI = [
  "function mintPass() public",
  "function hasMinted(address user) public view returns (bool)",
  "function balanceOf(address owner) public view returns (uint256)"
];

export async function mintCeloPass(signer: any) {
  const contract = new ethers.Contract(CELO_CONTRACT_ADDRESS, CELO_ABI, signer);
  const tx = await contract.mintPass();
  return await tx.wait();
}

export async function checkCeloPass(address: string) {
  // Usamos el RPC público de Celo para consultar sin necesidad de conectar wallet
  const provider = new ethers.providers.JsonRpcProvider("https://forno.celo.org");
  const contract = new ethers.Contract(CELO_CONTRACT_ADDRESS, CELO_ABI, provider);
  const balance = await contract.balanceOf(address);
  return balance.toNumber() > 0;
}
