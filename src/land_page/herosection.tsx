'use client';

import { ArrowUp } from '@/components/icons/arrow-up';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import cn from 'classnames';
import { priceFeedData } from '@/data/static/price-feed';

type Price = {
  name: number;
  value: number;
};

type HeroSectionProps = {
  id: string;
  name: string;
  symbol: string;
  icon: React.ReactElement;
  balance: string;
  usdBalance: string;
  change: string;
  isChangePositive: boolean;
  isBorder?: boolean;
  prices: Price[];
  imageURL: string; // HTTP image link
};

export function HeroSection({
  id,
  name,
  symbol,
  icon,
  balance,
  usdBalance,
  change,
  isChangePositive,
  prices,
  imageURL,
}: HeroSectionProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg bg-white p-5 shadow-[0_8px_16px_rgba(17,24,39,0.05)] dark:bg-light-dark lg:flex-row',
      )}
    >
      <div className="w-full flex-col">
        <div className="mb-3 flex items-center">
          {icon}
          <h4 className="text-sm font-medium text-gray-900 ltr:ml-3 rtl:mr-3 dark:text-white">
            {name}
            Testings
          </h4>
        </div>

        <div className="mb-2 text-sm font-medium tracking-tighter text-gray-900 dark:text-white lg:text-lg 2xl:text-xl 3xl:text-2xl">
          {balance}
          <span className="ml-3">{symbol}</span>
        </div>

        <div className="flex items-center text-xs font-medium 2xl:text-sm">
          <span
            className="truncate tracking-tighter text-gray-600 ltr:mr-5 rtl:ml-5 dark:text-gray-400 2xl:w-24 3xl:w-auto"
            title={`${usdBalance} USD`}
          >
            {usdBalance} USD
          </span>

          <span
            className={`flex items-center  ${
              isChangePositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <span
              className={`ltr:mr-2 rtl:ml-2 ${
                !isChangePositive ? 'rotate-180' : ''
              }`}
            >
              <ArrowUp />
            </span>
            {change}
          </span>
        </div>
      </div>

      
    </div>
  );
}

export default function HeroSlider({ limits }: { limits: number }) {
  const breakpoint = useBreakpoint();

  const limit = limits ?? 4;

  const sliderBreakPoints = {
    480: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1600: {
      slidesPerView: limit,
      spaceBetween: 24,
    },
  };

  return (
    <Swiper
      modules={[Pagination, A11y]}
      spaceBetween={24}
      slidesPerView={1}
      breakpoints={sliderBreakPoints}
      pagination={{ clickable: true }}
      observer={true}
      dir="ltr"
      className="w-full pb-10"
    >
      {priceFeedData.map((item) => (
        <SwiperSlide key={item.id}>
          <HeroSection {...item} imageURL={item.imageURL} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
