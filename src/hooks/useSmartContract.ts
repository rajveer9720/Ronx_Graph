import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import contractABI from '../data/abi/contractABI.json'; // Adjust your ABI path as necessary

export const useSmartContract = (provider: ethers.providers.Web3Provider | null, contractAddress: string) => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [basicPrice, setBasicPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (provider) {
        try {
          const contractInstance = new ethers.Contract(contractAddress, contractABI, provider);
          setContract(contractInstance);
          console.log("Contract initialized:", contractInstance);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      }
    };
    initializeContract();
  }, [provider, contractAddress]);
  
  const fetchBasicPrice = async () => {
    setLoading(true);
    setError(null);
    if (!contract) {
        setError("Contract not initialized.");
        setLoading(false);
        return;
    }

    try {
        console.log("Fetching BASIC_PRICE from contract...");
        const priceInWei = await contract.BASIC_PRICE();
        console.log("Fetched Price (in Wei):", priceInWei.toString());
        const priceInEth = ethers.utils.formatEther(priceInWei);
        console.log("Price in ETH:", priceInEth);
        setBasicPrice(priceInEth);
    } catch (err) {
        setError("Failed to fetch BASIC_PRICE from contract.");
        console.error("Error fetching BASIC_PRICE from contract:", err);
    } finally {
        setLoading(false);
    }
};


  return { contract, basicPrice, fetchBasicPrice, loading, error }; // Include contract here
};
