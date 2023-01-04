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
    <div className="ordercard2">
      <div className="order-brief-section2">
        <button className="banner-image2">
          <div className="order-banner2">
            <button className="order-image2">
              <img
                className="icbaseline-generating-tokens-icon3"
                alt=""
                src={bidingImg}
              />
              <img
                className="order-image-inner"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon3"
                alt=""
                src={offeringImg}
              />
            </button>
            <div className="order-status2">
              <b className="open2">{tradeStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section2">
          <div className="trade-parent">
            <b className="trade">Trade</b>
            <b className="trade">{biding}</b>
            <img className="frame-inner" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt2">{offering}</b>
          </div>
          <div className="title-section-inner" />
          <div className="am-frame">
            <div className="trade">{time}</div>
          </div>
          <div className="details-section2">
            <div className="block12">
              <div className="trade">Price</div>
            </div>
            <div className="block22">
              <div className="trade">{price}</div>
            </div>
            <div className="details-section-inner" />
            <div className="block32">
              <div className="trade">Amount</div>
            </div>
            <div className="block22">
              <div className="trade">{amount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section2">
        <div className="width-controller2" />
      </div>
    </div>
  );
};

export default TradeCard;
