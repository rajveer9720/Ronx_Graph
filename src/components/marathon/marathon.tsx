'use client';
import React, { useState } from 'react';

interface Participant {
  place: number;
  userId: number;
  nickname: string;
  prize: string;
}

interface LeaderboardEntry {
  place: number;
  userId: number;
  nickname: string;
  points: number;
  prize: string;
}

const marathonData: { [key: string]: Participant[] } = {
  week1: [
    { place: 1, userId: 236048, nickname: 'Kamlesh@', prize: '0.08 BNB' },
    { place: 2, userId: 1243690, nickname: 'Ag et Ag', prize: '0.08 BNB' },
    { place: 3, userId: 1548301, nickname: 'MUKESH@07cr', prize: '0.08 BNB' },
    { place: 4, userId: 1549694, nickname: 'Habibur.', prize: '0.08 BNB' },
    { place: 5, userId: 1590197, nickname: 'Saksh', prize: '0.08 BNB' },
    { place: 6, userId: 780485, nickname: 'Sapan@', prize: '0.08 BNB' },
    { place: 7, userId: 1592317, nickname: 'Parwats@', prize: '0.08 BNB' },
    { place: 8, userId: 1585220, nickname: 'Priya★Roy', prize: '0.08 BNB' },
    { place: 9, userId: 1552872, nickname: 'Rakesh 91', prize: '0.08 BNB' },
    { place: 10, userId: 939096, nickname: 'BHASKARA*1', prize: '0.08 BNB' },
    { place: 11, userId: 688907, nickname: 'AmbrSarliya', prize: '0.08 BNB' },
    { place: 12, userId: 983235, nickname: 'Dr.Prem🖐️', prize: '0.08 BNB' },
    { place: 13, userId: 2925136, nickname: 'Mazhar@', prize: '0.08 BNB' },
    { place: 14, userId: 1400496, nickname: 'Bachir d', prize: '0.08 BNB' },
    { place: 15, userId: 1563630, nickname: 'Aaswari', prize: '0.08 BNB' },
    { place: 16, userId: 1548302, nickname: 'Nikhil@', prize: '0.08 BNB' },
    { place: 17, userId: 1254821, nickname: 'Raju@', prize: '0.08 BNB' },
    { place: 18, userId: 1549630, nickname: 'Mohan@', prize: '0.08 BNB' },
    { place: 19, userId: 1390045, nickname: 'Anil@', prize: '0.08 BNB' },
    { place: 20, userId: 1690751, nickname: 'Sumit@', prize: '0.08 BNB' },
    { place: 21, userId: 1548384, nickname: 'Vijay@', prize: '0.08 BNB' },
    { place: 22, userId: 1548457, nickname: 'Rajesh@', prize: '0.08 BNB' },
    { place: 23, userId: 1398754, nickname: 'Kiran@', prize: '0.08 BNB' },
    { place: 24, userId: 1548794, nickname: 'Sunil@', prize: '0.08 BNB' },
    { place: 25, userId: 1590087, nickname: 'Pankaj@', prize: '0.08 BNB' },
    { place: 26, userId: 1253796, nickname: 'Nitin@', prize: '0.08 BNB' },
    { place: 27, userId: 1548984, nickname: 'Mahesh@', prize: '0.08 BNB' },
    { place: 28, userId: 1392847, nickname: 'Arun@', prize: '0.08 BNB' },
    { place: 29, userId: 1690842, nickname: 'Suresh@', prize: '0.08 BNB' },
    { place: 30, userId: 1549275, nickname: 'Dinesh@', prize: '0.08 BNB' },
    { place: 31, userId: 1549302, nickname: 'Ramesh@', prize: '0.08 BNB' },
    { place: 32, userId: 1549456, nickname: 'Jatin@', prize: '0.08 BNB' },
    { place: 33, userId: 1590497, nickname: 'Prakash@', prize: '0.08 BNB' },
    { place: 34, userId: 1690987, nickname: 'Mukul@', prize: '0.08 BNB' },
    { place: 35, userId: 1253892, nickname: 'Rohit@', prize: '0.08 BNB' },
    { place: 36, userId: 1549640, nickname: 'Shyam@', prize: '0.08 BNB' },
    { place: 37, userId: 1549794, nickname: 'Narayan@', prize: '0.08 BNB' },
    { place: 38, userId: 1590148, nickname: 'Bharat@', prize: '0.08 BNB' },
    { place: 39, userId: 1690139, nickname: 'Arvind@', prize: '0.08 BNB' },
    { place: 40, userId: 1549815, nickname: 'Hemant@', prize: '0.08 BNB' },
    { place: 41, userId: 1549840, nickname: 'Shiv@', prize: '0.08 BNB' },
    { place: 42, userId: 1590163, nickname: 'Ajay@', prize: '0.08 BNB' },
    { place: 43, userId: 1690178, nickname: 'Bhanu@', prize: '0.08 BNB' },
    { place: 44, userId: 1253917, nickname: 'Kishan@', prize: '0.08 BNB' },
    { place: 45, userId: 1549865, nickname: 'Sandeep@', prize: '0.08 BNB' },
    { place: 46, userId: 1549880, nickname: 'Yash@', prize: '0.08 BNB' },
    { place: 47, userId: 1590188, nickname: 'Vimal@', prize: '0.08 BNB' },
    { place: 48, userId: 1690193, nickname: 'Vipin@', prize: '0.08 BNB' },
    { place: 49, userId: 1253942, nickname: 'Harsh@', prize: '0.08 BNB' },
    { place: 50, userId: 1549905, nickname: 'Ravi@', prize: '0.08 BNB' },
    // ... other participants for week 1
  ],
  week2: [
    { place: 1, userId: 1597831, nickname: 'User1', prize: '0.08 BNB' },
    { place: 2, userId: 1588486, nickname: 'User2', prize: '0.08 BNB' },
    { place: 1, userId: 236048, nickname: 'Kamlesh@', prize: '0.08 BNB' },
    { place: 2, userId: 1243690, nickname: 'Ag et Ag', prize: '0.08 BNB' },
    { place: 3, userId: 1548301, nickname: 'MUKESH@07cr', prize: '0.08 BNB' },
    { place: 4, userId: 1549694, nickname: 'Habibur.', prize: '0.08 BNB' },
    { place: 5, userId: 1590197, nickname: 'Saksh', prize: '0.08 BNB' },
    { place: 6, userId: 780485, nickname: 'Sapan@', prize: '0.08 BNB' },
    { place: 7, userId: 1592317, nickname: 'Parwats@', prize: '0.08 BNB' },
    { place: 8, userId: 1585220, nickname: 'Priya★Roy', prize: '0.08 BNB' },
    { place: 9, userId: 1552872, nickname: 'Rakesh 91', prize: '0.08 BNB' },
    { place: 10, userId: 939096, nickname: 'BHASKARA*1', prize: '0.08 BNB' },
    { place: 11, userId: 688907, nickname: 'AmbrSarliya', prize: '0.08 BNB' },
    { place: 12, userId: 983235, nickname: 'Dr.Prem🖐️', prize: '0.08 BNB' },
    { place: 13, userId: 2925136, nickname: 'Mazhar@', prize: '0.08 BNB' },
    { place: 14, userId: 1400496, nickname: 'Bachir d', prize: '0.08 BNB' },
    { place: 15, userId: 1563630, nickname: 'Aaswari', prize: '0.08 BNB' },
    { place: 16, userId: 1548302, nickname: 'Nikhil@', prize: '0.08 BNB' },
    { place: 17, userId: 1254821, nickname: 'Raju@', prize: '0.08 BNB' },
    { place: 18, userId: 1549630, nickname: 'Mohan@', prize: '0.08 BNB' },
    { place: 19, userId: 1390045, nickname: 'Anil@', prize: '0.08 BNB' },
    { place: 20, userId: 1690751, nickname: 'Sumit@', prize: '0.08 BNB' },
    { place: 21, userId: 1548384, nickname: 'Vijay@', prize: '0.08 BNB' },
    { place: 22, userId: 1548457, nickname: 'Rajesh@', prize: '0.08 BNB' },
    { place: 23, userId: 1398754, nickname: 'Kiran@', prize: '0.08 BNB' },
    { place: 24, userId: 1548794, nickname: 'Sunil@', prize: '0.08 BNB' },
    { place: 25, userId: 1590087, nickname: 'Pankaj@', prize: '0.08 BNB' },
    { place: 26, userId: 1253796, nickname: 'Nitin@', prize: '0.08 BNB' },
    // ... other participants for week 2
  ],
  week3: [
    { place: 1, userId: 1572833, nickname: 'User3', prize: '0.08 BNB' },
    { place: 2, userId: 1572962, nickname: 'User4', prize: '0.08 BNB' },
    { place: 1, userId: 236048, nickname: 'Kamlesh@', prize: '0.08 BNB' },
    { place: 2, userId: 1243690, nickname: 'Ag et Ag', prize: '0.08 BNB' },
    { place: 3, userId: 1548301, nickname: 'MUKESH@07cr', prize: '0.08 BNB' },
    { place: 4, userId: 1549694, nickname: 'Habibur.', prize: '0.08 BNB' },
    { place: 5, userId: 1590197, nickname: 'Saksh', prize: '0.08 BNB' },
    { place: 6, userId: 780485, nickname: 'Sapan@', prize: '0.08 BNB' },
    { place: 7, userId: 1592317, nickname: 'Parwats@', prize: '0.08 BNB' },
    { place: 8, userId: 1585220, nickname: 'Priya★Roy', prize: '0.08 BNB' },
    { place: 9, userId: 1552872, nickname: 'Rakesh 91', prize: '0.08 BNB' },
    { place: 10, userId: 939096, nickname: 'BHASKARA*1', prize: '0.08 BNB' },
    { place: 11, userId: 688907, nickname: 'AmbrSarliya', prize: '0.08 BNB' },
    { place: 12, userId: 983235, nickname: 'Dr.Prem🖐️', prize: '0.08 BNB' },
    { place: 13, userId: 2925136, nickname: 'Mazhar@', prize: '0.08 BNB' },
    { place: 14, userId: 1400496, nickname: 'Bachir d', prize: '0.08 BNB' },
    { place: 15, userId: 1563630, nickname: 'Aaswari', prize: '0.08 BNB' },
    { place: 16, userId: 1548302, nickname: 'Nikhil@', prize: '0.08 BNB' },
    { place: 17, userId: 1254821, nickname: 'Raju@', prize: '0.08 BNB' },
    { place: 18, userId: 1549630, nickname: 'Mohan@', prize: '0.08 BNB' },
    { place: 19, userId: 1390045, nickname: 'Anil@', prize: '0.08 BNB' },
    { place: 20, userId: 1690751, nickname: 'Sumit@', prize: '0.08 BNB' },
    { place: 21, userId: 1548384, nickname: 'Vijay@', prize: '0.08 BNB' },
    { place: 22, userId: 1548457, nickname: 'Rajesh@', prize: '0.08 BNB' },
    { place: 23, userId: 1398754, nickname: 'Kiran@', prize: '0.08 BNB' },
    { place: 24, userId: 1548794, nickname: 'Sunil@', prize: '0.08 BNB' },
    { place: 25, userId: 1590087, nickname: 'Pankaj@', prize: '0.08 BNB' },
    { place: 26, userId: 1253796, nickname: 'Nitin@', prize: '0.08 BNB' },
    // ... other participants for week 3
  ],
  week4: [
    { place: 1, userId: 1567931, nickname: 'User5', prize: '0.08 BNB' },
    { place: 2, userId: 1568710, nickname: 'User6', prize: '0.08 BNB' },
    { place: 1, userId: 236048, nickname: 'Kamlesh@', prize: '0.08 BNB' },
    { place: 2, userId: 1243690, nickname: 'Ag et Ag', prize: '0.08 BNB' },
    { place: 3, userId: 1548301, nickname: 'MUKESH@07cr', prize: '0.08 BNB' },
    { place: 4, userId: 1549694, nickname: 'Habibur.', prize: '0.08 BNB' },
    { place: 5, userId: 1590197, nickname: 'Saksh', prize: '0.08 BNB' },
    { place: 6, userId: 780485, nickname: 'Sapan@', prize: '0.08 BNB' },
    { place: 7, userId: 1592317, nickname: 'Parwats@', prize: '0.08 BNB' },
    { place: 8, userId: 1585220, nickname: 'Priya★Roy', prize: '0.08 BNB' },
    { place: 9, userId: 1552872, nickname: 'Rakesh 91', prize: '0.08 BNB' },
    { place: 10, userId: 939096, nickname: 'BHASKARA*1', prize: '0.08 BNB' },
    { place: 11, userId: 688907, nickname: 'AmbrSarliya', prize: '0.08 BNB' },
    { place: 12, userId: 983235, nickname: 'Dr.Prem🖐️', prize: '0.08 BNB' },
    { place: 13, userId: 2925136, nickname: 'Mazhar@', prize: '0.08 BNB' },
    { place: 14, userId: 1400496, nickname: 'Bachir d', prize: '0.08 BNB' },
    { place: 15, userId: 1563630, nickname: 'Aaswari', prize: '0.08 BNB' },
    { place: 16, userId: 1548302, nickname: 'Nikhil@', prize: '0.08 BNB' },
    { place: 17, userId: 1254821, nickname: 'Raju@', prize: '0.08 BNB' },
    { place: 18, userId: 1549630, nickname: 'Mohan@', prize: '0.08 BNB' },
    { place: 19, userId: 1390045, nickname: 'Anil@', prize: '0.08 BNB' },
    { place: 20, userId: 1690751, nickname: 'Sumit@', prize: '0.08 BNB' },
    { place: 21, userId: 1548384, nickname: 'Vijay@', prize: '0.08 BNB' },
    { place: 22, userId: 1548457, nickname: 'Rajesh@', prize: '0.08 BNB' },
    { place: 23, userId: 1398754, nickname: 'Kiran@', prize: '0.08 BNB' },
    { place: 24, userId: 1548794, nickname: 'Sunil@', prize: '0.08 BNB' },
    { place: 25, userId: 1590087, nickname: 'Pankaj@', prize: '0.08 BNB' },
    { place: 26, userId: 1253796, nickname: 'Nitin@', prize: '0.08 BNB' },
    // ... other participants for week 4
  ]
};

