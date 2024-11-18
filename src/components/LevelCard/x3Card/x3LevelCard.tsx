// src/components/LevelCard/LevelCard.tsx
'use client';
import { useEffect, useState, Suspense  } from 'react';
import { useWallet } from '@/components/nft/WalletContext';
import { useRouter,useSearchParams } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

interface LevelCardProps {
  level: number;
  cost: number;
  partners: number;
  cycles: number | null; // Allow cycles to be null initially
  partnersCount: number; // Number of partners for level
}

const LevelCard: React.FC<LevelCardProps> = ({ level, cost, partners, cycles, partnersCount }) => {
  const router = useRouter();
  const address = useWallet();
  console.log("address:", address);

  
  // Access the `address` field within the object, or handle undefined
  const staticAddress = address?.address ? address.address.toString() : null;
  
  console.log("staticAddress:", staticAddress);
  


  const { getTotalCycles, userX3Matrix, getPartnerCount, getUserIdsWalletaddress } = useSmartContract();

  const searchParams = useSearchParams();

  const userId = searchParams.get('userId'); // Extract userId from query parameters
  console.log("user id:",userId);
  const [userAddress, setUserAddress] = useState<string>(''); // Initially empty, will set to static or fetched address
   // Fetch user wallet address if userId is provided, else use static address
   useEffect(() => {
    const fetchUserAddress = async () => {
      if (userId) {
        try {
          const walletAddress = await getUserIdsWalletaddress(Number(userId)); // Ensure userId is treated as a number
          if (walletAddress) {
            console.log("Fetched wallet address:", walletAddress); // Log the fetched address for debugging
            setUserAddress(staticAddres); // Set the fetched wallet address
          }
        } catch (error) {
          console.error("Error fetching wallet address for userId:", error);
          setUserAddress(staticAddres); // Use static address if fetching fails
        }
      } else {
        // If no userId, use static wallet address
        setUserAddress(staticAddres);
      }
    };

    fetchUserAddress();
  }, [userId, getUserIdsWalletaddress]);




  const handleClick = () => {
    const userIdParam = userId ? `&userId=${userId}` : ''; // Append userId if it exists

    router.push(`/retro/levelslider/x3slider?level=${level}&cost=${cost}&partners=${partners}&cycles=${cycles}`);
  };

  // Generate partner circles with conditional coloring
  const renderPartnerCircles = () => {
    const circles = [];

    for (let i = 0; i < 3; i++) {
      circles.push(
        <div
          key={i}
          className={`w-10 h-10 rounded-full ${i < partnersCount ? 'bg-blue-600' : 'bg-gray-400'}`} // Blue if i < partnersCount, else gray
        ></div>
      );
    }

    return circles;
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>

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
    </Suspense>

  );
};

export default LevelCard;
