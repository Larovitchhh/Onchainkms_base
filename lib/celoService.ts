import { ethers } from 'ethers';

const CELO_CONTRACT_ADDRESS = "0xf9525c4b7ba4fd88d3f22f575d0c63889bc7db9f";

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
  try {
    // En Ethers v6, se usa directamente JsonRpcProvider
    const provider = new ethers.JsonRpcProvider("https://forno.celo.org");
    const contract = new ethers.Contract(CELO_CONTRACT_ADDRESS, CELO_ABI, provider);
    
    // En v6, las llamadas a contratos devuelven BigInt directamente
    const balance = await contract.balanceOf(address);
    return balance > 0n; // '0n' es la sintaxis de BigInt en JS
  } catch (error) {
    console.error("Error checking Celo pass:", error);
    return false;
  }
}
