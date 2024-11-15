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

// Define slot prices (same for both x3 and x4 stages)
const slotPrices = [5, 10, 20, 40, 80, 160, 320, 640, 1250, 2500, 5000, 9900];

export default function Calculator() {
  const [selectedStage, setSelectedStage] = useState<Stage>(stages[0]);
  const [selectedSlots, setSelectedSlots] = useState<number[]>([]);

  // Handle selecting a different stage
  const handleStageSelect = (stage: Stage) => {
    setSelectedStage(stage);
    setSelectedSlots([]); // Reset slots when changing stages
  };

  // Handle slot selection behavior
  const handleSlotSelect = (slot: number) => {
    setSelectedSlots(prev => {
      if (slot === 12) {
        // Toggle all slots if slot 12 is clicked
        return prev.includes(12) ? [] : Array.from({ length: 12 }, (_, i) => i + 1);
      }

      // If the slot is already selected, deselect all slots after it
      if (prev.includes(slot)) {
        return prev.filter(s => s < slot);
      }

      // Select all slots up to the clicked one
      return Array.from({ length: slot }, (_, i) => i + 1);
    });
  };

  // Calculate the total cost based on selected slots and stage multipliers
  const cost = selectedSlots.reduce((total, slot) => {
    const slotCost = slotPrices[slot - 1] * selectedStage.costMultiplier;
    return total + slotCost;
  }, 0);

  // Calculate the potential result based on the selected stage and slots
  const result = selectedSlots.reduce((total, slot) => {
    const slotCost = slotPrices[slot - 1];
    return total + slotCost * selectedStage.resultMultiplier;
  }, 0);

  return (
    <div className="w-full p-6 text-white min-h-screen flex flex-col">
      <h1 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-4">
        Ronx Participant
      </h1>
      <h3 className="text-3xl font-bold mb-4 text-center">Calculator</h3>
      <p className="w-5/6 mb-8 text-lg text-center m-auto mt-40">
        Calculate your potential result from participating in Ronx by selecting levels to activate below. The results are calculated for 1 cycle of all selected levels. All calculations are for informational purposes only, and are not a public offer.
      </p>

      {/* Stage Selection Buttons */}
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

      {/* Slot selection and result display */}
      <div className="flex flex-col lg:flex-row gap-12 p-4 lg:p-8">
        {/* Slot Buttons */}
        <div className="flex-1 grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-4">
          {[...Array(12)].map((_, index) => (
            <button
              key={index}
              className={`py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded ${
                selectedSlots.includes(index + 1) ? 'bg-blue-500' : 'bg-gray-700'
              } text-white`}
              onClick={() => handleSlotSelect(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Cost and result display */}
        <div className="flex-1 flex flex-col justify-center items-center gap-6 bg-gray-800 p-4 rounded w-full max-w-md mx-auto text-center">
          <p className="text-lg sm:text-xl md:text-2xl">
            Cost of selected slots: <span className="font-bold">{cost} BUSD</span>
          </p>
          <p className="text-lg sm:text-xl md:text-2xl">
            Results in 1 cycle: <span className="font-bold">{result} BUSD</span>
          </p>
        </div>
      </div>
    </div>
  );
}
