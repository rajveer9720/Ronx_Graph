// src/components/LevelCard/LevelCard.tsx
'use client';

import { useRouter } from 'next/navigation';

interface LevelCardProps {
  level: number;
  cost: number;
  partners: number;
  cycles: number | null; // Allow cycles to be null initially
  partnersCount: number; // Number of partners for level
}

const LevelCard: React.FC<LevelCardProps> = ({ level, cost, partners, cycles, partnersCount }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/retro/levelslider?level=${level}&cost=${cost}&partners=${partners}&cycles=${cycles}`);
  };

  // Generate partner circles with conditional coloring
  const renderPartnerCircles = () => {
    const circles = [];

    for (let i = 0; i < 3; i++) {
      circles.push(
        <div
          key={i}
          className={`w-10 h-10 rounded-full ${i < partnersCount ? 'bg-blue-600' : 'bg-gray-400'}`} // Blue if i < partnersCount, else gray
        ></div>
      );
    }

    return circles;
  };

  return (
    <div
      className="bg-blue-700 p-4 rounded-lg text-center border border-gray-600 relative cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between mb-4">
        <div className="text-xl font-bold">Lvl {level}</div>
        <div className="text-lg">{cost} BUSD</div>
      </div>
      <div className="flex gap-4 justify-center space-x-210 my-10">
        {renderPartnerCircles()}
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="mr-2">👥</span> {partners}
        </div>
        <div className="flex items-center">
          <span className="mr-2">🔄</span> {cycles !== null ? cycles : 'Loading...'}
        </div>
      </div>
    </div>
  );
};

export default LevelCard;
