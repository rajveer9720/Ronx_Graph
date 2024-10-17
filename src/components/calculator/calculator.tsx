'use client';

import React, { useState } from 'react';

interface Stage {
  name: string;
  costMultiplier: number;
  resultMultiplier: number;
}

const stages: Stage[] = [
  { name: 'Ronx x3', costMultiplier: 1, resultMultiplier: 3 },
  { name: 'Ronx x4', costMultiplier: 1, resultMultiplier: 4 },
];

const slotPrices = [5, 10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5120, 10240];

export default function Calculator() {
  const [selectedStage, setSelectedStage] = useState<Stage>(stages[0]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([1]);

  const handleStageSelect = (stage: Stage) => {
    setSelectedStage(stage);
    setSelectedSlots([1]); // Reset slots selection when stage changes
  };

  const handleSlotSelect = (slot: number) => {
    setSelectedSlots(prev => {
      if (slot === 12) {
        return [12];
      }
      return prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot];
    });
  };

  const cost = selectedSlots.reduce((total, slot) => total + slotPrices[slot - 1] * selectedStage.costMultiplier, 0);
  const result = cost * selectedStage.resultMultiplier;

  return (
    <div className="w-full p-6 text-white min-h-screen flex flex-col">
      <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">
        Ronx Participant
      </h1>
      <h3 className="text-3xl font-bold mb-4 text-center">Calculator</h3>
      <p className="w-5/6 mb-8 text-lg text-center m-auto">
        Calculate your potential result from participating in Ronx by selecting levels to activate below. The results are calculated for 1 cycle of all selected levels. All calculations are for informational purposes only, and are not a public offer.
      </p>

      <div className="flex space-x-4 mb-4 px-8">
        {stages.map(stage => (
          <button
            key={stage.name}
            className={`px-4 py-2 rounded ${selectedStage.name === stage.name ? 'bg-blue-500' : 'bg-gray-800'} text-white`}
            onClick={() => handleStageSelect(stage)}
          >
            {stage.name}
          </button>
        ))}
      </div>

      <div className='flex flex-col lg:flex-row gap-12 p-4 lg:p-8  bg-gray-600 m-auto align-middle'>
        <div className='text-2xl font-bold inline-block ml-10'>
          {selectedStage.name}
        </div>
        <div className='flex flex-col lg:flex-row gap-12 p-4 lg:p-8'>
          <p>
            {selectedStage.name === 'Ronx x3' ? 
              'Basic matrix program, which is best for those who are self-reliant and prefer independent development.'
              : 'More advanced program, designed for team work. Results are achieved here through direct partners, as well as through spillovers from other participants.'}
          </p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row gap-12 p-4 lg:p-8'>
        <div className="flex-1 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
          {[...Array(12)].map((_, index) => (
            <button
              key={index}
              className={`py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded ${selectedSlots.includes(index + 1) ? 'bg-blue-500' : 'bg-gray-700'} text-white`}
              onClick={() => handleSlotSelect(index + 1)}
              disabled={selectedSlots.includes(12) && index !== 11}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <div className="flex-1 flex flex-col justify-center items-center gap-6 bg-gray-800 p-4 rounded w-full max-w-md mx-auto text-center">
          <p className='text-lg sm:text-xl md:text-2xl'>
            Cost of all selected slots: <span className="font-bold">{cost} BUSD</span>
          </p>
          <p className='text-lg sm:text-xl md:text-2xl'>
            Results in 1 cycle: <span className="font-bold">{result} BUSD</span>
          </p>
        </div>
      </div>
    </div>
  );
}