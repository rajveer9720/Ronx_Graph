import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const useWeb3 = () => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        await web3Provider.send("eth_requestAccounts", []);
        const signer = web3Provider.getSigner();
        setSigner(signer);
        const address = await signer.getAddress();
        setAccount(address);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error("Error connecting to wallet", error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return { provider, signer, account, connectWallet };
};
