'use client';

import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';

export default function Links() {
  const { openDrawer } = useDrawer();
  return (
    <>
    
    <div className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Links</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">New partners by month</h3>
            <div className="h-40 w-full bg-gray-700 rounded-lg">
              {/* Add a chart or graph here */}
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Link clicks</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">0</span>
              <span className="ml-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 10a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Partners</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">6</span>
              <span className="ml-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 10a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">Team</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">30</span>
              <span className="ml-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 10a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg col-span-4">
            <h3 className="text-lg font-bold mb-2">Profits</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold">110 BUSD</span>
              <span className="ml-2 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zm0 10a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg col-span-4">
            <h3 className="text-lg font-bold mb-2">Personal link</h3>
            <div className="flex items-center">
              <a
                href="RonX.lo/b/yke8rv"
                className="text-blue-500 hover:underline"
              >
                RonX.lo/b/yke8rv
              </a>
              <button className="ml-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Copy
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg col-span-4">
            <h3 className="text-lg font-bold mb-2">Personal link MaxQore</h3>
            <div className="flex items-center">
              <a
                href="RonX.lo/mq/yke8rv"
                className="text-blue-500 hover:underline"
              >
                RonX.lo/mq/yke8rv
              </a>
              <button className="ml-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Copy
              </button>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg col-span-4">
            <h3 className="text-lg font-bold mb-2">Personal link xQore</h3>
            <div className="flex items-center">
              <a
                href="RonX.lo/q/yke8rv"
                className="text-blue-500 hover:underline"
              >
                RonX.lo/q/yke8rv
              </a>
              <button className="ml-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
                Copy
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Create custom Invite PDF</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Create PDF
          </button>
        </div>
      </div>
    </div>
  
    </>
  );
}
