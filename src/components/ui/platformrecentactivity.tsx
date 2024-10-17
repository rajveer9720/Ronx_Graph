import React, { useEffect, useState } from 'react';
const PlatformRecentActivity: React.FC = () => {
  const activities = [
    { id: '1423735', action: '+10 BUSD in x4', time: '1 hour' },
    { id: '1745488', action: '+5 BUSD in x3', time: '1 hour' },
    { id: 'new', action: 'New user joined', userId: '1768044', time: '1 hour' },
    { id: '1744074', action: '+5 BUSD in x4', time: '1 hour' },
    { id: '1648601', action: '+5 BUSD in x4', time: '1 hour' },
    { id: '1195996', action: '+10 BUSD in x4', time: '1 hour' },
    { id: 'new', action: 'New user joined', userId: '1768043', time: '1 hour' },
    { id: '1715046', action: '+5 BUSD in x4', time: '1 hour' },
    { id: '1647340', action: '+20 BUSD in x3', time: '1 hour' },
    { id: '1709744', action: '+5 BUSD in x4', time: '1 hour' },
    { id: 'new', action: 'New user joined', userId: '1768041', time: '1 hour' },
  ];


  const handleRegisterBUSD = () => {
    window.location.href = 'http://localhost:3000/retro'; // Replace with your desired URL
  };

  return (
    <div className="text-white p-8 rounded-md w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
      <div className="col-span-2 h-full flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Platform Recent Activity</h2>
        <div className="bg-gray-800 rounded-lg p-4 mb-4 flex-1 flex flex-col overflow-hidden">
          <div className="overflow-y-auto max-h-96">
            {activities.slice(0, 7).map((activity, index) => (
              <div key={index} className="flex mt-5 items-center rounded-lg bg-gray-100 p-5 dark:bg-light-dark justify-between mb-2">
                <div className="flex items-center">
                  <div className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">ID</span>
                  </div>
                  <div className="ml-4">
                    {activity.id !== 'new' ? (
                      <div>
                        <a onClick={handleRegisterBUSD}><span className="text-blue-500 cursor-pointer">{`ID ${activity.id}`}</span></a> {activity.action}
                      </div>
                    ) : (
                      <div>
                        <span className="text-gray-400">{activity.action}</span> <span className="text-blue-500">{`ID ${activity.userId}`}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-gray-500">{activity.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-auto">
            <button className="w-full p-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none">
              See more
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="bg-gray-800 rounded-lg p-4 mb-4 flex-1">
          <h3 className="text-lg font-semibold mb-2">RonX BUSD Contracts</h3>
          <p className="text-sm flex mt-3 items-center rounded-lg bg-gray-100 p-2 dark:bg-light-dark justify-between mb-1">x3/x4: <span className="text-blue-500">0x5ac...b97</span></p>
        </div>
      </div>
    </div>
  );
};

export default PlatformRecentActivity;