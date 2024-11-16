'use client';

import React, { useEffect, useState } from 'react';
import {fetchPartnerData, Partner } from '@/components/parteners/smartcontract/smartcontract';

const PartnerPage: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch partner data on component mount
  useEffect(() => {
    const loadData = async () => {
      const userId = 1; // Adjust this userId as needed
      const data = await fetchPartnerData(userId);
      setPartners(data);
      setLoading(false);
    };

    loadData();
  }, []);

  return (
    <section className="my-10">
      {/* Banner Section */}
      <div className="pb-9 w-full mx-auto text-center text-white px-6 lg:px-8 bg-black bg-opacity-60 rounded-lg"
        style={{
          backgroundImage: `url(/path/to/your/BannerSecond.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <h2 className="m-6 pt-7 text-4xl font-bold mb-4">Partner Details</h2>
        <p className="text-lg mb-8">Explore the partner statistics on the RonX Platform</p>

        {loading ? (
          <p className="text-white text-xl font-semibold">Loading...</p>
        ) : (
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider border-r border-gray-700">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider border-r border-gray-700">
                      Wallet
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider border-r border-gray-700">
                      Registration Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider border-r border-gray-700">
                      Highest X3 Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-200 uppercase tracking-wider">
                      Highest X6 Level
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                  {partners.map((partner, index) => (
                    <tr key={index} className="hover:bg-gray-700 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 border-r border-gray-700">
                        {partner.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-r border-gray-700">
                        {partner.wallet}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-r border-gray-700">
                        {new Date(partner.timestamp * 1000).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 border-r border-gray-700">
                        {partner.levelX3}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {partner.levelX6}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Partner Statistics Section */}
        <div className="text-center text-white mt-10">
          <h2 className="text-3xl font-bold mb-4">Partner Statistics</h2>
          <div className="mt-8 flex flex-col sm:flex-row justify-around items-center space-y-6 sm:space-y-0">
            <div>
              <span className="block text-lg">Total Partners</span>
              <span className="block text-4xl font-bold">{partners.length}</span>
            </div>
            <div>
              <span className="block text-4xl font-bold">22,631</span>
              <span className="block text-lg">Total Invested, BNB</span>
            </div>
            <div>
              <span className="block text-4xl font-bold">149,386,219</span>
              <span className="block text-lg">Total Payout, BUSD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerPage;
