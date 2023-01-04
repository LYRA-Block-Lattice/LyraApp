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
    <div className="ordercard1">
      <div className="order-brief-section1">
        <button className="banner-image1">
          <div className="order-banner1">
            <button className="order-image1">
              <img
                className="icbaseline-generating-tokens-icon2"
                alt=""
                src={bidingImg}
              />
              <img
                className="order-image-item"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon2"
                alt=""
                src={offeringImg}
              />
            </button>
            <div className="order-status1">
              <b className="open1">{tradeStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section1">
          <div className="trade-parent">
            <b className="trade">Trade</b>
            <b className="trade">{biding}</b>
            <img className="frame-item" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt1">{offering}</b>
          </div>
          <div className="title-section-item" />
          <div className="am-container">
            <div className="trade">{time}</div>
          </div>
          <div className="details-section1">
            <div className="block11">
              <div className="trade">Price</div>
            </div>
            <div className="block21">
              <div className="trade">{price}</div>
            </div>
            <div className="details-section-item" />
            <div className="block31">
              <div className="trade">Amount</div>
            </div>
            <div className="block21">
              <div className="trade">{amount}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section1">
        <div className="width-controller1" />
      </div>
    </div>
  );
};

export default TradeCard;
