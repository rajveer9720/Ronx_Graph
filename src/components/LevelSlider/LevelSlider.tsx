'use client'; // Ensure client-side rendering

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to access URL parameters
import LevelHeader from '@/components/levelheader/levelheader';
import TransactionTable from '@/components/transaction/transaction-table'; 
import NotifyBot from '@/components/notifybot/notifybot';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context

const levels = [
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

const LevelSlider: React.FC = () => {
  const searchParams = useSearchParams(); // Get search parameters from URL
  const initialLevel = Number(searchParams.get('level')) || 1; // Get 'level' from URL, fallback to 1 if not present
  const [currentLevel, setCurrentLevel] = useState(initialLevel); // Use URL parameter for the initial state
  const { getTotalCycles, userX3Matrix } = useSmartContract();
  
  // State to hold cycles and partners data
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levels.length).fill(0)); // Initialize with numbers
  
  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 1; // Assuming a static matrix ID, adjust if needed

  useEffect(() => {
    const fetchCyclesAndPartnersData = async () => {
      try {
        const updatedCycles = await Promise.all(
          levels.map(async (level) => {
            const cycles = await getTotalCycles(userAddress, matrix, level.level);
            return cycles;
          })
        );

        const updatedPartners = await Promise.all(
          levels.map(async (level) => {
            const partnersInfo = await userX3Matrix(userAddress, level.level);
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
  }, [getTotalCycles, userX3Matrix, userAddress, matrix]);

  const nextLevel = () => {
    if (currentLevel < 12) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const previousLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const levelData = levels.find(level => level.level === currentLevel);

  // Calculate adjusted partners count
  const adjustedPartnersCount = cyclesData[currentLevel - 1] !== null 
    ? cyclesData[currentLevel - 1] * 3 + partnersData[currentLevel - 1] 
    : 0;

  return (
    <>
      <LevelHeader level={currentLevel} uplineId={123456} />
      <div className="flex items-center justify-center text-white p-4 mx-auto max-w-screen-lg">
        <button
          onClick={previousLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${
            currentLevel === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          disabled={currentLevel === 1}
        >
          {currentLevel > 1 ? currentLevel - 1 : ''}
        </button>
        <div className="flex-grow mx-4">
          {levelData && (
            <div className="bg-blue-700 rounded-lg text-center border border-gray-600 relative">
              <div className="p-9">
                <div className="flex justify-between items-center mb-6">
                  <div className="text-xl font-bold">Lvl {levelData.level}</div>
                  <div className="text-xl font-bold">ID {1}</div>
                  <div className="text-lg">{levelData.cost} BUSD</div>
                </div>
                <div className="flex justify-center items-center mb-6 gap-4">
                  {/* Partner Circles */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full ${
                        i < partnersData[currentLevel - 1] ? 'bg-blue-600' : 'bg-gray-400' // Blue if i < adjustedPartnersCount, else gray
                      }`}
                    />

                  ))}
                  
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="mr-2">👥</span> {adjustedPartnersCount}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🔄</span> {cyclesData[currentLevel - 1] !== null ? cyclesData[currentLevel - 1] : 'Loading...'}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <span className="mr-2">💰</span> {0} BUSD
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={nextLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${
            currentLevel === 12 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          disabled={currentLevel === 12}
        >
          {currentLevel < 12 ? currentLevel + 1 : ''}
        </button>
      </div>
      <div className="my-9">
        <NotifyBot />
        <TransactionTable />
      </div>
    </>
  );
};

export default LevelSlider;
