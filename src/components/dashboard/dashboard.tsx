import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  increase: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, increase }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-white flex flex-col">
      <p className="text-lg font-medium">{title}</p>
      <h2 className="text-2xl font-semibold">{value}</h2>
      <p className="text-sm text-green-500">{increase}</p>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <div className="my-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mx-auto text-center items-center">
    <StatCard title="Partners" value="16" increase="↑ 0" />
    <StatCard title="Team" value="21" increase="↑ 0" />
    <StatCard title="Ratio" value="209%" increase="↑ 0%" />
    <StatCard title="Profits" value="3,891 " increase="↑ 0\n↑ 0" />
  </div>
   );
};

export default Dashboard;