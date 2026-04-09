import { ethers } from 'ethers';

const CELO_CONTRACT_ADDRESS = "0x114BB711F92eAA9f107ffbe52dB831f2C9414e0F";

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
    const provider = new ethers.JsonRpcProvider("https://forno.celo.org");
    const contract = new ethers.Contract(CELO_CONTRACT_ADDRESS, CELO_ABI, provider);
    const balance = await contract.balanceOf(address);
    // En Ethers v6 balance es un BigInt
    return balance > 0n;
  } catch (error) {
    console.error("Error checking Celo pass:", error);
    return false;
  }
}
