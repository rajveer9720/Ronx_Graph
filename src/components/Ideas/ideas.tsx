import React from 'react';

interface IdeaProps {
  title: string;
  rating: number;
  date: string;
  description: string;
}

const Idea: React.FC<IdeaProps> = ({ title, rating, date, description }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 m-4 flex flex-col justify-between">
      <div className="flex justify-between">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 text-sm">{date}</p>
      </div>
      <p className="text-gray-400 mt-2">{description}</p>
      <div className="flex items-center mt-4">
        <span className="text-green-500 font-bold text-lg">
          +{rating}
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-4">
          View
        </button>
      </div>
    </div>
  );
};

const ideasData = [
  {
    title: 'RonX.io is based on bnb chain and it\'s (RonX.io) doesn\'t have their own',
    rating: 1426,
    date: '15.08.2023',
    description: ''
  },
  {
    title: 'Ronx.io',
    rating: 1410,
    date: '12.08.2023',
    description: 'This Website And plataform is good for Poor people to eaen Money for There'
  },
  {
    title: 'I love RonX',
    rating: 737,
    date: '12.08.2023',
    description: 'It\'s very grateful'
  },
  {
    title: 'I love RonX.io',
    rating: 611,
    date: '12.08.2023',
    description: 'Life change Love'
  },
  {
    title: 'RonX.io',
    rating: 370,
    date: '12.08.2023',
    description: ''
  },
  {
    title: 'RonX.io is the best',
    rating: 204,
    date: '12.08.2023',
    description: ''
  },
  {
    title: 'Ronx',
    rating: 305,
    date: '12.08.2023',
    description: 'RonX are best platform for online earning.'
  },
  {
    title: 'RonX.io is best income platform',
    rating: 159,
    date: '12.08.2023',
    description: 'RonX io is very very good earning platform'
  }
];

const Ideas: React.FC = () => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-white mt-8 mb-4">
        All Ideas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1">
        {ideasData.map((idea, index) => (
          <Idea key={index} {...idea} />
        ))}
      </div>
    </div>
  );
};

export default Ideas;