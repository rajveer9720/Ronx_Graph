import { useState } from "react";

// Import local images
import social from '@/assets/images/social media lobver.png';
import achievements from '@/assets/images/achivments.png';
import cyoleRallyMarathon from '@/assets/images/cycle rally marthon.png';
import RonXGames from '@/assets/images/Ronx game.png';
import customInvitePdf from '@/assets/images/costum invite pager.png';
import newProgram from '@/assets/images/New program.png';
import token from '@/assets/images/Tokan.png';
import Image from '@/components/ui/image';

interface RoadmapItem {
  title: string;
  icon: string; // This can now be a URL or a local path
  date: string;
  completed: boolean;
}

const roadmapItems: RoadmapItem[] = [
  {
    title: "Social",
    icon: social, // Local image import
    date: "21.08",
    completed: false,
  },
  {
    title: "Achievements",
    icon: achievements,
    date: "28.08",
    completed: false,
  },
  {
    title: "Cyole Rally Marathon",
    icon: cyoleRallyMarathon,
    date: "4.09",
    completed: false,
  },
  {
    title: "RonX Games",
    icon: RonXGames,
    date: "21.11",
    completed: false,
  },
  {
    title: "Custom Invite page",
    icon: customInvitePdf,
    date: "12.10",
    completed: false,
  },
  {
    title: "New program",
    icon: newProgram,
    date: "3.10",
    completed: false,
  },
  {
    title: "Token",
    icon: token,
    date: "20.12 2023",
    completed: false,
  },
];

const Roadmap: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<RoadmapItem[]>([]);

  const handleComplete = (item: RoadmapItem) => {
    setCompletedItems([...completedItems, item]);
  };

  return (
    <div className="w-5/6 m-auto my-6 text-white p-4 md:p-8 rounded-lg">
      <h1 className="text-xl md:text-2xl font-bold mb-4 my-4">Roadmapss</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {roadmapItems.map((item, index) => (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-between ${
              item.completed ? "opacity-50" : ""
            }`}
          >
            <div className="flex flex-col items-center">
              <Image src={item.icon} alt={`${item.title} icon`} width="24" height="24" />
              <h2 className="text-lg font-bold mt-2">{item.title}</h2>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-sm">{item.date}</p>
              {item.completed ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-500"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0 1 18 0z" />
                </svg>
              ) : (
                <button
                  onClick={() => handleComplete(item)}
                  className="hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;