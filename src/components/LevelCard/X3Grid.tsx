// src/components/LevelCard/X3Grid.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';
import NotifyBot from '@/components/notifybot/notifybot';
import LevelCard from './LevelCard'; // Ensure the path is correct

const levelDataX3 = [
  { level: 1, cost: 5 },
  { level: 2, cost: 10 },
  { level: 3, cost: 20 },
  { level: 4, cost: 40 },
  { level: 5, cost: 80 },
  { level: 6, cost: 160 },
  { level: 7, cost: 320 },
  { level: 8, cost: 640 },
  { level: 9, cost: 1250 },
  { level: 10, cost: 2500 },
  { level: 11, cost: 5000 },
  { level: 12, cost: 9900 },
];

const X3Grid: React.FC = () => {
  const { getTotalCycles, userX3Matrix, getPartnerCount } = useSmartContract();
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levelDataX3.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levelDataX3.length).fill(0));
  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 1; // x3 matrix
  const [partnerNew, setPartnerNew] = useState<number[]>(Array(levelDataX3.length).fill(0));

  useEffect(() => {
    const fetchCyclesAndPartnersData = async () => {
      try {
        const updatedCycles = await Promise.all(
          levelDataX3.map(async (data) => {
            const cycles = await getTotalCycles(userAddress, matrix, data.level);
            return cycles;
          })
        );

        const updatedPartners = await Promise.all(
          levelDataX3.map(async (data) => {
            const partnersInfo = await userX3Matrix(userAddress, data.level);
            return partnersInfo[1].length;
          })
        );

        const partnersCount = await Promise.all(
          levelDataX3.map(async (data) => {
            return await getPartnerCount(userAddress, matrix, data.level) || 0;
          })
        );

        setCyclesData(updatedCycles);
        setPartnersData(updatedPartners);
        setPartnerNew(partnersCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCyclesAndPartnersData();
  }, [getTotalCycles, userX3Matrix, getPartnerCount]);

  return (
    <div className="p-5 min-h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">Ronx x3</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 rounded-lg border border-gray-700">
          {levelDataX3.map((data, index) => (
            <LevelCard
              key={data.level}
              level={data.level}
              cost={data.cost}
              partners={partnerNew[index]}
              cycles={cyclesData[index]}
              partnersCount={partnersData[index]}
            />
          ))}
        </div>
      </div>
      <NotifyBot />
    </div>
  );
};

export default X3Grid;
