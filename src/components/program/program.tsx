'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartContract } from '@/components/SmartContract/SmartContractProvider';

const programs = [
  { name: 'x3', partners: 0, perCycle: '0 BUSD', color: 'bg-main-blue' },
  { name: 'x4', partners: 0, perCycle: '0 BUSD', color: 'bg-purple-500' },
];

const Program: React.FC = () => {
  const router = useRouter();
  const { usersActiveX3Levels, usersActiveX4Levels } = useSmartContract();
  const [activeProgram, setActiveProgram] = useState<string | null>(null);
  const [activeLevelsX3, setActiveLevelsX3] = useState<boolean[]>(Array(12).fill(false));
  const [activeLevelsX4, setActiveLevelsX4] = useState<boolean[]>(Array(12).fill(false));
  const [loading, setLoading] = useState(true); // Loading state
  const userAddress = '0xD733B8fDcFaFf240c602203D574c05De12ae358C';

  useEffect(() => {
    const fetchActiveLevels = async () => {
      setLoading(true); // Start loading
      try {
        const levelsStatusX3 = await Promise.all(
          Array.from({ length: 12 }, (_, index) => usersActiveX3Levels(userAddress, index + 1))
        );
        const booleanLevelsStatusX3 = levelsStatusX3.map(status => status !== null); // Convert to boolean
        setActiveLevelsX3(booleanLevelsStatusX3); 
        console.log('Active Levels x3:', booleanLevelsStatusX3);

        const levelsStatusX4 = await Promise.all(
          Array.from({ length: 12 }, (_, index) => usersActiveX4Levels(userAddress, index + 1))
        );
        const booleanLevelsStatusX4 = levelsStatusX4.map(status => status !== null); // Convert to boolean
        setActiveLevelsX4(booleanLevelsStatusX4);
        console.log('Active Levels x4:', booleanLevelsStatusX4);
      } catch (error) {
        console.error('Error fetching active levels:', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchActiveLevels();
  }, [usersActiveX3Levels, usersActiveX4Levels, userAddress]);

  const handleClick = (name: string) => {
    setActiveProgram(name);
    if (name !== 'x3') {
      setActiveLevelsX3(Array(12).fill(false));
    }
    if (name !== 'x4') {
      setActiveLevelsX4(Array(12).fill(false));
    }
  };

  // Updated handleRegisterBUSD to accept program name and navigate accordingly
  const handleRegisterBUSD = (name: string) => {
    if (name === 'x3') {
      router.push('/retro/program/x3'); // Path for x3 program
    } else if (name === 'x4') {
      router.push('/retro/program/x4'); // Path for x4 program
    }
  };

  const renderGridItems = (activeLevels: boolean[], programName: string) => {
    return activeLevels.map((isActive, index) => (
      <div
        key={index + 1}
        className={`flex items-center justify-center h-12 mb-2 gap-2 rounded-md text-gray-700 border border-gray-300 dark:border-gray-600 ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
        onClick={() => handleClick(programName)}
      >
        {index + 1}
      </div>
    ));
  };

  const renderProgram = (program: typeof programs[number], activeLevels: boolean[]) => (
    <div className="flex-1 mb-8 p-6 rounded-lg" style={{ background: 'linear-gradient(to bottom, #000000, #753a88, #3a1c71)' }}>
      <a
        className={`relative flex flex-col p-4 sm:p-6 w-full rounded z-10 overflow-hidden justify-between min-h-36 ${activeProgram === program.name ? 'border-white' : 'border-transparent'} cursor-pointer`}
        onClick={() => handleRegisterBUSD(program.name)} // Pass program name to handleRegisterBUSD
        style={{
          backgroundImage: `url(/assets/${program.name}-bg.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-between w-full z-10">
          <span className="text-white text-lg sm:text-xl font-bold">{program.name}</span>
          <span className="text-white text-lg sm:text-xl font-bold text-right">{program.perCycle}</span>
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 mt-3">
            {renderGridItems(program.name === 'x3' ? activeLevelsX3 : activeLevelsX4, program.name)}
          </div>
          <div className="flex flex-col h-full justify-end mt-5">
            <button className={`flex justify-center items-center text-base font-bold text-white rounded sm:text-sm outline-none px-4 py-2 ${program.name === 'x3' ? 'bg-blue-500 hover:bg-hover-main-blue' : 'bg-purple-500 hover:bg-hover-main-blue'} w-full`}>
              <div className="flex flex-col space-y-1 items-start">
                <div className="flex items-center">
                  Preview
                  <svg className="ml-2 fill-current" width="16" height="16" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M15.5 8a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Zm-4.646-2.854A.5.5 0 0 1 11 5.5v5a.5.5 0 0 1-1 0V6.707l-4.146 4.147a.5.5 0 0 1-.708-.708L9.293 6H5.5a.5.5 0 0 1 0-1h5c.138 0 .263.056.354.146Z"></path>
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </a>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>; // Loading state
  }

  return (
    <div className="flex flex-col mt-5 items-center rounded-lg bg-gray-100 dark:bg-gray-900 p-3 sm:p-5">
      <div className="container mx-auto p-3 bg-slate-600 rounded-lg dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row gap-8">
          {renderProgram(programs[0], activeLevelsX3)}
          {renderProgram(programs[1], activeLevelsX4)}
        </div>
      </div>
    </div>
  );
};

export default Program;
