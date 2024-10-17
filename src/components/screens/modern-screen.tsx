'use client';


import { useEffect, useState } from 'react';
import ComparisonChart from '@/components/ui/chats/comparison-chart';
import Avatar from '@/components/ui/avatar';
import OverviewChart from '@/components/ui/chats/overview-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import WalletCard from '@/components/ui/wallet-card';
import TransactCoin from '@/components/ui/transact-coin';
import PriceFeedSlider from '@/components/ui/live-price-feed';
import { priceFeedData } from '@/data/static/price-feed';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import ImageCarousel from '../ui/imageCarsoule';
import LandingPage from '@/components/landingpage/landingpage';
//images
import AuthorImage from '@/assets/images/author.jpg';

const topPoolsLimit = (breakpoint: string) => {
  switch (breakpoint) {
    case 'md':
      return 5;
    case '2xl':
      return 5;
    default:
      return 4;
  }
};
export default function ModernScreen() {
  const [limit, setLimit] = useState(4);
  const breakpoint = useBreakpoint();
  useEffect(() => {
    setLimit(topPoolsLimit(breakpoint));
  }, [breakpoint]);
  return (
    <>
      <LandingPage />
    </>
  );
}
