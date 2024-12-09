'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';
import NotifyBot from '@/components/notifybot/notifybot';
import LevelCard from './x3LevelCard'; // Ensure the path is correct
import { useWallet } from '@/app/context/WalletContext';

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
  const walletAddress = useWallet();
  const staticAddress = walletAddress ? walletAddress.walletAddress : null;
  const userWalletAddress = staticAddress;
  const { getTotalCycles, userX3Matrix, getPartnerCount, getUserIdsWalletaddress } = useSmartContract();

  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levelDataX3.length).fill(null));
  const [partnersData, setPartnersData] = useState<number[]>(Array(levelDataX3.length).fill(0));
  const [partnerNew, setPartnerNew] = useState<number[]>(Array(levelDataX3.length).fill(0));
  const [isLevelActive, setIsLevelActive] = useState<boolean[]>(Array(levelDataX3.length).fill(false));

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Extract userId from query parameters
  const [userAddress, setUserAddress] = useState<string>(''); // Initially empty, will set to static or fetched address

  // Fetch user wallet address if userId is provided, else use static address
  useEffect(() => {
    const fetchUserAddress = async () => {
      if (userId) {
        try {
          const walletAddress = await getUserIdsWalletaddress(Number(userId)); // Ensure userId is treated as a number
          setUserAddress(walletAddress || userWalletAddress || 'null');
        } catch (error) {
          console.error("Error fetching wallet address for userId:", error);
          setUserAddress(userWalletAddress || 'null');
        }
      } else {
        setUserAddress(userWalletAddress || 'null');
      }
    };

    fetchUserAddress();
  }, [userId, getUserIdsWalletaddress, staticAddress]);

  // Fetch cycles, partners, and level activity data when userAddress is set
  useEffect(() => {
    if (!userAddress) return;

    const fetchData = async () => {
      try {
        const updatedCycles = await Promise.all(
          levelDataX3.map(async (data) => {
            const cycles = await getTotalCycles(userAddress, 1, data.level); // Matrix 1 for x3
            return cycles;
          })
        );

        const updatedPartners = await Promise.all(
          levelDataX3.map(async (data) => {
            const partnersInfo = await userX3Matrix(userAddress, data.level);
            return Array.isArray(partnersInfo) && partnersInfo[1] ? partnersInfo[1].length : 0;
          })
        );

        const partnersCount = await Promise.all(
          levelDataX3.map(async (data) => {
            return await getPartnerCount(userAddress, 1, data.level) || 0;
          })
        );

        const activeLevels = await Promise.all(
          levelDataX3.map(async (data) => {
            const cycles = await getTotalCycles(userAddress, 1, data.level);
            return cycles > 0; // Mark as active if cycles > 0
          })
        );

        setCyclesData(updatedCycles);
        setPartnersData(updatedPartners);
        setPartnerNew(partnersCount);
        setIsLevelActive(activeLevels);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userAddress, getTotalCycles, userX3Matrix, getPartnerCount]);

  return (
    <div className="p-5 min-h-screen text-white">
      <Suspense fallback={<div>Loading...</div>}>
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
                isActive={isLevelActive[index]} // Pass activity status to LevelCard
              />
            ))}
          </div>
        </div>
        <NotifyBot />
      </Suspense>
    </div>
  );
};

export default X3Grid;
