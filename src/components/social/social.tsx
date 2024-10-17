'use client';

import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';

export default function Social() {
  const { openDrawer } = useDrawer();
  return (
    <>
    <nav className="bg-blue-600 p-4 flex items-center justify-between">
      <div className="text-white text-lg">Preview ID</div>
      <input type="text" placeholder="656" className="p-2 rounded" />
      <button className="bg-blue-800 text-white p-2 rounded">Go</button>
      <button className="bg-blue-800 text-white p-2 rounded">Connect Wallet</button>
    </nav>
    <img src="" alt="" className='' />
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded text-center text-white">
      <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4">
      </div>
      <div>ID 656</div>
    </div>
    <div className="flex justify-around mt-4">
      <div className="text-center">
        <div className="text-lg font-bold">1</div>
        <div>Partners</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">2</div>
        <div>Team</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">100%</div>
        <div>Ratio</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold">10</div>
        <div>Total Profits</div>
      </div>
    </div>
    <div className="mt-6 p-6 space-x-5 bg-gray-100 rounded">
      <button className="bg-blue-600 text-white p-2 rounded mb-4">All Post</button>
      <button className="bg-blue-600 text-white p-2 rounded mb-4">Create New Post</button>
      <div className="text-center text-gray-500">Posts not found</div>
    </div>
    </>
  );
}
