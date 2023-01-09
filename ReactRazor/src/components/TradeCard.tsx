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
                className="icbaseline-generating-tokens-icon1"
                alt=""
                src={bidingImg}
              />
              <img
                className="order-image-item"
                alt=""
                src="_content/ReactRazor/asserts/arrow-12.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon1"
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
            <img className="arrow-icon" alt="" src="_content/ReactRazor/asserts/arrow-22.svg" />
            <b className="tetherusdt2">{offering}</b>
          </div>
          <div className="title-section-child" />
          <div className="am-wrapper">
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
