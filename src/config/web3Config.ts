import { ethers } from 'ethers';

export const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  } else {
    console.error("Ethereum object doesn't exist!");
    return null;
  }
};
