import { FunctionComponent } from "react";
import TradeCard from "../components/TradeCard";
import "./ViewTradesForm.css";

const ViewTradesForm: FunctionComponent = () => {
  return (
    <div className="viewtradesform">
      <div className="view-trades-wrapper">
        <div className="view-trades">View Trades</div>
      </div>
      <TradeCard
        tradeStatus="Open"
        biding="BTC"
        offering="tether/USDT"
        time="12/29/2022 10:25:37 AM"
        price="10,323"
        amount="1113.2"
        bidingImg="../asserts/icbaselinegeneratingtokens.svg"
        offeringImg="../asserts/carbonuserservicedesk.svg"
      />
    </div>
  );
};

export default ViewTradesForm;
