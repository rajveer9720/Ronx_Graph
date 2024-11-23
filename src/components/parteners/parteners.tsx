'use client';

import { useEffect, useState } from "react";
import { fetchPartnerData, Partner } from "@/components/parteners/smartcontract/smartcontract";
import { useWallet } from '@/app/context/WalletContext';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

const PartnerPage = () => {
  const { users } = useSmartContract();
  const walletAddress = useWallet();
  console.log("address:", walletAddress);
  // Access the `address` field within the object, or handle undefined
  const staticAddress = walletAddress ? walletAddress : null;

  console.log("staticAddress #1:", staticAddress);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!walletAddress) {
        console.error("No address provided");
        setLoading(false);
        return;
      }

      try {
        // Fetch user data using the address
        if (typeof staticAddress !== 'string') {
          console.error("Invalid address type");
          setLoading(false);
          return;
        }
        const userData = await users(staticAddress);
        if (!userData) {
          console.error("User data not found");
          setLoading(false);
          return;
        }

        const userId = userData.id; // Use the user ID fetched from users
        console.log("userId #1:", userId);
        const data = await fetchPartnerData(userId); // Fetch partners data with the user ID
        setPartners(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [staticAddress, users]); // Depend on address and users to re-fetch when they change

  return (
    <div className="p-6 mx-auto my-8 bg-white bg-opacity-60 dark:bg-gray-800 dark:bg-opacity-60 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Partner Details</h2>
      {loading ? (
        <p className="text-xl text-gray-500 dark:text-gray-300">Loading...</p>
      ) : (
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-b">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-b">Wallet</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-b">Registration Time</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-b">Highest X3 Level</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-white border-b">Highest X6 Level</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((partner, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">{partner.id}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">{partner.wallet}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">{partner.timestamp}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">{partner.levelX3}</td>
                <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b">{partner.levelX6}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PartnerPage;
