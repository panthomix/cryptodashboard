import ExchangeTable from "./ExchangeTable";
import { CurrencyEnum } from "@/app/store/services/constants";
import { useAppSelector } from "@/app/store/hooks";

export default function HistoricalValues() {
  const { historicalBTC, historicalETH } = useAppSelector(
    (state) => state.dashboard
  );

  return (
    <div className="flex gap-x-20 w-full pl-10">
      <ExchangeTable
        id="BTC"
        title="Bitcoin - BTC"
        data={historicalBTC}
        keys={[CurrencyEnum.USD, CurrencyEnum.EUR]}
      />
      <ExchangeTable
        id="ETH"
        title="Etherium - ETH"
        data={historicalETH}
        keys={[CurrencyEnum.USD, CurrencyEnum.EUR, CurrencyEnum.BTC]}
      />
    </div>
  );
}
