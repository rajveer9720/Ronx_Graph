'use client';

import Button from '@/components/ui/button';
import FileInput from '@/components/ui/file-input';
import Image from 'next/image';
import opensea from '@/assets/images/nft/nft/open-sea.webp';
import openseascreen from '@/assets/images/nft/nft/open-sea-screen.webp';

export default function NFTS() {
  return (
    <div className="mx-auto w-full pt-8 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-gray-900 dark:text-white text-center sm:text-left">
          NFT Collection <span>ID 1757863</span>
        </h2>
      </div>

      {/* <div className="mb-8 mt-6 grid grid-cols-1 gap-12 sm:mt-10">
        <div className="relative">
          <div className="mb-8">
            <FileInput multiple />
          </div>
        </div>
      </div> */}

      {/* Price */}
      <div className="flex flex-col sm:flex-row items-center justify-between mt-12 sm:mt-24">
        <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-gray-900 dark:text-white text-center sm:text-left">
          Buy/Sell NFT
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-between rounded-2xl my-10 p-4 sm:p-10" style={{ background: 'linear-gradient(94.48deg,#2bcde4 1.2%,#1868b7 111.59%)' }}>
        <div className="w-full sm:w-[40%] mx-2 sm:mx-10 flex flex-col items-center">
          <Image src={opensea} alt="opensea" className="w-full h-auto" />
          <Button className="mt-4 sm:mt-7 w-full" style={{ background: 'linear-gradient(94.48deg,#2bcde4 1.2%,#1868b7 111.59%)' }}>OpenSea</Button>
        </div>
        <div className="w-full sm:w-[60%] mt-4 sm:mt-0 flex justify-center">
          <Image className="rounded-lg w-full h-auto" src={openseascreen} alt="Your NFT" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <h2 className="text-xl sm:text-3xl font-bold uppercase tracking-wider text-gray-900 dark:text-white text-center sm:text-left">
          Your NFT
        </h2>
      </div>

      <div className="m-4 sm:m-8 flex flex-col justify-center text-center items-center">
        <h1 className="font-bold text-lg sm:text-2xl">
          You don&apos;t have a MEO WORLD NFT yet.
        </h1>
        <Button shape="rounded" className="mt-2 w-full sm:w-auto" style={{ background: 'linear-gradient(90.03deg,#e644f8 -8.27%,#9fa3ff 50.55%,#82d2ff 113.36%)' }}>Buy NFT</Button>
      </div>
    </div>
  );
}
