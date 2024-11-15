import { ethers } from "ethers";
import CONTRACT_ABI from "./abi.json";

// Define the Infura project ID and BSC testnet endpoint
const INFURA_PROJECT_ID = "10ea86c5db904f06b7c9b6676e5bbc5c";
const BSC_TESTNET_RPC_URL = `https://bsc-testnet.infura.io/v3/${INFURA_PROJECT_ID}`;

// Set up the BSC testnet provider using Infura's JSON-RPC URL
const provider = new ethers.providers.JsonRpcProvider(BSC_TESTNET_RPC_URL);

// Define the smart contract address
const CONTRACT_ADDRESS = "0x5851AB785371DEaD6B9C54114C39a09Cd8F68045";

// TypeScript interface for the partner data
export interface Partner {
  id: number;
  wallet: string;
  timestamp: string;
  levelX3: number;
  levelX6: number;
}

// Function to fetch data from the smart contract
export const fetchPartnerData = async (userId: number): Promise<Partner[]> => {
  try {
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    
    // Fetch data from the contract
    const data = await contract.getDirectPartnerDetails(userId);
    console.log("Raw Data:", data);

    // Transform the raw data into a readable format
    return data.map((partner: any) => ({
      id: partner[0].toNumber(),
      wallet: partner[1],
      timestamp: new Date(partner[2].toNumber() * 1000).toLocaleString(), // Convert to human-readable date
      levelX3: partner[3],
      levelX6: partner[4],
    }));
  } catch (error) {
    console.error("Error fetching partner data:", error);
    return [];
  }
};
