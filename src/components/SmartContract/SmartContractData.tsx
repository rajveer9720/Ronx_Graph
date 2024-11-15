import React, { useEffect } from 'react';
import { useSmartContract } from '../../hooks/useSmartContract';
import { useWeb3 } from '../../hooks/useWeb3';
import ConnectWallet from '../connectWallets/ConnectWallet';

const contractAddress = "0x6f4dc25CEb0581eDD1Cc5A982794AC021bFEa2a5"; // Your contract address on BSC Testnet

const SmartContractComponent = () => {
  const { provider, account } = useWeb3(); // Extract account from useWeb3
  const { basicPrice, fetchBasicPrice, loading, error, contract } = useSmartContract(provider, contractAddress);

  useEffect(() => {
    console.log("Provider:", provider);
    console.log("Contract:", contract);
    
    // Fetch basic price only if provider, contract, and account are available
    if (provider && contract && account) {
      fetchBasicPrice();
    }
  }, [provider, contract, account]); // Add account to dependencies

  return (
    <div>
      
      {/* <h2>BASIC_PRICE: {loading ? "Loading..." : basicPrice !== null ? `${basicPrice} ETH` : "null ETH"}</h2> */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default SmartContractComponent;
