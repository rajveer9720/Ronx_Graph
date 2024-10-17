// src/components/ForsageGrid.tsx
'use client';  // Add this line to ensure the component is rendered on the client side
import { useRouter } from 'next/navigation'; // Add this import
import NotifyBot from '@/components/notifybot/notifybot';




interface LevelCardProps {
  level: number;
  cost: number;
  partners: number;
  cycles: number;
}

const LevelCard: React.FC<LevelCardProps> = ({ level, cost, partners, cycles }) => {
  const router = useRouter(); // Add this line

  const handleClick = () => {
    // Use router.push() instead of window.location.href
    router.push(`/retro/levelslider?level=${level}&cost=${cost}&partners=${partners}&cycles=${cycles}`);
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
        <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
        <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
        <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
      </div>
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <span className="mr-2">👥</span> {partners}
        </div>
        <div className="flex items-center">
          <span className="mr-2">🔄</span> {cycles}
        </div>
      </div>
      
    </div>
  );
};

const levelData = [
  { level: 1, cost: 5, partners: 22737, cycles: 8946 },
  { level: 2, cost: 10, partners: 2563, cycles: 1205 },
  { level: 3, cost: 20, partners: 792, cycles: 421 },
  { level: 4, cost: 40, partners: 345, cycles: 200 },
  { level: 5, cost: 80, partners: 153, cycles: 91 },
  { level: 6, cost: 160, partners: 76, cycles: 47 },
  { level: 7, cost: 320, partners: 39, cycles: 24 },
  { level: 8, cost: 640, partners: 26, cycles: 16 },
  { level: 9, cost: 1250, partners: 16, cycles: 9 },
  { level: 10, cost: 2500, partners: 10, cycles: 6 },
  { level: 11, cost: 5000, partners: 0, cycles: 0 },
  { level: 12, cost: 9900, partners: 0, cycles: 0 },
];

const RonxGrid: React.FC = () => {
  return (
    <div className="p-5  min-h-screen text-white">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-5">Forsage x3</h1>
        <h2 className="text-2xl mb-5">372 490 BUSD</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4 rounded-lg border border-gray-700">
          {levelData.map((data) => (
            <LevelCard key={data.level} {...data} />
          ))}
        
        </div>
      </div>
      <NotifyBot/>
    </div>
  );
};

export default RonxGrid;
