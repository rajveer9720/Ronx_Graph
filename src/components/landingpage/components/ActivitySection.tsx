import React from 'react';

import Image from '@/components/ui/image';
import BannerSecond from '@/assets/images/BannerSecond.png';

const activities = [
  { id: 1, icon: '🟢', description: 'New user joined', amount: '0.57 BUSD', time: '3 minutes ago' },
  { id: 2, icon: '🟢', description: 'New user joined', amount: '1.25 BUSD', time: '5 minutes ago' },
  { id: 3, icon: '🟢', description: 'Transaction', amount: '8.34 BUSD', time: '10 minutes ago' },
  { id: 4, icon: '🟢', description: 'Transaction', amount: '2.75 BUSD', time: '15 minutes ago' },
  { id: 5, icon: '🟢', description: 'New user joined', amount: '1.00 BUSD', time: '20 minutes ago' },
  { id: 6, icon: '🟢', description: 'New user joined', amount: '0.50 BUSD', time: '30 minutes ago' },
  { id: 7, icon: '🟢', description: 'Transaction', amount: '5.67 BUSD', time: '40 minutes ago' },
  { id: 8, icon: '🟢', description: 'New user joined', amount: '1.75 BUSD', time: '50 minutes ago' },
  // Add more activities as needed
];

const ActivitySection: React.FC = () => {
  return (
    <section 
      className="my-6" 
      
    >
      <div className="" >
        <div className=" pb-9 w-full mx-auto text-center text-white px-4 sm:px-6 lg:px-8 bg-black bg-opacity-60 rounded-lg" style={{
        backgroundImage: `url(${BannerSecond.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
     
      }}>
          <h2 className="m-6 pt-7  text-4xl font-bold mb-4">Platform Recent Activity</h2>
          <p className="text-lg mb-8">Real-time global events of the RonX Platform</p>
          <div className="bg-black rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-y-auto max-h-96">
              <ul className="divide-y divide-gray-700">
                {activities.map((activity) => (
                  <li key={activity.id} className="flex items-center justify-between p-4 hover:bg-gray-800">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{activity.icon}</span>
                      <div>
                        <p className="text-lg font-semibold">{activity.description}</p>
                        <p className="text-gray-400">{activity.amount}</p>
                      </div>
                    </div>
                    <span className="text-gray-400">{activity.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="w-full p-4 bg-gray-800 text-white font-semibold hover:bg-gray-700">See more</button>
          </div>
          <div className="text-center text-white mt-10">
            <h2 className="text-3xl font-bold mb-4">Partner Results</h2>
            <p>All data is stored in the blockchain in the public domain and can be verified!<br/>
              Contract address eth: 0x5acc84a3e955Bdd76467d3348077d003f00fFB97<br/>
              Contract address tron: TREbha3Jj6TrpT7e6Z5ukh3NRhyxHsmMug<br/>
              Contract address busd: 0x5acc84a3e955Bdd76467d3348077d003f00fFB97
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-around">
              <div className="mb-6 sm:mb-0">
                <span className="block text-4xl font-bold">1,756,920</span>
                <span>Accounts Created</span>
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
