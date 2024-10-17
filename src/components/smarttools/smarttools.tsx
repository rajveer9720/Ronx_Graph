'use client';

import Button from '@/components/ui/button';
import Feeds from '@/components/search/feeds';
import { useDrawer } from '@/components/drawer-views/context';
import { Filters, GridSwitcher, SortList } from '@/components/search/filters';
import { OptionIcon } from '@/components/icons/option';

export default function SmartTools() {
  const { openDrawer } = useDrawer();
  return (
    <>

    
<div className='flex mt-5 items-center rounded-lg  bg-gray-100  p-5  dark:bg-light-dark'>
    
<div className="flex relative flex-1 py-10 pt-8.5 flex-col justify-between w-full px-10 sm:px-0 sm:pt-7.5">
      <main className="flex flex-1 w-full">
        <div className="flex flex-col w-full">
          <div className="mb-7.5">
            <div className="flex flex-col flex-wrap w-full sm:px-5">
              <div className="notranslate"></div>
              <div className="flex items-center mb-1.5 sm:mb-2.5"></div>
              <div className="w-full flex justify-between flex-wrap">
                <div className="flex flex-wrap items-center">
                  <span className="text-two-half text-white font-medium mr-2 sm:text-2xl whitespace-nowrap">
                    Smart tools
                  </span>
                  <a
                    className="inline-flex px-2.5 !leading-30px bg-blue-800 notranslate hover:bg-main-blue-300 text-main-blue rounded text-xl w-max sm:text-base"
                    href="/dashboard?user=1710397"
                  >
                    ID 1710397
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-50% flex flex-1 overflow-hidden relative w-full flex-col bg-black-light rounded p-7.5 pb-5 space-y-5 sm:space-y-2.5 sm:p-5 sm:rounded-none lg:max-w-full">
            <a
              target="_blank"
              href="https://t.me/busd_RonX_io_bot"
              className="block"
            >
              <div className="flex items-center justify-between rounded-lg bg-gray-100 hover:bg-white-300 shadow-md p-5 sm:items-start dark:bg-light-dark">
                <div className="bg-black-light flex justify-center items-center rounded-full w-10 h-10 mr-5">
                  <svg
                    className="w-5 h-5 stroke-current text-white"
                    viewBox="0 0 24 24"
                    stroke="#fff"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-1 flex-col items-start justify-center">
                  <span className="text-white font-medium text-base mb-1.5 notranslate">
                    Official RonX App
                  </span>
                  <span className="text-white-500 text-sm">
                    Enjoy all the features from your smartphone
                  </span>
                </div>
              </div>
            </a>
            <a
              target="_blank"
              href="https://RonX-storage.s3.eu-central-1.amazonaws.com/RonXApp.apk"
              className="block"
            >
              <div className="flex items-center justify-between rounded-lg bg-gray-100 hover:bg-white-300 shadow-md p-5 sm:items-start dark:bg-light-dark">
                <div className="bg-black-light flex justify-center items-center rounded-full w-10 h-10 mr-5">
                  <svg
                    className="w-5 h-5 stroke-current text-white"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"></path>
                  </svg>
                </div>
                <div className="flex flex-1 flex-col items-start justify-center">
                  <span className="text-white font-medium text-base mb-1.5 notranslate">
                    Official RonX App
                  </span>
                  <span className="text-white-500 text-sm">
                    Enjoy all the features from your smartphone
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
      <footer className="flex lg:flex-col items-center mt-auto justify-between lg:justify-start lg:items-start py-10 w-full lg:p-5 lg:pb-9 pb-0 lg:pb-0 z-10">
        <div className="hidden lg:block mb-7.5">
          <div className="flex space-x-4 w-full">
            <a
              className="w-7 h-7 flex justify-center items-center rounded-full bg-white-100 hover:bg-white-300"
              target="_blank"
              href="https://discord.gg/RonX/"
            >
              <svg className="w-4 h-4" viewBox="0 0 21 15" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.581 1.247A15.918 15.918 0 0 0 13.58 0a.084.084 0 0 0-.065.028c-.169.31-.366.712-.497 1.022a15.08 15.08 0 0 0-4.499 0A9.395 9.395 0 0 0 8.012.028C8.002.01 7.975 0 7.947 0a16.038 16.038 0 0 0-4.003 1.247c-.009 0-.018.009-.028.018C1.367 5.08.664 8.791 1.011 12.465c0 .02.01.038.028.047a16.28 16.28 0 0 0 4.911 2.484c.028.01.056 0 .066-.019.375-.515.712-1.059 1.003-1.63.018-.038 0-.075-.038-.085-.534-.206-1.04-.45-1.537-.73-.037-.02-.037-.076-.01-.104.104-.075.207-.16.31-.234a.058.058 0 0 1 .066-.01c3.224 1.472 6.7 1.472 9.888 0a.058.058 0 0 1 .065.01c.103.084.206.16.31.243.037.029.037.085-.01.104-.487.29-1.003.524-1.537.73-.037.01-.047.057-.037.085.3.572.637 1.115 1.002 1.63.029.01.057.02.085.01a16.215 16.215 0 0 0 4.92-2.484.052.052 0 0 0 .029-.046c.412-4.246-.685-7.93-2.906-11.2-.01-.01-.019-.02-.038-.02ZM7.506 10.226c-.965 0-1.771-.89-1.771-1.987s.787-1.987 1.771-1.987c.994 0 1.78.9 1.771 1.987 0 1.096-.787 1.986-1.771 1.986Zm6.533 0c-.966 0-1.772-.89-1.772-1.987s.788-1.987 1.772-1.987c.993 0 1.78.9 1.771 1.987 0 1.096-.778 1.986-1.771 1.986Z"></path>
              </svg>
            </a>
            <a
              className="w-7 h-7 flex justify-center items-center rounded-full bg-white-100 hover:bg-white-300"
              target="_blank"
              href="https://t.me/RonXio_official/"
            >
              <svg className="w-4 h-4" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.915.776a1.687 1.687 0 0 0-1.153-.244c-.436-.294-.99-.462-1.548-.482a2.42 2.42 0 0 0-4.125 2.208A6.86 6.86 0 0 1 1.219.643a2.423 2.423 0 0 0 .751 3.235c-.4-.01-.774-.12-1.1-.302v.03A2.422 2.422 0 0 0 2.813 5.98a2.441 2.441 0 0 1-1.092.04 2.425 2.425 0 0 0 2.263 1.683A4.854 4.854 0 0 1 .398 8.705 6.767 6.767 0 0 0 4.103 9.8c4.458 0 6.893-3.692 6.893-6.895 0-.105-.003-.21-.008-.312a4.928 4.928 0 0 0 1.208-1.255ZM5.683 7.055v-4.11L9.119 5 5.683 7.055Z"
                  fill="#fff"
                ></path>
              </svg>
            </a>
            <a
              className="w-7 h-7 flex justify-center items-center rounded-full bg-white-100 hover:bg-white-300"
              target="_blank"
              href="https://twitter.com/RonXofficial/"
            >
              <svg className="w-4 h-4" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.196 1.338c-.442.195-.91.324-1.39.382.506-.302.884-.779 1.064-1.34a4.79 4.79 0 0 1-1.536.588 2.42 2.42 0 0 0-4.125 2.208A6.86 6.86 0 0 1 1.219.643a2.423 2.423 0 0 0 .751 3.235c-.4-.01-.774-.12-1.1-.302v.03A2.422 2.422 0 0 0 2.813 5.98a2.441 2.441 0 0 1-1.092.04 2.425 2.425 0 0 0 2.263 1.683A4.854 4.854 0 0 1 .398 8.705 6.767 6.767 0 0 0 4.103 9.8c4.458 0 6.893-3.692 6.893-6.895 0-.105-.003-.21-.008-.312a4.928 4.928 0 0 0 1.208-1.255ZM5.683 7.055v-4.11L9.119 5 5.683 7.055Z"
                  fill="#fff"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <span className="text-white-500 text-xs font-normal lg:mb-2.5">
          © 2024 All Rights Reserved
        </span>
        <button className="flex justify-center items-center text-center text-base font-bold text-white rounded-mini sm:text-sm outline-none px-0 py-0 bg-transparent text-white hover:text-white-500 font-normal text-sm notranslate">
          Documents
        </button>
      </footer>
    </div>
    </div>
    </>
  );
}