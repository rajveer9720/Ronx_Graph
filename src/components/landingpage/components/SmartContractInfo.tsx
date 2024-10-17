import React from 'react';

const InfoCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white mb-6">
    <div className="flex items-center mb-4">
      <div className="bg-pink-500 w-12 h-12 flex justify-center items-center rounded-full">
        <span className="text-2xl font-bold">i</span>
      </div>
      <h3 className="ml-4 text-xl font-bold">{title}</h3>
    </div>
    <p>{description}</p>
  </div>
);

const SmartContractInfo: React.FC = () => (
  <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
    <div className="max-w-4xl w-full">
      <h1 className="text-3xl font-bold text-center mb-6">Technology of smart contracts and non-fungible tokens</h1>
      <p className="text-center mb-12">
        Decentralized marketing is powered by the revolutionary technology of smart contracts and NFTs.
        The RonX smart contract code is completely open. You can be sure of its safety and long-term performance.
      </p>
      <div className="display-flex">
      <div className="flex flex-col md:flex-row gap-6">
      {/* Block 1 */}
      <div className="bg-gray-900 p-8 rounded-lg flex-1">
      <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">A</span>
          </div>
          <h2 className="mt-4 text-lg font-semibold">Autonomy</h2>
          <p className="mt-2">
            The RonX autonomous system ensures the technology will work forever and with full autonomy, continuous and stable. No influence of the human factor.
          </p>
        </div>
        </div>

      {/* Block 2 */}
      <div className="grid grid-cols-1  gap-6 flex-1">
        {[
          "Autonomy", "Unchanging conditions", "Transparency", 
          "Full automation", "Decentralization", "100% online"
        ].map((feature) => (
          <div key={feature} className="bg-gray-700 p-4 rounded-lg shadow-lg text-center text-white">
            {feature}
          </div>
        ))}
      </div>
    </div>
      </div>
    </div>
  </div>
);

export default SmartContractInfo;
