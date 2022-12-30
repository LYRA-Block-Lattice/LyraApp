import { FunctionComponent } from "react";
import "./ViewTradesForm.css";

const ViewTradesForm: FunctionComponent = () => {
  return (
    <div className="viewtradesform">
      <div className="view-trades-wrapper">
        <div className="view-trades">View Trades</div>
      </div>
      <div className="ordercard">
        <div className="order-brief-section">
          <button className="banner-image">
            <div className="order-banner">
              <button className="order-image">
                <img
                  className="icbaseline-generating-tokens-icon"
                  alt=""
                  src="../asserts/icbaselinegeneratingtokens.svg"
                />
                <img
                  className="order-image-child"
                  alt=""
                  src="../asserts/arrow-1.svg"
                />
                <img
                  className="icbaseline-generating-tokens-icon"
                  alt=""
                  src="../asserts/carbonuserservicedesk.svg"
                />
              </button>
              <div className="order-status">
                <b className="open">Open</b>
              </div>
            </div>
          </button>
          <div className="title-section">
            <div className="trade-parent">
              <b className="trade">Trade</b>
              <b className="trade">BTC</b>
              <img
                className="frame-child"
                alt=""
                src="../asserts/arrow-2.svg"
              />
              <b className="tetherusdt">tether/USDT</b>
            </div>
            <div className="title-section-child" />
            <div className="am-wrapper">
              <div className="trade">12/29/2022 10:25:37 AM</div>
            </div>
            <div className="details-section">
              <div className="block1">
                <div className="trade">Price</div>
              </div>
              <div className="block2">
                <div className="trade">10,323</div>
              </div>
              <div className="details-section-child" />
              <div className="block3">
                <div className="trade">Amount</div>
              </div>
              <div className="block2">
                <div className="trade">1113.2</div>
              </div>
            </div>
          </div>
        </div>
        <div className="trades-section">
          <div className="width-controller" />
        </div>
      </div>
    </div>
  );
};

export default ViewTradesForm;
