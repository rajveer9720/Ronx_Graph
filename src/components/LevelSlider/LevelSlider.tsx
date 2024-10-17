'use client'; // Add this line to ensure the component is rendered on the client side

import React, { useState } from 'react';
import LevelHeader from '@/components/levelheader/levelheader';
import TransactionTable from '@/components/transaction/transaction-table'; 
import NotifyBot from '@/components/notifybot/notifybot';

const levels = [
  { level: 1, cost: 5, partners: 22737, cycles: 8946, revenue: 100340, Id: '1770552' },
  { level: 2, cost: 10, partners: 2563, cycles: 1205, revenue: 50340, Id: '1770553' },
  { level: 3, cost: 20, partners: 792, cycles: 421, revenue: 40340, Id: '1770554' },
  { level: 4, cost: 40, partners: 345, cycles: 200, revenue: 30340, Id: '1770555' },
  { level: 5, cost: 80, partners: 153, cycles: 91, revenue: 20340, Id: '1770556' },
  { level: 6, cost: 160, partners: 76, cycles: 47, revenue: 10340, Id: '1770557' },
  { level: 7, cost: 320, partners: 39, cycles: 24, revenue: 9340, Id: '1770558' },
  { level: 8, cost: 640, partners: 26, cycles: 16, revenue: 8340, Id: '1770559' },
  { level: 9, cost: 1250, partners: 16, cycles: 9, revenue: 7340, Id: '1770560' },
  { level: 10, cost: 2500, partners: 10, cycles: 6, revenue: 6340, Id: '1770561' },
  { level: 11, cost: 5000, partners: 5, cycles: 3, revenue: 5340, Id: '1770562' },
  { level: 12, cost: 9900, partners: 2, cycles: 1, revenue: 4340, Id: '1770563' },
];

const LevelSlider: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState(1);

  const nextLevel = () => {
    if (currentLevel < 12) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const previousLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
    }
  };

  const levelData = levels.find(level => level.level === currentLevel);

  return (
    <>
      <LevelHeader level={1} uplineId="123456" />
      <div className="flex items-center justify-cen000ter text-white p-4 mx-auto max-w-screen-lg">
        <button
          onClick={previousLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${
            currentLevel === 1 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          disabled={currentLevel === 1}
        >
          {currentLevel > 1 ? currentLevel - 1 : ''}
        </button>
        <div className="flex-grow mx-4 " >
          {levelData && (
            <div className="bg-blue-700  rounded-lg text-center border border-gray-600 relative ">
              <div className='p-9'>
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-bold">Lvl {levelData.level}</div>
                <div className="text-xl font-bold">ID {levelData.Id}</div>
                <div className="text-lg">{levelData.cost} BUSD</div>
              </div>
              <div className="flex justify-center items-center mb-6 gap-4">
  <div className="w-16 h-16 lg:w-24 lg:h-24 p-2 bg-white text-black font-bold rounded-full flex items-center justify-center">
    17713
  </div>
  <div className="w-16 h-16 lg:w-24 lg:h-24 p-2 bg-blue-400 rounded-full flex items-center justify-center">
  10235
  </div>
  <div className="w-16 h-16 lg:w-24 lg:h-24 p-2 bg-blue-400 rounded-full flex items-center justify-center">
  3625
  </div>
</div>

              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <span className="mr-2">👥</span> {levelData.partners}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🔄</span> {levelData.cycles}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <span className="mr-2">💰</span> {levelData.revenue} BUSD
              </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={nextLevel}
          className={`p-4 rounded-3xl h-20 lg:h-24 transition-all duration-200 ease-in-out ${
            currentLevel === 12 ? 'bg-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'
          }`}
          disabled={currentLevel === 12}
        >
          {currentLevel < 12 ? currentLevel + 1 : ''}
        </button>
      </div>
      <div className='my-9'>
        <NotifyBot/>
      <TransactionTable />
      </div>
    </>
  );
};

export default LevelSlider;