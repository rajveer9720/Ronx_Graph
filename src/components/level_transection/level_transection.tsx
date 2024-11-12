'use client';

import React, { useEffect, useState } from 'react';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context
import { BigNumber } from 'ethers';
import {CopyIcon} from '@chakra-ui/icons'

type MatrixDataRow = [
  string, // User ID
  string, // User Address
  number, // Timestamp
  number, // Matrix
  number, // Level
  string, // User Type
  number, // Cycle Number
  BigNumber // Token Amount
];

interface LevelTransectionProps {
  currentLevel: number;
  matrix: number; // Accept matrix as a prop
}

function LevelTransection({ currentLevel, matrix }: LevelTransectionProps) {
  const { getDetailedMatrixInfo } = useSmartContract();
  const [matrixData, setMatrixData] = useState<MatrixDataRow[]>([]);

  // Function to fetch and format matrix data
  const fetchMatrixData = async () => {
    try {
      // Fetch matrix data based on the current level and matrix passed as a prop
      const data = await getDetailedMatrixInfo(1, matrix, currentLevel);
      console.log('Matrix data:', data);

      // Format the matrix data
      const formattedData = data.map((row: MatrixDataRow) => {
        // Map through each row and modify the Matrix column value (row[3])
        return row.map((cell, index) => {
          if (index === 3) {
            // Modify the matrix value (1 -> x3, 2 -> x4)
            return cell === 1 ? 'x3' : cell === 2 ? 'x4' : cell;
          }
          return BigNumber.isBigNumber(cell) ? cell.toString() : cell;
        }) as MatrixDataRow;
      });

      // Update state with the formatted matrix data
      setMatrixData(formattedData || []);
    } catch (error) {
      console.error('Error fetching matrix data:', error);
      setMatrixData([]); // Clear the data in case of error
    }
  };

  // useEffect hook to fetch data when the component mounts or when the currentLevel or matrix changes
  useEffect(() => {
    fetchMatrixData();
  }, [currentLevel, matrix]); // Depend on both currentLevel and matrix

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
            <th className="px-4 py-2 border-b border-gray-600">User ID</th>
            <th className="px-4 py-2 border-b border-gray-600">Wallet Address</th>
            <th className="px-4 py-2 border-b border-gray-600">Timestamp</th>
            <th className="px-4 py-2 border-b border-gray-600">Matrix</th>
            <th className="px-4 py-2 border-b border-gray-600">Level</th>
            <th className="px-4 py-2 border-b border-gray-600">User Type</th>
            <th className="px-4 py-2 border-b border-gray-600">Cycle Number</th>
            <th className="px-4 py-2 border-b border-gray-600">Token Amount</th>
            <th className="px-4 py-2 border-b border-gray-600">Timestamp</th>
            <th className="px-4 py-2 border-b border-gray-600">Matrix</th>
            <th className="px-4 py-2 border-b border-gray-600">Level</th>
            <th className="px-4 py-2 border-b border-gray-600">User Type</th>
            <th className="px-4 py-2 border-b border-gray-600">Cycle Number</th>
            <th className="px-4 py-2 border-b border-gray-600">Token Amount</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, index) => (
            <tr key={index} className="hover:bg-[#3a3f48]">
              <td className="px-4 py-2 border-b border-gray-600">{row[0]}</td>
              <td className="px-4 py-2 border-b border-gray-600">
                {row[1]}
                <button
                  onClick={() => handleCopy(row[1])}
                  className="ml-2 text-white hover:text-blue-700"
                >
                  <CopyIcon />
                </button>
              </td>
            {/* table layout component  */}
            <table>
              <thead>
                <tr>

                  </tr>
              </thead>
            </table>
              <td className="px-4 py-2 border-b border-gray-600">{new Date(row[2] * 1000).toLocaleString()}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row[3]}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row[4]}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row[5]}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row[6]}</td>
              <td className="px-4 py-2 border-b border-gray-600">{row[7].toString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelTransection;