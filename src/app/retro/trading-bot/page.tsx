// import trading chartData
import { candlesDataTwo, volumeData } from '@/data/static/trading-data';

// import BotFilterTab from '@/components/trading-bot/bot-filter-tab';
// import CoinBar from '@/components/trading-bot/coin-bar';
import CoinList from '@/components/trading-bot/coin-list';
// import InvestForm from '@/components/trading-bot/invest-form';
// import TradingChart from '@/components/trading-bot/trading-chart';
// import InvestmentTab from '@/components/trading-bot/investment-tab';

export default function TradingBot() {
  return (
    <>
   
   
      <div className="mt-4 grid grid-cols-12 gap-6 @container">
        <div className="
      order-3 col-span-full
      @4xl:col-span-12 @4xl:order-3
      @7xl:col-span-12 @7xl:order-3
      @[107.5rem]:order-1 @[107.5rem]:col-span-12
    ">
          <CoinList />
        </div>
      </div>

    </>
  );
}
