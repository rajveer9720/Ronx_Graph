'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context
import NotifyBot from '@/components/notifybot/notifybot';

interface LevelCardProps {
  level: number;
  cost: number;
  partners: number;
  cycles: number | null; // Allow cycles to be null initially
  partnersCount: number; // Number of partners for level
}

const LevelCard: React.FC<LevelCardProps> = ({ level, cost, partners, cycles, partnersCount }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/retro/levelslider?level=${level}&cost=${cost}&partners=${partners}&cycles=${cycles}`);
  };

  // Generate partner circles with conditional coloring
  const renderPartnerCircles = () => {
    const circles = [];

    for (let i = 0; i < 3; i++) {
      circles.push(
        <div
          key={i}
          className={`w-10 h-10 rounded-full ${
            i < partnersCount ? 'bg-blue-600' : 'bg-gray-400' // Blue if i < partnersCount, else gray
          }`}
        ></div>
      );
    }

    return circles;
  };

  return (
    <div
      className="bg-blue-700 p-4 rounded-lg text-center border border-gray-600 relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between mb-4">
        <div className="text-xl font-bold">Lvl {level}</div>
        <div className="text-lg">{cost} BUSD</div>
      </div>
      <div className="flex gap-4 justify-center space-x-210 my-10">
        {renderPartnerCircles()}
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="mr-2">👥</span> {partners}
        </div>
        <div className="flex items-center">
          <span className="mr-2">🔄</span> {cycles !== null ? cycles : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

const levelData = [
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

const RonxGrid: React.FC = () => {
  const { getTotalCycles, userX3Matrix } = useSmartContract();
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levelData.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levelData.length).fill(0)); // Initialize with numbers
  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 1;

  useEffect(() => {
    const fetchCyclesAndPartnersData = async () => {
      try {
        const updatedCycles = await Promise.all(
          levelData.map(async (data) => {
            const cycles = await getTotalCycles(userAddress, matrix, data.level);
            return cycles;
          })
        );

        const updatedPartners = await Promise.all(
          levelData.map(async (data) => {
            const partnersInfo = await userX3Matrix(userAddress, data.level);
            const partnerCount = partnersInfo[1].length; // Assuming [1] contains the partner addresses
            return partnerCount;
          })
        );

        setCyclesData(updatedCycles);
        setPartnersData(updatedPartners);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCyclesAndPartnersData();
  }, [getTotalCycles, userX3Matrix]);

  return (
    <div className="p-5 min-h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">Forsage x3</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 rounded-lg border border-gray-700">
          {levelData.map((data, index) => (
            <LevelCard
              key={data.level}
              level={data.level}
              cost={data.cost}
              partners={cyclesData[index] !== null ? cyclesData[index] * 3 + partnersData[index] : 0} // Adjusted partners calculation
              cycles={cyclesData[index]}
              partnersCount={partnersData[index]} // Pass the number of partners
            />
          ))}
        </div>
      </div>
      <NotifyBot />
    </div>
  );
};

export default RonxGrid;
