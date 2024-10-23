import React, { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import BannerSecond from '@/assets/images/BannerSecond.png';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

const ActivitySection: React.FC = () => {
  const { getUserRecentActivityUserMatrics, getPlatformRecentActivity } = useSmartContract();
  const [totalUser, setTotalUser] = useState(0);
  const [recentUser, setRecentUser] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);

  // Fetch getUserRecentActivityUserMatrics data 
  useEffect(() => {
    const fetchUserMetrics = async () => {
      const data = await getUserRecentActivityUserMatrics(24, "hour");
      if (data) {
        const totalUsers = data.totalUsers?.toNumber() || 0;
        const recentUsers = data.recentUsers?.toNumber() || 0;
        setTotalUser(totalUsers);
        setRecentUser(recentUsers);
      } else {
        setTotalUser(0);
        setRecentUser(0);
      }
    };
    fetchUserMetrics();
  }, [getUserRecentActivityUserMatrics]);

  // Fetch platform recent activity data in the specified format
  useEffect(() => {
    const fetchPlatformActivity = async () => {
      try {
        const data = await getPlatformRecentActivity();
        console.log("test data platformUser:", data?.toString()); // Log entire string data
  
        if (data) {
          // Split the string by new lines to separate each activity
          const activityLines = data.split("\n");
  
          // Extract user activity details from each line using regex
          const formattedActivities = activityLines.map((line: string) => {
            const regex = /User ID: (\d+) - Action: ([\w\s]+) - Matrix: (\d+) - Level: (\d+) - Timestamp: (\d+)/;
            const match = line.match(regex);
  
            if (match) {
              const [, userId, action, matrix, level, timestamp] = match;
  
              return {
                userId,
                action,
                matrix,
                level,
                timestamp: new Date(parseInt(timestamp, 10) * 1000).toLocaleString(), // Convert to readable date
              };
            } else {
              return null; // In case there's a mismatch, skip it
            }
          }).filter(Boolean); // Remove any null entries
  
          setActivities(formattedActivities);
        }
      } catch (error) {
        console.error('Error fetching platform activity:', error);
      }
    };
  
    fetchPlatformActivity();
  }, [getPlatformRecentActivity]);
  

  return (
    <section className="my-6">
      <div>
        <div className="pb-9 w-full mx-auto text-center text-white px-4 sm:px-6 lg:px-8 bg-black bg-opacity-60 rounded-lg"
          style={{
            backgroundImage: `url(${BannerSecond.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}>
          <h2 className="m-6 pt-7 text-4xl font-bold mb-4">Platform Recent Activity</h2>
          <p className="text-lg mb-8">Real-time global events of the RonX Platform</p>
          <div className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-y-auto max-h-96">
              <table className="table-auto w-full text-left text-white">
                <thead>
                  <tr className="bg-gray-800">
                    <th className="px-4 py-2">User ID</th>
                    <th className="px-4 py-2">Action</th>
                    <th className="px-4 py-2">Matrix</th>
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-700">
                      <td className="px-4 py-2">{activity.userId}</td>
                      <td className="px-4 py-2">{activity.action}</td>
                      <td className="px-4 py-2">{activity.matrix}</td>
                      <td className="px-4 py-2">{activity.level}</td>
                      <td className="px-4 py-2">{activity.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center text-white mt-10">
            <h2 className="text-3xl font-bold mb-4">Partner Results</h2>
            <p>All data is stored in the blockchain in the public domain and can be verified!<br />
              Contract address eth: 0x5acc84a3e955Bdd76467d3348077d003f00fFB97<br />
              Contract address tron: TREbha3Jj6TrpT7e6Z5ukh3NRhyxHsmMug<br />
              Contract address busd: 0x5acc84a3e955Bdd76467d3348077d003f00fFB97
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-around">
              <div className="mb-6 sm:mb-0">
                <span>Member Total</span>
                <span className="block text-4xl font-bold">{totalUser}</span>
                <span className="block text-2xl font-bold text-blue-500">{recentUser}</span>
              </div>
              <div className="mb-6 sm:mb-0">
                <span className="block text-4xl font-bold">22,631</span>
                <span>Total Invested, BNB</span>
              </div>
              <div>
                <span className="block text-4xl font-bold">149,386,219</span>
                <span>Total Payout, BUSD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
