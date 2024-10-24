import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

interface StatCardProps {
  title: string;
  value: string;
  increase: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, increase }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white flex flex-col">
      <p className="text-lg font-medium">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
      <p className="text-sm text-green-500">{increase}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { users, getUserIdsWalletaddress, getTeamSizeData } = useSmartContract();

  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); // Extract userId from query parameters

  const staticAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C'; // Fallback static address
  const [userAddress, setUserAddress] = useState<string>(staticAddress); // Initially static address, will set to fetched address
  const [userData, setUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);
  const [teamSize, setTeamSize] = useState<string>(''); // Store team size
  const [error, setError] = useState<string | null>(null);

  // Fetch wallet address based on userId
  useEffect(() => {
    const fetchUserAddress = async () => {
      if (userId) {
        try {
          const walletAddress = await getUserIdsWalletaddress(Number(userId));
          if (walletAddress) {
            setUserAddress(walletAddress);
          }
        } catch (error) {
          console.error("Error fetching wallet address for userId:", error);
          setUserAddress(staticAddress); // Fallback to static address if fetching fails
        }
      }
    };

    fetchUserAddress();
  }, [userId, getUserIdsWalletaddress]);

  // Fetch team size data after fetching the user address
  useEffect(() => {
    const fetchTeamSize = async () => {
      if (userAddress) {
        try {
          const fetchedTeamSize = await getTeamSizeData(userAddress);
          setTeamSize(fetchedTeamSize?.toString() || '0'); // Fallback to 0 if data is unavailable
        } catch (error) {
          console.error("Error fetching team size data:", error);
          setTeamSize('0'); // Fallback to 0 if fetching fails
        }
      }
    };

    fetchTeamSize();
  }, [userAddress, getTeamSizeData]);

  // Fetch user data
  const handleFetchUser = async () => {
    try {
      const data = await users(userAddress);
      if (data) {
        setUserData(data);
        setError(null); // Clear error if successful
      } else {
        setError("Failed to fetch user data.");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, [userAddress, users]);

  return (
    <div className="my-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto text-center items-center">
      {userData ? (
        <>
          <StatCard
            title="Partners"
            value={userData.partnersCount.toString()}
            increase="↑ 0"
          />
          <StatCard title="Team" value={teamSize} increase="↑ 0" />
          <StatCard title="Ratio" value="209%" increase="↑ 0%" />
          <StatCard title="Profits" value="3,891" increase="↑ 0\n↑ 0" />
        </>
      ) : (
        <div>Loading user data...</div>
      )}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Dashboard;
