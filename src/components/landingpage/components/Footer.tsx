import React from 'react';
import Image from '@/components/ui/image';

import darkLogo from '@/assets/images/logo-white.svg';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-1 md:flex-row justify-between items-start mb-10">
                    <div className="flex flex-col space-y-2 mb-4 md:mb-0">
                        <Image src={darkLogo} alt="Criptic" height={45} priority />
                        <p className="text-sm">The world&#39;s first 100% decentralized matrix platform</p>
                    </div>
                    <div className="flex grid-cols-1 md:grid-cols-2 gap-4 md:gap-1 text-sm">
                        <div className="grid grid-cols-1 gap-2 border border-gray-700 p-2 rounded">
                            <p className="bg-gray-800 p-1 rounded">x3 / x4 busd</p>
                        </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg max-w-md mt-4 md:mt-0">
                        <div className="flex grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col space-y-1">
                                <p className="bg-gray-700 p-2 rounded shadow">RonX BUSD</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4 mt-10">
                    <div className="flex md:flex-row items-center justify-center">
                        <div className="text-center text-sm mb-4 md:mb-0">
                            <p>&copy; 2024 All Rights Reserved</p>
                            <a href="#" className="hover:text-gray-400">All DIGITAL LIVE</a>
                        </div>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-telegram-plane"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-youtube"></i></a>
                            <a href="#" className="hover:text-gray-400"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
