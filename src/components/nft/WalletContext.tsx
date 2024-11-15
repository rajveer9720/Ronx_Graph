'use client'; // This marks the component as a client component

import { createContext, useContext } from 'react';
import { useAccount } from 'wagmi';

interface WalletContextType {
  address: string | undefined;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();

  return (
    <WalletContext.Provider value={{ address }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
