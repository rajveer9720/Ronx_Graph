import React, { useState } from 'react';

const AccountPreview: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePreviewClick = () => {
    // Handle preview action
    console.log('Preview:', inputValue);
  };

  const handleDemoClick = () => {
    // Handle demo action
    console.log('Demo clicked');
  };
  const handleRegisterBUSD = () => {
    window.location.href = 'http://localhost:3000/retro'; // Replace with your desired URL
  };

  return (
<div className="  mt-5 items-center rounded-lg  bg-gray-100  p-5  dark:bg-light-dark text-white p-8 rounded-md w-5/6  mx-auto">      <h2 className="text-xl font-semibold mb-4">Account preview</h2>
      <p className="text-gray-400 mb-6">
        Look up any RonX BUSD member account in preview mode. Enter ID or BUSD address to preview or click Demo to view a random account.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center mb-4 md:mb-0">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="example: 87381"
            className="w-full p-3 bg-gray-800 text-white rounded-l-md focus:outline-none"
          />
          <button
          onClick={handleRegisterBUSD}
            className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none"
          >
            Preview
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={handleDemoClick}
            className="p-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Don't know any ID? <span className="font-semibold">Check demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPreview;
