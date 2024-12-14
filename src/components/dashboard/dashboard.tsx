import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useWallet } from '@/app/context/WalletContext';
import client from '@/lib/apolloClient';
import { ApolloQueryResult } from '@apollo/client';
import { GET_TOTAL_PARTNER } from '@/graphql/TotalPartner/queries';

interface StatCardProps {
  title: string;
  value: string;
  increase: string;
}

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
  const walletAddress = useWallet();
  
  // Access the `address` field within the object, or handle undefined
  const staticAddress = walletAddress ? walletAddress.walletAddress : '';
  const userWalletAddress = staticAddress;
  console.log("staticAddress #12:", userWalletAddress);
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId'); 
  const [currentPartner, setcurrentPartner] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [cyclesData, setCyclesData] = useState<(number | null)[]>(Array(levels.length).fill(null));
  const [partnersData, setPartnersData] = useState<number>(0); // Initialize with numbers

  const [userAddress, setUserAddress] = useState<string>(staticAddress || ''); // Initially static address, will set to fetched address
  const [userData, setUserData] = useState<{
    id: number;
    referrer: string;
    partnersCount: number;
    registrationTime: number;
  } | null>(null);
  const [teamSize, setTeamSize] = useState<string>(''); // Store team size
  const [error, setError] = useState<string | null>(null);

  // Fetch Total Partner data wallet address pass
  useEffect(() => {
    const fetchTotalPartner = async () => {
      try { 
        // GET_TOTAL_PARTNER query to fetch total partner
        const { data } = await client.query({
          query: GET_TOTAL_PARTNER,
          variables: { referrer: userWalletAddress },
        }) as ApolloQueryResult<any>;
        if (data) {
          // total userid partner counter 
          console.log("test data:", data);
          const totalPartner = data.registrations.length;

          setPartnersData(totalPartner);
        }
      } catch (error) {
        console.error('Error fetching total partner:', error);
      }
    }
    if (userWalletAddress) {
      fetchTotalPartner();
    }
  }, [userWalletAddress]);

  return (
    <div className="my-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto text-center items-center">
      <>
        <StatCard
          title="Partners"
          value={partnersData.toString()}
          increase="↑ 0"
        />
        <StatCard title="Team" value={"test"} increase="↑ 0" />
        <StatCard title="Ratio" value={`2%`} increase="↑ 0%" />
        <StatCard title="Profits" value={`3`} increase="↑ 0" />
      </>
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Dashboard;
