import React from 'react';
import Image from 'next/image';
import OfficeBot from '@/assets/images/BannerBG.png';

const NotifyBot: React.FC = () => {
  return (
    <div
      className="relative p-4 sm:p-7 rounded-lg mt-10 mb-8 text-center w-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url(${OfficeBot.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '30vh', // Adjust the height as needed
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div> {/* Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
        <h2 className="text-lg sm:text-2xl font-bold mb-2">Official Notify Bot for busd.RonX.io users</h2>
        <p className="text-xs sm:text-sm">Here you can get notifications about all the events in your account.</p>
      </div>
    </div>
  );
};

export default NotifyBot;