'use client'; // Ensure client-side rendering

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams to access URL parameters
import LevelHeader from '@/components/levelheader/x3levelheader/x3levelheader';
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
  const userId = searchParams.get('userId'); // Extract userId from query parameters
  const initialLevel = Number(searchParams.get('level')) || 1; // Get 'level' from URL, fallback to 1 if not present
  const [currentLevel, setCurrentLevel] = useState(initialLevel); // Use URL parameter for the initial state
  const [userAddress, setUserAddress] = useState<string>(''); // Initially empty, will set to static or fetched address

  const { getTotalCycles, userX3Matrix, getPartnerCount, getUserIdsWalletaddress,users } = useSmartContract();
  const [currentPartner, setcurrentPartner] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levels.length).fill(0)); // Initialize with numbers
  const [partnerIds, setPartnerIds] = useState<(string | null)[][]>(Array(levels.length).fill([])); // State to hold partner IDs
  // Upline user address id
  const [uplineuserData, setuplineuserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);

  const staticAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';
  const matrix = 1; // Assuming a static matrix ID, adjust if needed

  const [userData, setUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);



    // Fetch user wallet address if userId is provided, else use static address
    useEffect(() => {
      const fetchUserAddress = async () => {
        if (userId) {
          try {
            const walletAddress = await getUserIdsWalletaddress(Number(userId)); // Ensure userId is treated as a number
            if (walletAddress) {
              console.log("Fetched wallet address:", walletAddress); // Log the fetched address for debugging
              setUserAddress(walletAddress); // Set the fetched wallet address
            }
          } catch (error) {
            console.error("Error fetching wallet address for userId:", error);
            setUserAddress(staticAddress); // Use static address if fetching fails
          }
        } else {
          // If no userId, use static wallet address
          setUserAddress(staticAddress);
        }
      };
  
      fetchUserAddress();
    }, [userId, getUserIdsWalletaddress]);

  // Fetch current user data
  const handleFetchUser = async () => {
    try {
      const data = await users(userAddress);
      if (data) {
        setUserData(data);
        setError(null); // Clear error if successful
        // Fetch the referrer (upline user data) based on the referrer address from the userData
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

        const currenctData = await Promise.all(
          levels.map(async (level) => {
            const partnersInfo = await userX3Matrix(userAddress, level.level);

            if (partnersInfo && Array.isArray(partnersInfo[1])) {
              const partnerAddresses = partnersInfo[1];
              const partnerCount = partnerAddresses.length;
              console.log("partnerCount:"+ partnerCount);
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

        setcurrentPartner(currenctData);
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

  const levelData = levels.find(level => level.level === currentLevel);
  const adjustedPartnersCount = partnersData[currentLevel - 1];
  // Calculate total revenue considering cycles and partners
  const cyclesContribution = cyclesData[currentLevel - 1] * 2 * levelData.cost;
  console.log("total cyclesCountribution:" + cyclesContribution);
  const partnerContribution = currentPartner[currentLevel - 1] * levelData.cost;
  console.log("total partnerContribution:" + partnerContribution);
  const totalRevenue = cyclesContribution + partnerContribution;
  console.log("total totalRevenue:" + totalRevenue);

// all level TotalRevenue store in DataTotalRevenue in console log in print
const DataTotalRevenue = levels.map((level, index) => {
  const cyclesContribution = cyclesData[index] ? cyclesData[index] * 2 * level.cost : 0; // Calculate cycles contribution for each level
  const partnerContribution = currentPartner[index] ? currentPartner[index] * level.cost : 0; // Calculate partner contribution for each level
  const totalRevenue = cyclesContribution + partnerContribution; // Total revenue for the current level
  return totalRevenue; // Store the total revenue in the array
});


// Log total revenue for each level
DataTotalRevenue.forEach((revenue, index) => {
  console.log(`Total revenue for level ${index + 1}: ${revenue}`);
});

// Calculate the overall total revenue
const overallTotalRevenue = DataTotalRevenue.reduce((acc, curr) => acc + curr, 0);

// Log the array of total revenues
console.log("Total revenue for all levels:", DataTotalRevenue);

// Log the overall total revenue
console.log(`Overall total revenue: ${overallTotalRevenue}`);
  // const TotalRevenueCal = cyclesData[currentLevel - 1] + currentPartner[currentLevel - 1];
  return (
    <>
       <LevelHeader userid={userData?.id } level={currentLevel} uplineId={uplineuserData?.id} />
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
                <div className="flex justify-center items-center mb-6 gap-4">
                  {/* Partner Circles with User IDs */}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`relative w-24 h-24 rounded-full ${i < currentPartner[currentLevel - 1] ? 'bg-blue-600' : 'bg-gray-400'}`}
                      >
                        {/* Center User ID within the circle */}
                        {i < currentPartner[currentLevel - 1] && partnerIds[currentLevel - 1]?.[i] && (
                          <span className="absolute inset-0 flex justify-center items-center text-sm text-white">
                            {partnerIds[currentLevel - 1][i]}
                          </span>
                        )}
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
      <div className="my-9">
        <NotifyBot />
        <TransactionTable />
      </div>
    </>
  );
};

export default LevelSlider;
