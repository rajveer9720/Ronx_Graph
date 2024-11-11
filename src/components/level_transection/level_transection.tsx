'use client';

import React, { useEffect, useState } from 'react';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context
import { BigNumber } from 'ethers';

function LevelTransection() {
  const { getDetailedMatrixInfo } = useSmartContract();
  const [matrixData, setMatrixData] = useState([]);

  useEffect(() => {
    const fetchMatrixData = async () => {
      try {
        const data = await getDetailedMatrixInfo(1, 1, 1); // Example userId, matrix, and level
        console.log('Matrix data:', data);
        // Convert BigNumber objects to strings
        const formattedData = data.map((row: any) => row.map((cell: any) => BigNumber.isBigNumber(cell) ? cell.toString() : cell));
        setMatrixData(formattedData || []);
      } catch (error) {
        console.error('Error fetching matrix data:', error);
        setMatrixData([]);
      }
    };

    fetchMatrixData();
  }, [getDetailedMatrixInfo]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#1f2937] bg-white border border-gray-200 text-blc">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">User ID</th>
            <th className="px-4 py-2 border-b">User Address</th>
            <th className="px-4 py-2 border-b">Timestamp</th>
            <th className="px-4 py-2 border-b">Matrix</th>
            <th className="px-4 py-2 border-b">Level</th>
            <th className="px-4 py-2 border-b">User Type</th>
            <th className="px-4 py-2 border-b">Cycle Number</th>
            <th className="px-4 py-2 border-b">Token Amount</th>
          </tr>
        </thead>
        <tbody>
          {matrixData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{row[0]}</td>
              <td className="px-4 py-2 border-b">{row[1]}</td>
              <td className="px-4 py-2 border-b">{new Date(row[2] * 1000).toLocaleString()}</td>
              <td className="px-4 py-2 border-b">{row[3]}</td>
              <td className="px-4 py-2 border-b">{row[4]}</td>
              <td className="px-4 py-2 border-b">{row[5]}</td>
              <td className="px-4 py-2 border-b">{row[6]}</td>
              <td className="px-4 py-2 border-b">{row[7]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LevelTransection;