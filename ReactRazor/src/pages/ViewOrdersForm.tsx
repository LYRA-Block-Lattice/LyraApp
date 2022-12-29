import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrdersForm.css";

const ViewOrdersForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/starttocreateorder");
  }, [navigate]);

  return (
    <div className="viewordersform">
      <div className="view-orders-parent">
        <div className="view-orders">View Orders</div>
        <button
          className="prepare-sell-order-button12"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="utility-button6">New</div>
        </button>
      </div>
      <div className="ordercard3">
        <div className="order-brief-section">
          <button className="order-banner-wrapper">
            <div className="order-banner">
              <button className="order-image">
                <img
                  className="icbaseline-generating-tokens-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/icbaselinegeneratingtokens.svg"
                />
                <img
                  className="order-image-child"
                  alt=""
                  src="_content/ReactRazor/asserts/arrow-1.svg"
                />
                <img
                  className="icbaseline-generating-tokens-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/carbonuserservicedesk.svg"
                />
              </button>
              <div className="order-status">
                <b className="open3">Open</b>
              </div>
            </div>
          </button>
          <div className="frame-parent">
            <div className="btc-parent">
              <b className="btc">BTC</b>
              <img
                className="frame-child"
                alt=""
                src="_content/ReactRazor/asserts/arrow-2.svg"
              />
              <b className="tetherusdt">tether/USDT</b>
            </div>
            <div className="group-parent">
              <div className="frame-group">
                <div className="price-1323-wrapper">
                  <div className="btc">Price: 1,323</div>
                </div>
                <div className="limit-min-1323-wrapper">
                  <div className="btc">Limit Min: 1,323</div>
                </div>
              </div>
              <div className="frame-container">
                <div className="price-1323-wrapper">
                  <div className="btc">Amount: 3.2</div>
                </div>
                <div className="limit-min-1323-wrapper">
                  <div className="btc">Limit Max: 3.2</div>
                </div>
              </div>
              <div className="group-div">
                <div className="price-1323-wrapper">
                  <div className="btc">Sold: 3.2</div>
                </div>
                <div className="limit-min-1323-wrapper">
                  <div className="btc">Left: 3.2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="frame-parent1">
          <div className="time-12292022-102537-am-wrapper">
            <div className="btc">Time: 12/29/2022 10:25:37 AM</div>
          </div>
          <div className="hash-38ae3ef3-wrapper">
            <div className="btc">Hash: 38AE...3EF3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrdersForm;
