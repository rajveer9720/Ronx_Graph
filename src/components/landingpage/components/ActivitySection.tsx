import React, { useEffect, useState } from 'react';
import Image from '@/components/ui/image';
import BannerSecond from '@/assets/images/BannerSecond.png';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';
import client from '@/lib/apolloClient';
import { GET_USERS } from '@/graphql/PlatformRecentActivity/queries';
import { ApolloQueryResult } from '@apollo/client';
import { GET_ACTIVE_USER } from '@/graphql/GetTotalNumberActive/queries';



const ActivitySection: React.FC = () => {
  const { getUserRecentActivityUserMatrics, getPlatformRecentActivity } = useSmartContract();
  const [totalUser, setTotalUser] = useState(0);
  const [recentUser, setRecentUser] = useState(0);
  const [activities, setActivities] = useState<any[]>([]);

  // Fetch getUserRecentActivityUserMatrics data 

  // Fetch platform recent activity data in the specified format
  useEffect(() => {
    const fetchPlatformActivity = async () => {
      try {
        const { data } = await client.query({
          query: GET_USERS,
        }) as ApolloQueryResult<any>;
        if (data) {
          const formattedActivities = data.newUserPlaces.map((activity: any) => ({
            userId: activity.user,
            action: activity.place,
            matrix: activity.matrix,
            level: activity.level,
            timestamp: new Date(parseInt(activity.blockTimestamp, 10) * 1000).toLocaleString(),
          }));
          setActivities(formattedActivities);
        }
      } catch (error) {
        console.error('Error fetching platform activity:', error);
      }
    };

    fetchPlatformActivity();
  }, []);

  //GetTotalNumberActive User counter and recent user counter
  useEffect(() => {
    const fetchActiveUser = async () => {
      try {
        const { data } = await client.query({
          query: GET_ACTIVE_USER,
        }) as ApolloQueryResult<any>;
        if (data) {
          const totalUsers = data.registrations.length;
          const recentUsers = data.registrations.filter((user: any) => {
            const currentTime = new Date().getTime();
            const userTime = new Date(user.blockTimestamp).getTime();
            return currentTime - userTime < 24 * 60 * 60 * 1000;
          }).length;
          setTotalUser(totalUsers);
          setRecentUser(recentUsers);
        }
      } catch (error) {
        console.error('Error fetching active user:', error);
      }
    };

    fetchActiveUser();
  }, []);

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
            {/* <p>All data is stored in the blockchain in the public domain and can be verified!<br />
              Contract address eth: 0x5acc84a3e955Bdd76467d3348077d003f00fFB97<br />
              Contract address tron: TREbha3Jj6TrpT7e6Z5ukh3NRhyxHsmMug<br />
              Contract address busd: 0xb2e1eD3394AC2191313A4a9Fcb5B52C4d3c046eF
            </p> */}
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