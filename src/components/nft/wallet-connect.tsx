'use client';

import { useWeb3Modal } from '@web3modal/react';
import { useWallet } from '@/app/context/WalletContext';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';

export default function WalletConnect() {
  const { walletAddress, balance, networkId, disconnect, isConnected } = useWallet();
  const { open } = useWeb3Modal();

  const getNetworkName = (networkId: number | null) => {
    switch (networkId) {
      case 1:
        return 'Ethereum Mainnet';
      case 56:
        return 'BSC Mainnet';
      case 97:
        return 'BSC Testnet';
      default:
        return 'Unknown Network';
    }
  };

  return (
    <>
      {isConnected && walletAddress ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <Menu>
              <Menu.Button className="block h-10 w-10 overflow-hidden rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12" />
              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute -right-20 mt-3 w-72 origin-top-right rounded-lg bg-white shadow-large dark:bg-gray-900 sm:-right-14">
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-3 dark:border-gray-700">
                      <ActiveLink
                        href="/profile"
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                      >
                        <span className="h-8 w-8 rounded-full border-2 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:border-gray-700"></span>
                        <span className="grow uppercase">View Your Profile</span>
                        <ChevronForward />
                      </ActiveLink>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 px-6 py-5 dark:border-gray-700">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Address
                        </span>
                        <span className="text-sm rounded-lg bg-gray-100 px-2 py-1 dark:bg-gray-800">
                          {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                        </span>
                      </div>
                      <div className="mt-3 text-gray-900 dark:text-white">
                        Balance: {balance ?? 'Loading...'}
                      </div>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        Network: {getNetworkName(networkId)}
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item>
                    <div className="p-3">
                      <div
                        className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-800"
                        onClick={disconnect}
                      >
                        <PowerIcon />
                        <span className="grow uppercase">Disconnect</span>
                      </div>
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <ActiveLink href="/create-nft">
            <Button className={cn('shadow-main hover:shadow-large')}>CREATE</Button>
          </ActiveLink>
        </div>
      ) : (
        <Button onClick={open} className={cn('shadow-main hover:shadow-large')}>
          CONNECT
        </Button>
      )}
    </>
  );
}
