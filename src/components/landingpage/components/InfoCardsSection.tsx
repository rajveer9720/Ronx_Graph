import React from 'react';
import Image from '@/components/ui/image';
import BannerForth from '@/assets/images/BannerForth.png';
import Laptop from '@/assets/images/laptop.png';
const InfoCardsSection: React.FC = () => {
  return (
    <section className=" mb-32 bg-gradient-to-r from-green-400 via-purple-500 to-blue-500 text-white p-16 w-full object-cover md:h-full"    style={{
      backgroundImage: `url(${BannerForth.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
       <style jsx>{`
     
      `}</style>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 ">
        <div className=" rounded-lg shadow-lg">
          <div className="flex items-center mb-4" >
           
            <div className="text-center">
              <h3 className="text-2xl font-bold">Convenient office</h3>
              <p className="text-gray-400">Interactive online visualization of active slots showing your unique NFT collection and your financial progress.</p>
            </div>
          </div>


        </div>
      
        <div className="w-full max-w-3xl mx-auto mb-8">
          <Image
            src={Laptop}
            alt="Criptic"
            className="w-full h-auto"
            priority
          />
        </div>
          {/* <div className="p-8 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <svg className="w-8 h-8 text-gray-400 mr-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 22c-1.105 0-2-.895-2-2H4a4 4 0 01-4-4V8a4 4 0 014-4h8a4 4 0 014 4v2h4a2 2 0 012 2v4a2 2 0 01-2 2h-4.171l-2.83 2.83c-.39.391-.902.61-1.42.61H9zm-5-6h6v1.17l2.83-2.83H20v-4h-6v-4a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2zm2-4h8v2H6v-2z"></path></svg>
              <div>
                <h3 className="text-2xl font-bold">Live Chat</h3>
                <p className="text-gray-400">Platform where you can ask questions to experienced participants</p>
              </div>
            </div>
            <a href="#find-mentor" className="text-purple-500 hover:underline">Find a mentor →</a>
          </div> */}
      </div>
    </section>
  );
};

export default InfoCardsSection;