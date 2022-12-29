import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrdersForm.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

interface IOrder {
  time: string;
  hash: string;
  hash2: string;
  status: string;
  offering: string;
  biding: string;
  price: number;
  amount: number;
  limitmin: number;
  limitmax: number;
}

const ViewOrdersForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    window.lyraProxy.invokeMethodAsync("GetOrders")
      .then(function (resp) {
        var ret = JSON.parse(resp);
        setOrders(ret.orders);
      })
  }, []);

  function truncate(str, n) {
    return (str.length > n) ? str.slice(0, n - 1) + '...' : str;
  };

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
      {orders.map((order) =>
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
                  <b className="open3">{order.status}</b>
                </div>
              </div>
            </button>
            <div className="frame-parent">
              <div className="btc-parent">
                <b className="btc">{order.offering}</b>
                <img
                  className="frame-child"
                  alt=""
                  src="_content/ReactRazor/asserts/arrow-2.svg"
                />
                <b className="tetherusdt">{order.biding}</b>
              </div>
              <div className="group-parent">
                <div className="frame-group">
                  <div className="price-1323-wrapper">
                    <div className="btc">Price: {order.price}</div>
                  </div>
                  <div className="limit-min-1323-wrapper">
                    <div className="btc">Limit Min: {order.limitmin}</div>
                  </div>
                </div>
                <div className="frame-container">
                  <div className="price-1323-wrapper">
                    <div className="btc">Amount: {order.amount}</div>
                  </div>
                  <div className="limit-min-1323-wrapper">
                    <div className="btc">Limit Max: {order.limitmax}</div>
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
              <div className="btc">Time: {order.time}</div>
            </div>
            <div className="hash-38ae3ef3-wrapper">
              <div className="btc">Hash: {order.hash2}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrdersForm;
