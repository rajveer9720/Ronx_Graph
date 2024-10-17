import React, { useState } from 'react';
import '../../../assets/css/globals.css';
import Image from '@/components/ui/image'; // Adjust this import if necessary

import Autonomy from '@/assets/images/Autonomy icon.png';
import Unchanging from '@/assets/images/Unchanging conditions icon.png';
import Transparency from '@/assets/images/Transparency icon.png';
import FullAutomation from '@/assets/images/Full automation icon.png';
import Decentralization from '@/assets/images/Decentralization icon.png';
import HundredPercent from '@/assets/images/onlineicon.png';

const TechnologySection: React.FC = () => {
  const [selected, setSelected] = useState<string>('Autonomy');

  const content = {
    'Autonomy': {
      description: 'The Ronx ecosystem relies on smart contracts and NFTs, which operate independently without human intervention.',
      icon: Autonomy
    },
    'Unchanging conditions': {
      description: 'The algorithm is on the blockchain, ensuring that no one, including its creators, can alter, cancel, or tamper with your transactions.',
      icon: Unchanging
    },
    'Transparency': {
      description: 'The smart contract code is public, so anyone can see all the transactions at any time. This makes sure everything is fair and the data is trustworthy.',
      icon: Transparency
    },
    'Full automation': {
      description: 'Transactions happen directly between personal wallets, not through accounts. Ronx doesn’t hold your money, so there’s no way to withdraw from the system.',
      icon: FullAutomation
    },
    'Decentralization': {
      description: 'No one, including the creators, can alter how Ronx smart contracts function.',
      icon: Decentralization
    },
    '100% online': {
      description: 'There are no hidden fees or extra charges. The smart contract always has a zero balance.',
      icon: HundredPercent
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Technology of Smart Contracts and Non-Fungible Tokens</h1>
        <p className="mt-4 w-6/12 m-auto text-lg">
          Decentralized marketing is powered by the revolutionary technology of smart contracts and NFTs. The RonX smart contract code is completely open. You can be sure of its safety and long-term performance.
        </p>
      </div>
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 p-4 bg-gray-800 rounded-lg flex flex-col items-center">
          <Image src={content[selected].icon} alt={selected} className="technology-icon w-20" />
          <h2 className="text-xl font-bold mb-4">{selected}</h2>
          <p className="text-center">{content[selected].description}</p>
        </div>
        <div className="flex flex-col space-y-2">
          {Object.keys(content).map(key => (
            <button
              key={key}
              className={`p-4 rounded-lg ${selected === key ? 'bg-pink-600' : 'bg-gray-700'} hover:bg-pink-500 flex items-center`}
              onClick={() => setSelected(key)}
            >
              <Image src={content[key].icon} alt={key} className="w-6 h-6 mr-2" />
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechnologySection;
