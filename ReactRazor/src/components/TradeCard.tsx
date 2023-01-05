import { FunctionComponent } from "react";
import "./TradeCard.css";

type TradeCardType = {
  tradeStatus?: string;
  biding?: string;
  offering?: string;
  time?: string;
  price?: string;
  amount?: string;
  bidingImg?: string;
  offeringImg?: string;
};

const TradeCard: FunctionComponent<TradeCardType> = ({
  tradeStatus,
  biding,
  offering,
  time,
  price,
  amount,
  bidingImg,
  offeringImg,
}) => {
  return (
    <div className="ordercard">
      <div className="order-brief-section">
        <button className="banner-image">
          <div className="order-banner">
            <button className="order-image">
              <img
                className="icbaseline-generating-tokens-icon1"
                alt=""
                src={bidingImg}
              />
              <img
                className="order-image-child"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon1"
                alt=""
                src={offeringImg}
              />
            </button>
            <div className="order-status">
              <b className="open">{tradeStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section">
          <div className="trade-parent">
            <b className="trade">Trade</b>
            <b className="trade">{biding}</b>
            <img className="frame-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt">{offering}</b>
          </div>
          <div className="title-section-child" />
          <div className="am-wrapper">
            <div className="trade">{time}</div>
          </div>
          <div className="details-section">
            <div className="block1">
              <div className="trade">Price</div>
            </div>
            <div className="block2">
              <div className="trade">{price}</div>
            </div>
            <div className="details-section-child" />
            <div className="block3">
              <div className="trade">Amount</div>
            </div>
            <div className="block2">
              <div className="trade">{amount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section">
        <div className="width-controller" />
      </div>
    </div>
  );
};

export default TradeCard;
