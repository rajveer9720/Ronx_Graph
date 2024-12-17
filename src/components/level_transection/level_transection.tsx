'use client';

import React, { useEffect, useState } from 'react';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import client from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { GETLEVELTRANSACTION } from '@/graphql/GetLevelTransactionTable_LevelSlider/queries';
import { useWallet } from '@/app/context/WalletContext';
import Image from 'next/image';
import Person from '@/assets/icons/profile.png';
import Recycle from '@/assets/icons/recycle_icon.jpg';

interface LevelTransectionProps {
  currentLevel: number;
  matrix: number; // Accept matrix as a prop
}


const levelDataX4 = [
  { level: 1, cost: 0.0001 },
  { level: 2, cost: 0.0002 },
  { level: 3, cost: 0.0004 },
  { level: 4, cost: 0.0008 },
  { level: 5, cost: 0.0016 },
  { level: 6, cost: 0.0032 },
  { level: 7, cost: 0.0064 },
  { level: 8, cost: 0.0128 },
  { level: 9, cost: 0.0256 },
  { level: 10, cost: 0.0512 },
  { level: 11, cost: 0.1024 },
  { level: 12, cost: 0.2048 },
];


interface MatrixDataRow {
  user: string;
  transactionHash: string;
  blockTimestamp: string;
  matrix: number;
  level: number;
  place: number;
}

function LevelTransection({ currentLevel, matrix }: LevelTransectionProps) {
  const walletAddress = useWallet();
  const staticAddress = walletAddress ? walletAddress.walletAddress : null;
  const userWalletAddress = staticAddress;

  const [matrixData, setMatrixData] = useState<MatrixDataRow[]>([]);

  // Fetch Transactions table data fetch using walletAddress matrix and level
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await client.query({
          query: GETLEVELTRANSACTION("0xD733B8fDcFaFf240c602203D574c05De12ae358C" , matrix, currentLevel),
          variables: { userId: userWalletAddress?.toString() || '', matrix, level: currentLevel }
        }) as ApolloQueryResult<any>;
        if (data) {
          setMatrixData(data.newUserPlaces);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, [userWalletAddress, matrix, currentLevel]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  return (
    <div className="overflow-x-auto bg-[#121212] p-6 rounded-lg shadow-md">
      <table className="min-w-full bg-[#1f2937] border border-gray-700 text-white">
        <thead>
          <tr className="bg-[#2c2f38]">
              <th className="px-4 py-2 border-b border-gray-600">Type</th>
            <th className="px-4 py-2 border-b border-gray-600">User</th>
            <th className="px-4 py-2 border-b border-gray-600">Timestamp</th>
            <th className="px-4 py-2 border-b border-gray-600">Matrix</th>
            <th className="px-4 py-2 border-b border-gray-600">Level</th>
            <th className="px-4 py-2 border-b border-gray-600">Place</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, index) => (
            <tr key={index} className="hover:bg-[#3a3f48]">
                <td className="px-4 py-2 border-b border-gray-600" style={{ color: row.place === 3 ? 'green' : 'inherit' }}>
                  {row.place === 3 ? (
                  <>
                 <Image src={Recycle} alt="Recycle" width={20} height={20} />
                  </>
                  ) : (
                  <Image src={Person} alt="Person" width={20} height={20} />
                  )}
                </td>
              <td className="px-4 py-2 border-b border-gray-600">{row.user}        
                 <button
                onClick={() => handleCopy(row.transactionHash)}
                className="ml-2 text-white hover:text-blue-700"
              >
                <CopyIcon />&nbsp;
              </button>
                <a
                  href={`https://testnet.bscscan.com/tx/${row.transactionHash}`}
                  target="_blank"
                  title='View on BscScan'
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                   <ExternalLinkIcon />
                </a>
              </td>
              <td className="px-4 py-2 border-b border-gray-600">{new Date(parseInt(row.blockTimestamp) * 1000).toLocaleString()}</td>
              <td className="px-4 py-2 border-b border-gray-600">{matrix ===1?"x3":"x4"}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row.level}</td>
                <td className="px-4 py-2 border-b border-gray-600" style={{ color: row.place === 3 ? 'green' : 'inherit' }}>{row.place === 3 ? 'recycle': `${levelDataX4.find(level => level.level === row.level)?.cost} BNB`}</td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelTransection;