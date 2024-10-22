import React, { useEffect, useState } from 'react';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider'; // Import the contract context

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
  const { users } = useSmartContract();
  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C'; // Replace with dynamic address if needed
  const [userData, setUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  const handleFetchUser = async () => {
    try {
      const data = await users(userAddress);
      if (data) {
        setUserData(data);
        setError(null); // Clear error if successful
      } else {
        setError(".");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch user data. Please try again.");
    }
  };

  useEffect(() => {
    handleFetchUser();
  }, [users, userAddress]);

  return (
    <div className="my-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto text-center items-center">
      {userData ? (
        <>
          <StatCard
            title="Partners"
            value={userData.partnersCount.toString()}
            increase="↑ 0"
          />
          <StatCard title="Team" value="21" increase="↑ 0" />
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
