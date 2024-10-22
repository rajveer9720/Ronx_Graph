'use client'; // Ensure client-side rendering

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to access URL parameters
import LevelHeader from '@/components/levelheader/x4levelheader/x4levelheader';
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
  const { getTotalCycles, userX4Matrix, getPartnerCount, users } = useSmartContract();
  const [currentPartnerLayer1, setCurrentPartnerLayer1] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [currentPartnerLayer2, setCurrentPartnerLayer2] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levels.length).fill(0)); // Initialize with numbers
  const [partnerIdsLayer1, setPartnerIdsLayer1] = useState<(string | null)[][]>(Array(levels.length).fill([])); // For Layer 1 IDs
  const [partnerIdsLayer2, setPartnerIdsLayer2] = useState<(string | null)[][]>(Array(levels.length).fill([])); // For Layer 2 IDs
    // Upline user address id
    const [uplineuserData, setuplineuserData] = useState<{
        id: number;
        referrer: string;
        partnersCount: number;
        registrationTime: number;
      } | null>(null);
    

  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 2; // Assuming a static matrix ID, adjust if needed

  const [userData, setUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  // Fetch current user data
  const handleFetchUser = async () => {
    try {
      const data = await users(userAddress);
      if (data) {
        setUserData(data);
        setError(null); // Clear error if successful
        if (data.referrer) {
            handleFetchUserupline(data.referrer);
          }
      } else {
        setError("No data found for the user.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  // Fetch upline user data
  const handleFetchUserupline = async (referrerAddress: string) => {
    try {
      const data = await users(referrerAddress);
      if (data) {
        setuplineuserData(data);
        setError(null); // Clear error if successful
      } else {
        setError("No data found for the upline.");
      }
    } catch (err) {
      console.error("Error fetching upline user data:", err);
      setError("Failed to fetch upline user data. Please try again.");
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, [users, userAddress]);

  // Fetch cycles and partner data
  useEffect(() => {
    const fetchCyclesAndPartnersData = async () => {
      try {
        // Fetch total cycles for each level
        const updatedCycles = await Promise.all(
          levels.map(async (level) => {
            const cycles = await getTotalCycles(userAddress, matrix, level.level);
            return cycles;
          })
        );

        // Fetch partner counts for each level
        const updatedPartners = await Promise.all(
          levels.map(async (level) => {
            const partnerCount = await getPartnerCount(userAddress, matrix, level.level);
            return partnerCount || 0;
          })
        );

        const fetchUserIdByAddress = async (partnerAddress: string) => {
          try {
            const userInfo = await users(partnerAddress);
            if (userInfo) {
              return userInfo.id;
            }
            return null;
          } catch (error) {
            console.error(`Error fetching user ID for address ${partnerAddress}:`, error);
            return null;
          }
        };

        // Fetch partner data for both layers
        const layer1Data = await Promise.all(
          levels.map(async (level) => {
            const partnersInfo = await userX4Matrix(userAddress, level.level);
            if (partnersInfo && Array.isArray(partnersInfo[1])) {
              const partnerAddressesLayer1 = partnersInfo[1];
              const userIdsLayer1 = await Promise.all(
                partnerAddressesLayer1.map(async (address) => {
                  const userId = await fetchUserIdByAddress(address);
                  return userId;
                })
              );
              setPartnerIdsLayer1((prev) => {
                const newPartnerIds = [...prev];
                newPartnerIds[level.level - 1] = userIdsLayer1;
                return newPartnerIds;
              });
              return partnerAddressesLayer1.length;
            }
            return 0;
          })
        );

        const layer2Data = await Promise.all(
          levels.map(async (level) => {
            const partnersInfo = await userX4Matrix(userAddress, level.level);
            if (partnersInfo && Array.isArray(partnersInfo[2])) {
              const partnerAddressesLayer2 = partnersInfo[2];
              const userIdsLayer2 = await Promise.all(
                partnerAddressesLayer2.map(async (address) => {
                  const userId = await fetchUserIdByAddress(address);
                  return userId;
                })
              );
              setPartnerIdsLayer2((prev) => {
                const newPartnerIds = [...prev];
                newPartnerIds[level.level - 1] = userIdsLayer2;
                return newPartnerIds;
              });
              return partnerAddressesLayer2.length;
            }
            return 0;
          })
        );

        setCurrentPartnerLayer1(layer1Data);
        setCurrentPartnerLayer2(layer2Data);
        setCyclesData(updatedCycles);
        setPartnersData(updatedPartners);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCyclesAndPartnersData();
  }, [getTotalCycles, userX4Matrix, getPartnerCount, userAddress, matrix]);

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
  const adjustedPartnersCount = partnersData[currentLevel - 1];
  const cyclesContribution = cyclesData[currentLevel - 1] * 3 * levelData.cost;
  const partnerContribution = Math.min(currentPartnerLayer2[currentLevel - 1], 3) * levelData.cost;
  const totalRevenue = cyclesContribution + partnerContribution;

  return (
    <>
      <LevelHeader userid={userData?.id } level={currentLevel} uplineId={uplineuserData?.id}  />
      <div className="flex items-center justify-center text-white p-4 mx-auto max-w-screen-lg">
        <button
          onClick={previousLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${currentLevel === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
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
                  <div className="text-xl font-bold">ID: {userData?.id || 'Loading...'}</div> {/* Safely access userData.id */}
                  <div className="text-lg">{levelData.cost} BUSD</div>
                </div>

                {/* First Layer of Partner Circles */}
                <div className="flex justify-center items-center mb-6 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`relative w-24 h-24 rounded-full ${i < currentPartnerLayer1[currentLevel - 1] ? 'bg-blue-300' : 'bg-gray-400'
                          }`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                          {partnerIdsLayer1[currentLevel - 1][i] || 'N/A'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Second Layer of Partner Circles */}
                <div className="flex justify-center items-center mb-6 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`relative w-24 h-24 rounded-full ${i < currentPartnerLayer2[currentLevel - 1] ? 'bg-blue-300' : 'bg-gray-400'
                          }`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center font-bold text-lg">
                          {partnerIdsLayer2[currentLevel - 1][i] || 'N/A'}
                        </span>
                      </div>
                    </div>
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
                  <span className="mr-2">💰</span>
                  {totalRevenue}
                  BUSD
                                  </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={nextLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${currentLevel === 12 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          disabled={currentLevel === 12}
        >
          {currentLevel < 12 ? currentLevel + 1 : ''}
        </button>
      </div>
      <TransactionTable />
      <NotifyBot />
    </>
  );
};

export default LevelSlider;
