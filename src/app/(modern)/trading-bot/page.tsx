// import trading chartData
import { candlesDataTwo, volumeData } from '@/data/static/trading-data';

import MinimalLayout from '@/layouts/minimal/layout';
import BotFilterTab from '@/components/trading-bot/bot-filter-tab';
import CoinBar from '@/components/trading-bot/coin-bar';
import CoinList from '@/components/trading-bot/coin-list';
import InvestForm from '@/components/trading-bot/invest-form';
import TradingChart from '@/components/trading-bot/trading-chart';
import InvestmentTab from '@/components/trading-bot/investment-tab';

export default function TradingBot() {
  return (
    <>
      {/* <BotFilterTab /> */}
      {/* <CoinBar /> */}
      <div className="mt-4 grid grid-cols-12 gap-6">
  <div className="col-span-12">
    <CoinList />
  </div>
</div>

      {/* <InvestmentTab /> */}
    </>
  );
}