const leaderboardData: LeaderboardEntry[] = [
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  
  { place: 1, userId: 1575831, nickname: 'User1', points: 331, prize: '0.5 BNB' },
  { place: 2, userId: 1588486, nickname: 'User2', points: 253, prize: '0.375 BNB' },
  // ... other leaderboard entries
];
export default function Marathon() {



  const [selectedWeek, setSelectedWeek] = useState<string>('week1');
  
  const handleWeekSelect = (week: string) => {
    setSelectedWeek(week);
  };

  return (
    <>
          <div className=" mx-auto p-6 bg-gray-900 text-white min-h-screen">
        <h1 className="text-2xl font-bold mb-4 gradient-text mx-auto">MaxQore Marathon</h1>
  
        <div className="flex space-x-2 mb-4 mx-auto">
          {['1 week', '2 week', '3 week', '4 week'].map((week, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded ${selectedWeek === `week${index + 1}` ? 'bg-blue-500' : 'bg-gray-700'}`}
              onClick={() => handleWeekSelect(`week${index + 1}`)}
            >
              {week}
            </button>
          ))}
        </div>
  
    
        <div className="h-96 py-8   overflow-y-scroll bg-gray-800 p-4 rounded-lg">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Place</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Nickname</th>
              <th className="px-4 py-2">Prize</th>
            </tr>
          </thead>
          <tbody>
            {marathonData[selectedWeek].map((participant) => (
              <tr key={participant.place} className="odd:bg-gray-700 even:bg-gray-600">
                <td className="px-4 py-2 text-center">{participant.place}</td>
                <td className="px-4 py-2 text-center">{participant.userId}</td>
                <td className="px-4 py-2 text-center">{participant.nickname}</td>
                <td className="px-4 py-2 text-center">{participant.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <h2 className="text-3xl font-bold mb-4 py-4  ">Leaderboard</h2>
      <div className="h-96 py-8   overflow-y-scroll bg-gray-800 p-4 rounded-lg">
        <div className="bg-gray-800 p-4 rounded">
          <table className="w-full text-left ">
            <thead>
              <tr>
                <th>Place</th>
                <th>User ID</th>
                <th>Nickname</th>
                <th>Points</th>
                <th>Prize</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map(entry => (
                <tr key={entry.place}  className="odd:bg-gray-700 even:bg-gray-600">
                  <td className="px-4 py-2 text-center">{entry.place}</td>
                  <td className="px-4 py-2 text-center">{entry.userId}</td>
                  <td className="px-4 py-2 text-center">{entry.nickname}</td>
                  <td className="px-4 py-2 text-center">{entry.points}</td>
                  <td className="px-4 py-2 text-center">{entry.prize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </>
  );
}
