
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to access URL parameters
import LevelHeader from '@/components/levelheader/levelheader';
import TransactionTable from '@/components/transaction/transaction-table';
import NotifyBot from '@/components/notifybot/notifybot';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context

// Define levels
const levels = Array.from({ length: 12 }, (_, i) => ({ level: i + 1, cost: 10 * (i + 1) })); // Sample level costs

const LevelSlider: React.FC = () => {
  const searchParams = useSearchParams(); // Get search parameters from URL
  const initialLevel = Number(searchParams.get('level')) || 1; // Get 'level' from URL, fallback to 1 if not present
  const [currentLevel, setCurrentLevel] = useState(initialLevel); // Use URL parameter for the initial state
  const { getTotalCycles, userX3Matrix, getPartnerCount, users } = useSmartContract();
  const [currentPartner, setCurrentPartner] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levels.length).fill(0)); // Initialize with numbers
  const [partnerIds, setPartnerIds] = useState<(string | null)[][]>(Array(levels.length).fill([])); // State to hold partner IDs
  const [uplineuserData, setUplineUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);

  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 1;

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
        // Fetch the referrer (upline user data) based on the referrer address from the userData
        if (data.referrer) {
          handleFetchUplineUser(data.referrer);
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
  const handleFetchUplineUser = async (referrerAddress: string) => {
    try {
      const data = await users(referrerAddress);
      if (data) {
        setUplineUserData(data);
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
        const updatedCycles = await Promise.all(
          levels.map(async (level) => {
            const cycles = await getTotalCycles(userAddress, matrix, level.level);
            return cycles;
          })
        );

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

        const currentData = await Promise.all(
          levels.map(async (level) => {
            const partnersInfo = await userX3Matrix(userAddress, level.level);

            if (partnersInfo && Array.isArray(partnersInfo[1])) {
              const partnerAddresses = partnersInfo[1];
              const partnerCount = partnerAddresses.length;
              console.log("partnerCount:" + partnerCount);
              const userIds = await Promise.all(
                partnerAddresses.map(async (address) => {
                  const userId = await fetchUserIdByAddress(address);
                  return userId;
                })
              );

              setPartnerIds((prev) => {
                const newPartnerIds = [...prev];
                newPartnerIds[level.level - 1] = userIds;
                return newPartnerIds;
              });

              return partnerCount;
            }

            return 0;
          })
        );

        setCurrentPartner(currentData);
        setCyclesData(updatedCycles);
        setPartnersData(updatedPartners);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCyclesAndPartnersData();
  }, [getTotalCycles, userX3Matrix, getPartnerCount, userAddress, matrix]);

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

  const levelData = levels.find((level) => level.level === currentLevel);
  const adjustedPartnersCount = partnersData[currentLevel - 1];
  const cyclesContribution = (cyclesData[currentLevel - 1] || 0) * 2 * levelData.cost;
  const partnerContribution = (currentPartner[currentLevel - 1] || 0) * levelData.cost;
  const totalRevenue = cyclesContribution + partnerContribution;

  return (
    <>
      <LevelHeader level={currentLevel} uplineId={uplineuserData?.id} />
      <div className="flex items-center justify-center text-white p-4 mx-auto max-w-screen-lg">
        <button
          onClick={previousLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${currentLevel === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
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
                  <div className="text-xl font-bold">ID: {userData?.id || 'Loading...'}</div>
                  <div className="text-lg">{levelData.cost} BUSD</div>
                </div>
                <div className="flex justify-center items-center mb-6 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className={`relative w-24 h-24 rounded-full ${i < (currentPartner[currentLevel - 1] || 0) ? 'bg-blue-600' : 'bg-gray-400'}`}>
                        {i < (currentPartner[currentLevel - 1] || 0) && partnerIds[currentLevel - 1]?.[i] && (
                          <span className="absolute inset-0 flex justify-center items-center text-sm text-white">{partnerIds[currentLevel - 1][i]}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-sm">Total Partners: </span>
                    <span className="ml-2">{adjustedPartnersCount}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm">Total Cycles: </span>
                    <span className="ml-2">{cyclesData[currentLevel - 1] || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={nextLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${currentLevel === 12 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}
          disabled={currentLevel === 12}
        >
          {currentLevel < 12 ? currentLevel + 1 : ''}
        </button>
      </div>

      {/* Add TransactionTable and NotifyBot here */}
      <TransactionTable />
      <NotifyBot />
    </Suspense>
  );
};

export default LevelSlider;
