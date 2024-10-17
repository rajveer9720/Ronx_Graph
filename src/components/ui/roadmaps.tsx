// components/ui/roadmap.tsx

import React from 'react';

const Roadmap = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Project Roadmap1</h2>
      <ul className="space-y-4">
        <li>
          <div className="flex items-center">
            <div className="bg-green-500 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-white">1</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Phase 1</h3>
              <p className="text-gray-600">Description of Phase 1.</p>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <div className="bg-yellow-500 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-white">2</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Phase 2</h3>
              <p className="text-gray-600">Description of Phase 2.</p>
            </div>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full h-8 w-8 flex items-center justify-center">
              <span className="text-white">3</span>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium">Phase 3</h3>
              <p className="text-gray-600">Description of Phase 3.</p>
            </div>
          </div>
        </li>
        {/* Add more phases as needed */}
      </ul>
    </div>
  );
};

export default Roadmap;
