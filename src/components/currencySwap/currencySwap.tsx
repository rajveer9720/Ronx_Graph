'use client';

import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useWallet } from '@/app/context/WalletContext';
import Button from '@/components/ui/button/button';
import Input from '@/components/ui/forms/input';

declare let window: any;

const PANCAKE_ROUTER_ADDRESS = '0x...'; // Replace with actual PancakeSwap Router V2 address
const BUSD_CONTRACT_ADDRESS = '0x...'; // Replace with actual BUSD contract address

// Simplified PancakeSwap Router ABI
const PANCAKE_ROUTER_ABI = [
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactETHForTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactTokensForETH',
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
  const [swapDirection, setSwapDirection] = useState<'BNB_TO_BUSD' | 'BUSD_TO_BNB'>('BNB_TO_BUSD');
  const [loading, setLoading] = useState(false);

  // Initialize Web3 instance
  useEffect(() => {
    if (window?.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  // Handle Swap Function
  const handleSwap = async () => {
    if (!web3 || !walletAddress || !amount) return;

    const routerContract = new web3.eth.Contract(PANCAKE_ROUTER_ABI, PANCAKE_ROUTER_ADDRESS);
    const path =
      swapDirection === 'BNB_TO_BUSD'
        ? ['0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', BUSD_CONTRACT_ADDRESS]
        : [BUSD_CONTRACT_ADDRESS, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'];

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

    setLoading(true);

    try {
      if (swapDirection === 'BNB_TO_BUSD') {
        await routerContract.methods
          .swapExactETHForTokens(0, path, walletAddress, deadline)
          .send({ from: walletAddress, value: web3.utils.toWei(amount, 'ether') });
      } else {
        await routerContract.methods
          .swapExactTokensForETH(0, path, walletAddress, deadline)
          .send({ from: walletAddress });
      }
      alert('Swap successful!');
      onClose();
    } catch (error) {
      console.error('Swap error:', error);
      alert('Swap failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup Container */}
      <div className="relative bg-gray-900 text-white p-8 rounded-lg shadow-lg transform transition-all duration-300 max-w-md w-full z-50">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white focus:outline-none"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Swap Title */}
        <h2 className="text-xl font-bold mb-6 text-center">Swap BNB ↔️ BUSD</h2>

        {/* Input Amount */}
        <div className="mb-6">
          <label className="block text-sm mb-2">Amount:</label>
          <Input
            type="text"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            inputClassName="focus:!ring-0 placeholder:text-gray-500"
          />
        </div>

        {/* Swap Direction Buttons */}
        <div className="flex justify-center mb-6">
          <Button
            onClick={() => setSwapDirection('BNB_TO_BUSD')}
            className={`mr-2 ${swapDirection === 'BNB_TO_BUSD' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            BNB to BUSD
          </Button>
          <Button
            onClick={() => setSwapDirection('BUSD_TO_BNB')}
            className={`${swapDirection === 'BUSD_TO_BNB' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            BUSD to BNB
          </Button>
        </div>
      

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 transition-colors"
        >
          {loading ? 'Swapping...' : `Swap ${swapDirection === 'BNB_TO_BUSD' ? 'BNB to BUSD' : 'BUSD to BNB'}`}
        </Button>
      </div>
    </div>
  );
}

// 