'use client';

import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useWallet } from '@/app/context/WalletContext';
import cn from 'classnames';
import Button from '@/components/ui/button';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import SwapComponent from '@/components/currencySwap/currencySwap';

export default function WalletConnect() {
  const { walletAddress, balance, networkId, disconnect, isConnected } = useWallet();
  const { open } = useWeb3Modal();
  const [isSwapOpen, setIsSwapOpen] = useState(false);

  // Function to get the network name based on networkId
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
        <div className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <Menu>
              <Menu.Button className="block h-10 w-10 rounded-full border-3 border-solid border-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-main transition-all hover:-translate-y-0.5 hover:shadow-large dark:border-gray-700 sm:h-12 sm:w-12" />

              <Transition
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in duration-300"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <Menu.Items className="absolute right-0 mt-3 w-72 rounded-lg bg-white shadow-large dark:bg-gray-900">
                  {/* Swap Currency Option */}
                  <Menu.Item>
                    <div
                      onClick={() => setIsSwapOpen(true)}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <span className="grow text-gray-900 dark:text-white">Swap Currency</span>
                      <ChevronForward />
                    </div>
                  </Menu.Item>

                  {/* Wallet Info */}
                  <Menu.Item>
                    <div className="border-b border-dashed border-gray-200 p-4 dark:border-gray-700">
                      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Wallet Address</div>
                      <div className="truncate text-gray-900 dark:text-white">
                        {walletAddress}
                      </div>
                      <div className="mt-2 text-gray-900 dark:text-white">Balance: {balance ?? 'Loading...'}</div>
                      <div className="mt-1 text-gray-900 dark:text-white">
                        Network: {getNetworkName(networkId)}
                      </div>
                    </div>
                  </Menu.Item>

                  {/* Disconnect Option */}
                  <Menu.Item>
                    <div
                      onClick={disconnect}
                      className="flex cursor-pointer items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <PowerIcon />
                      <span className="grow text-gray-900 dark:text-white">Disconnect</span>
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
        <Button onClick={open} className="shadow-main hover:shadow-large">CONNECT</Button>
      )}

      {/* Swap Popup Modal */}
      {isSwapOpen && (
        <SwapComponent onClose={() => setIsSwapOpen(false)} />
      )}
    </>
  );
}
