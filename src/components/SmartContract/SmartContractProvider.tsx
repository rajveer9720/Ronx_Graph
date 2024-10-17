// components/SmartContractProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/components/SmartContract/abi.json";

// Define the ABI and contract address
const CONTRACT_ADDRESS = "0x04BBddcFc9321458c3403C64Cb5B2EC06b619679";

// Define types for the context
interface SmartContractContextType {
  fetchData: (methodName: string, ...params: any[]) => Promise<any | null>;
  writeData: (methodName: string, ...params: any[]) => Promise<any | null>;
  usersActiveX3Levels: (userAddress: string, level: number) => Promise<boolean | null>;
  usersActiveX4Levels: (userAddress: string, level: number) => Promise<boolean | null>; // New method for x4
  provider: ethers.providers.Web3Provider | null;
}

// Create the context
const SmartContractContext = createContext<SmartContractContextType | undefined>(undefined);

// SmartContractProvider component to provide the context to the rest of the app
export const SmartContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);
          const signer = web3Provider.getSigner();
          const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
          setContract(contractInstance);
        } catch (error) {
          console.error("Error initializing provider or contract:", error);
        }
      } else {
        console.warn("Ethereum object not found. Please install MetaMask.");
      }
    };
    init();
  }, []);

  // Fetch data from the contract
  const fetchData = async (methodName: string, ...params: any[]) => {
    if (!contract) return null;
    try {
      const result = await contract[methodName](...params);
      return result;
    } catch (error) {
      console.error(`Error fetching data from ${methodName}:`, error);
      return null;
    }
  };

  // Write data to the contract
  const writeData = async (methodName: string, ...params: any[]) => {
    if (!contract) return null;
    try {
      const tx = await contract[methodName](...params);
      await tx.wait(); // Wait for the transaction to be mined
      return tx;
    } catch (error) {
      console.error(`Error writing data to ${methodName}:`, error);
      return null;
    }
  };

  // Check if a user is active on a specific X3 level
  const usersActiveX3Levels = async (userAddress: string, level: number) => {
    if (!contract) return null;
    try {
      const result = await contract.usersActiveX3Levels(userAddress, level);
      return result; // Assuming this returns a boolean
    } catch (error) {
      console.error("Error fetching usersActiveX3Levels:", error);
      return null;
    }
  };

  // Check if a user is active on a specific X4 level
  const usersActiveX4Levels = async (userAddress: string, level: number) => {
    if (!contract) return null;
    try {
      const result = await contract.usersActiveX6Levels(userAddress, level);
      return result; // Assuming this returns a boolean
    } catch (error) {
      console.error("Error fetching usersActiveX4Levels:", error);
      return null;
    }
  };

  return (
    <SmartContractContext.Provider value={{ fetchData, writeData, usersActiveX3Levels, usersActiveX4Levels, provider }}>
      {children}
    </SmartContractContext.Provider>
  );
};

// Hook to use the smart contract context
export const useSmartContract = () => {
  const context = useContext(SmartContractContext);
  if (context === undefined) {
    throw new Error("useSmartContract must be used within a SmartContractProvider");
  }
  return context;
};
