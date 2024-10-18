"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "@/components/SmartContract/abi.json";

const CONTRACT_ADDRESS = "0xdB035d95F1C347D179C1f1DAA305011770880630";
const INFURA_PROJECT_ID = "54342a1556274e579ef82ed1022b7a7c"; // Replace with your Infura Project ID

interface SmartContractContextType {
  fetchData: (methodName: string, ...params: any[]) => Promise<any | null>;
  writeData: (methodName: string, ...params: any[]) => Promise<any | null>;
  usersActiveX3Levels: (userAddress: string, level: number) => Promise<boolean | null>;
  usersActiveX4Levels: (userAddress: string, level: number) => Promise<boolean | null>;
  userX3Matrix: (userAddress: string, level: number) => Promise<number | null>;
  userX4Matrix: (userAddress: string, level: number) => Promise<number | null>;
  
  getTotalCycles: (userAddress: string, matrix: number, level: number) => Promise<number | null>;
  provider: ethers.providers.JsonRpcProvider | null;
}

const SmartContractContext = createContext<SmartContractContextType | undefined>(undefined);

export const SmartContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const infuraProvider = new ethers.providers.JsonRpcProvider(`https://bsc-testnet.infura.io/v3/${INFURA_PROJECT_ID}`);
        setProvider(infuraProvider);
        const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, infuraProvider);
        setContract(contractInstance);
      } catch (error) {
        console.error("Error initializing provider or contract:", error);
      }
    };
    init();
  }, []);

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

  const writeData = async (methodName: string, ...params: any[]) => {
    if (!contract) return null;
    try {
      const signer = provider?.getSigner();
      const contractWithSigner = contract.connect(signer);
      const tx = await contractWithSigner[methodName](...params);
      await tx.wait();
      return tx;
    } catch (error) {
      console.error(`Error writing data to ${methodName}:`, error);
      return null;
    }
  };


  //User check active level in x3
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


  //User check active levels in x4
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
// Fetch users X3 matrix
const userX3Matrix = async (userAddress: string, level: number) => {
  if (!contract) return null;
  try {
    const result = await contract.usersX3Matrix(userAddress, level);
    const address = result[0]; // The user address
    const partners = result[1]; // Array of partner addresses
    const isActive = result[2]; // Boolean for activity
    console.log("result:"+ partners.toString() + level.toString);
    return result; // Return relevant data
  } catch (error) {
    console.error("Error fetching usersX3Matrix:", error);
    return null;
  }
};
  //fetch contract in active current cycle data x4
  const userX4Matrix = async(userAddress: string, level:number) => {
    if (!contract) return null;
    try {
      const result = await contract.userX4Matrix(userAddress, level);
      return result.toNumber(); // Assuming this returns a number
    } catch (error) {
      console.error("Error fetching userX4Matrix:", error);
      return null;
    }
  }

  //fetch any user currect time in complete cycle in any matrix and any level 
  const getTotalCycles = async (userAddress: string, matrix: number, level: number) => {
    if (!contract) return null;
    try {
      const cycles = await contract.getTotalCycles(userAddress, matrix, level);
      return cycles.toNumber();
    } catch (error) {
      console.error("Error fetching total cycles:", error);
      return null;
    }
  };

  return (
    <SmartContractContext.Provider value={{ fetchData, writeData, usersActiveX3Levels, usersActiveX4Levels, getTotalCycles, userX3Matrix, userX4Matrix, provider }}>
      {children}
    </SmartContractContext.Provider>
  );
};

export const useSmartContract = () => {
  const context = useContext(SmartContractContext);
  if (context === undefined) {
    throw new Error("useSmartContract must be used within a SmartContractProvider");
  }
  return context;
};
