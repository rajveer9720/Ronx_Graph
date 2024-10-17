import routes from '@/config/routes';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { LivePricing } from '@/components/icons/live-pricing';
import { LockIcon } from '@/components/icons/lock-icon';
import { TradingBotIcon } from '@/components/icons/trading-bot-icon';

export const defaultMenuItems = [
  {
    name: 'Home',
    icon: <HomeIcon />,
    href: routes.home,
  },
  {
    name: 'Team',
    icon: <LivePricing />,
    href: routes.livePricing,
    dropdownItems: [
      {
        name: 'Partners',
        icon: <CompassIcon />,
        href: routes.Parteners,
      },
      // {
      //   name: 'Links',
      //   icon: <PlusCircle />,
      //   href: routes.Links,
      // },
      {
        name: 'Stats',
        icon: <DiskIcon />,
        href: routes.Stats,
      },
      
    ],
  },
  // {
  //   name: 'Programs',
  //   icon: <TradingBotIcon />,
  //   href: routes.tradingBot,
  // },
  // {
  //   name: 'Marathon',
  //   icon: <TradingBotIcon />,
  //   href: routes.Marathon,
  // },
  // {
  //   name: 'Social',
  //   icon: <TradingBotIcon />,
  //   href: routes.Social,
  // },

  {
    name: 'NFTS',
    icon: <TradingBotIcon />,
    href: routes.NFTS,
  },
  // {
  //   name: 'NFTs',
  //   icon: <CompassIcon />,
  //   href: routes.search,
  //   dropdownItems: [
  //     {
  //       name: 'Explore NFTs',
  //       icon: <CompassIcon />,
  //       href: routes.search,
  //     },
  //     {
  //       name: 'Create NFT',
  //       icon: <PlusCircle />,
  //       href: routes.createNft,
  //     },
  //     {
  //       name: 'NFT Details',
  //       icon: <DiskIcon />,
  //       href: routes.nftDetails,
  //     },
      
  //   ],
  // },
  {
    name: 'Information',
    icon: <CompassIcon />,
    href: routes.search,
    dropdownItems: [
      {
        name: 'Instruction',
        icon: <CompassIcon />,
        href: routes.Instruction,
      },
      {
        name: 'Calculator',
        icon: <PlusCircle />,
        href: routes.Calculator,
      },
      {
        name: 'smart tools',
        icon: <DiskIcon />,
        href: routes.SmartTool,
      },
      {
        name: 'ideas',
        icon: <DiskIcon />,
        href: routes.Ideas,
      },
      
    ],
  },

  // {
  //   name: 'Farm',
  //   icon: <FarmIcon />,
  //   href: routes.farms,
  // },
  // {
  //   name: 'Swap',
  //   icon: <ExchangeIcon />,
  //   href: routes.swap,
  // },
  // {
  //   name: 'Liquidity',
  //   icon: <PoolIcon />,
  //   href: routes.liquidity,
  // },
  // {
  //   name: 'Profile',
  //   icon: <ProfileIcon />,
  //   href: routes.profile,
  // },
  // {
  //   name: 'Vote',
  //   icon: <VoteIcon />,
  //   href: routes.vote,
  //   dropdownItems: [
  //     {
  //       name: 'Explore',
  //       href: routes.vote,
  //     },
  //     {
  //       name: 'Vote with criptic',
  //       href: routes.proposals,
  //     },
  //     {
  //       name: 'Create proposal',
  //       href: routes.createProposal,
  //     },
  //   ],
  // },
  // {
  //   name: 'Authentication',
  //   icon: <LockIcon className="w-[18px]" />,
  //   href: routes.signIn,
  //   dropdownItems: [
  //     {
  //       name: 'Sign in',
  //       href: routes.signIn,
  //     },
  //     {
  //       name: 'Sign up',
  //       href: routes.signUp,
  //     },
  //     {
  //       name: 'Reset pin',
  //       href: routes.resetPin,
  //     },
  //     {
  //       name: 'Forget password',
  //       href: routes.forgetPassword,
  //     },
  //   ],
  // },
  {
    name: 'Promo&PDFS',
    icon: <TradingBotIcon />,
    href: routes.PromoPDFS,
  },
];

export const MinimalMenuItems = [
  // {
  //   name: 'Home',
  //   icon: <HomeIcon />,
  //   href: routes.home,
  // },
  // {
  //   name: 'Team',
  //   icon: <LivePricing />,
  //   href: routes.livePricing,
  //   dropdownItems: [
  //     {
  //       name: 'Partners',
  //       icon: <CompassIcon />,
  //       href: routes.Parteners,
  //     },
  //     {
  //       name: 'Links',
  //       icon: <PlusCircle />,
  //       href: routes.createNft,
  //     },
  //     {
  //       name: 'Stats',
  //       icon: <DiskIcon />,
  //       href: routes.Stats,
  //     },
      
  //   ],
  // },
  // {
  //   name: 'Programs',
  //   icon: <TradingBotIcon />,
  //   href: routes.tradingBot,
  // },
  // {
  //   name: 'Marathon',
  //   icon: <TradingBotIcon />,
  //   href: routes.Non,
  // },
  // {
  //   name: 'Social',
  //   icon: <TradingBotIcon />,
  //   href: routes.Non,
  // },
  // {
  //   name: 'NFTs',
  //   icon: <CompassIcon />,
  //   href: routes.search,
  //   dropdownItems: [
  //     {
  //       name: 'Explore NFTs',
  //       icon: <CompassIcon />,
  //       href: routes.search,
  //     },
  //     {
  //       name: 'Create NFT',
  //       icon: <PlusCircle />,
  //       href: routes.createNft,
  //     },
  //     {
  //       name: 'NFT Details',
  //       icon: <DiskIcon />,
  //       href: routes.nftDetails,
  //     },
      
  //   ],
  // },
 
  // {
  //   name: 'Authentication',
  //   icon: <LockIcon className="w-[18px]" />,
  //   href: routes.signIn,
  //   dropdownItems: [
  //     {
  //       name: 'Sign in',
  //       href: routes.signIn,
  //     },
  //     {
  //       name: 'Sign up',
  //       href: routes.signUp,
  //     },
  //     {
  //       name: 'Reset pin',
  //       href: routes.resetPin,
  //     },
  //     {
  //       name: 'Forget password',
  //       href: routes.forgetPassword,
  //     },
  //   ],
  // },
  // {
  //   name: 'Promo&PDFS',
  //   icon: <TradingBotIcon />,
  //   href: routes.Non,
  // },
];