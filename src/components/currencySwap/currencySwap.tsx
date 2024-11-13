'use client';

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWallet } from '@/app/context/WalletContext';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';

declare let window: any;

// PancakeSwap Router V2 (Testnet)
const PANCAKE_ROUTER_ADDRESS = '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3';
// BUSD Contract Address (Testnet)
const BUSD_CONTRACT_ADDRESS = '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee';
// WBNB Contract Address (Testnet)
const WBNB_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';

// PancakeSwap Router ABI for swapping and liquidity actions
const PANCAKE_ROUTER_ABI = [
  {
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' },
      { name: 'amountADesired', type: 'uint256' },
      { name: 'amountBDesired', type: 'uint256' },
      { name: 'amountAMin', type: 'uint256' },
      { name: 'amountBMin', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'addLiquidity',
    outputs: [
      { name: 'amountA', type: 'uint256' },
      { name: 'amountB', type: 'uint256' },
      { name: 'liquidity', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amountTokenDesired', type: 'uint256' },
      { name: 'amountTokenMin', type: 'uint256' },
      { name: 'amountETHMin', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'addLiquidityETH',
    outputs: [
      { name: 'amountToken', type: 'uint256' },
      { name: 'amountETH', type: 'uint256' },
      { name: 'liquidity', type: 'uint256' },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'amountOut', type: 'uint256' },
      { name: 'reserveIn', type: 'uint256' },
      { name: 'reserveOut', type: 'uint256' },
    ],
    name: 'getAmountIn',
    outputs: [{ name: 'amountIn', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'reserveIn', type: 'uint256' },
      { name: 'reserveOut', type: 'uint256' },
    ],
    name: 'getAmountOut',
    outputs: [{ name: 'amountOut', type: 'uint256' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

interface SwapComponentProps {
  onClose: () => void;
}

export default function SwapComponent({ onClose }: SwapComponentProps) {
  const { walletAddress } = useWallet();
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize Web3 instance
  useEffect(() => {
    if (window?.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Request account access if not already connected
      window.ethereum.request({ method: 'eth_requestAccounts' });
    }
  }, []);

  // Handle BNB to BUSD Swap
  const handleSwap = async () => {
    if (!web3 || !walletAddress || !amount) {
      alert('Please connect your wallet and enter a valid amount.');
      return;
    }

    const routerContract = new web3.eth.Contract(PANCAKE_ROUTER_ABI, PANCAKE_ROUTER_ADDRESS);
    const path = [WBNB_ADDRESS, BUSD_CONTRACT_ADDRESS];
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
    const value = web3.utils.toWei(amount, 'ether');

    setLoading(true);

    try {
      // Estimate gas
      let gasEstimate;
      try {
        gasEstimate = await routerContract.methods
          .swapExactETHForTokensSupportingFeeOnTransferTokens(0, path, walletAddress, deadline)
          .estimateGas({ from: walletAddress, value });
      } catch (gasError) {
        console.warn('Gas estimation failed, using default gas limit.');
        gasEstimate = 300000; // Fallback gas limit
      }

      console.log('Gas estimate:', gasEstimate);

      // Execute the swap
      const tx = await routerContract.methods
        .swapExactETHForTokensSupportingFeeOnTransferTokens(0, path, walletAddress, deadline)
        .send({ from: walletAddress, value, gas: gasEstimate });

      console.log('Swap successful:', tx);
      alert('Swap successful!');
      onClose();
    } catch (error: any) {
      console.error('Swap error:', error);
      const errorMessage = error?.message || 'Swap failed. Check the console for details.';
      alert(`Swap failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>

      {/* Popup Container */}
      <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-md w-full z-50">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Swap Title */}
        <h2 className="text-xl font-bold mb-6 text-center">Swap BNB to BUSD</h2>

        {/* Input Amount */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Amount (BNB):</label>
          <Input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputClassName="focus:!ring-0 placeholder:text-gray-500"
          />
        </div>

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={loading || !amount}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
        >
          {loading ? 'Swapping...' : 'Swap BNB to BUSD'}
        </Button>
      </div>
    </div>
  );
}
