'use client';

import { useState } from 'react';
import { useCopyToClipboard } from 'react-use';
import AuthorInformation from '@/components/author/author-information';
import { authorData } from '@/data/static/author';
import { Check } from '@/components/icons/check';
import { Copy } from '@/components/icons/copy';
import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import Avatar from '@/components/ui/avatar';
import ProfileTab from '@/components/profile/profile-tab';
import userBanner from '@/assets/images/userBanner.png'

export default function Profile() {
  const [copyButtonStatus, setCopyButtonStatus] = useState(false);
  const [_, copyToClipboard] = useCopyToClipboard();
  function handleCopyToClipboard() {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  }
  return (
    <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row 3xl:pt-12">
      <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10  3xl:ltr:pr-14 3xl:rtl:pl-14">
        <div className="text-center ltr:md:text-left rtl:md:text-right">
          <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
            {authorData?.name}
          </h2>
          <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
            @{authorData?.user_name}
          </div>
          <div className="md:max-w-auto mx-auto mt-5 flex h-9 max-w-sm items-center rounded-full bg-white shadow-card dark:bg-light-dark md:mx-0 xl:mt-6">
            <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
              #{authorData?.id}
            </div>
            <div className="text truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:text-sm">
              {authorData?.wallet_key}
            </div>
            <div
              title="Copy Address"
              className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              onClick={() => handleCopyToClipboard()}
            >
              {copyButtonStatus ? (
                <Check className="h-auto w-3.5 text-green-500" />
              ) : (
                <Copy className="h-auto w-3.5" />
              )}
            </div>
          </div>
        </div>
        {/* <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 md:justify-start ltr:md:text-left rtl:md:text-right xl:mt-12 xl:gap-8 xl:py-6"> */}
        {/* <div>
            <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
              {authorData?.following}
            </div>
            <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              Following
            </div>
          </div> */}
        {/* <div> */}
        {/* <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
              {authorData?.followers}
            </div> */}
        {/* <div className="text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              Followers
            </div> */}
        {/* </div> */}
        {/* <Button
            color="white"
            className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
          >
            Follow
          </Button> */}
        {/* </div> */}
        {/* <div className="border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 ltr:md:text-left rtl:md:text-right xl:py-6"> */}
        {/* <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
            Followed by
          </div> */}
        {/* <div className="flex justify-center md:justify-start">
            {authorData?.followed_by?.map((item) => (
              <AnchorLink
                key={`author-key-${item?.id}`}
                href="/"
                className="-ml-2 first:ml-0"
              >
                <Avatar
                  size="sm"
                  image={item?.avatar?.thumbnail}
                  alt="Author"
                  height={28}
                  width={28}
                  className="dark:border-gray-500"
                />
              </AnchorLink>
            ))}
          </div> */}
        {/* <div className="mt-4">
            <AnchorLink
              href="#"
              className="text-sm tracking-tighter text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              View All
            </AnchorLink>
          </div>
        </div> */}
        {/* <AuthorInformation className="hidden md:block" data={authorData} /> */}
      </div>
      <div className=" w-full flex-row">      <div className="profile-section p-1 text-white rounded-lg w-full">
        <div className="profile-header flex items-center ">
          <div className="w-full">
            <div className="profile-link mt-2 p-4 bg-[#406aff] bg-opacity-60 rounded-xl">
              <h4 className="mb-6">Personal link</h4>
              <a href="https://RonX.io/b/pyffvf" target="_blank" rel="noopener noreferrer" className="text-white hover:underline text-2xl">
                Link:
              </a>
            </div>

          </div>
        </div>


      </div>

        <div className="profile-section p-1 text-white rounded-lg w-full">
          <div className="profile-header flex items-center ">
            <div className="w-full">
              <div className="profile-link mt-2 p-4 h-24  bg-opacity-60 rounded-xl" style={{
                backgroundImage: `url(${userBanner.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '15vh', // Adjust the height as needed
                backgroundRepeat: 'no-repeat',
              }}>
                <div className='flex gap-6 ml-12'>
                <h4 className="  mt-6 text-xl align-middle">Ronx Token</h4>
                <a href="https://RonX.io/b/pyffvf" target="_blank" rel="noopener noreferrer" className="text-white  mt-6">
                 Login in RonX
                </a>
                </div>
              </div>

            </div>
          </div>


        </div>

      </div>

      <AuthorInformation data={authorData} />
    </div>
  );
}