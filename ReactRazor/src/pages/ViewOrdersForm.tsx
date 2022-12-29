import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrdersForm.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

interface IOrder {
  hash: string;
  status: string;
  offering: string;
  biding: string;
  price: number;
  amount: number;
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
              <div className="btc">Price: {order.price}</div>
              <div className="btc">Amount: {order.amount}</div>
            </div>
          </div>
          <div className="table-details-section">
            <div className="row">
              <div className="cell">
                <div className="content">
                  <div className="text">Buyer</div>
                </div>
              </div>
              <div className="cell1">
                <div className="content1">
                  <div className="text1">Amount</div>
                </div>
              </div>
              <div className="cell">
                <div className="content">
                  <div className="text">Time</div>
                </div>
              </div>
              <div className="cell">
                <div className="content1">
                  <div className="text1">Status</div>
                </div>
              </div>
              <div className="cell">
                <div className="content1">
                  <div className="text1">Action</div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="buyer-name-cell">
                <div className="content1">
                  <div className="text5">someone</div>
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content1">
                  <div className="text6">1.0</div>
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content7">
                  <div className="text5">3 hours ago</div>
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content1">
                  <div className="text5">Pending</div>
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content1">
                  <div className="text9" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="buyer-name-cell">
                <div className="content10">
                  <div className="text6" />
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content10">
                  <div className="text6" />
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content10">
                  <div className="text6" />
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content10">
                  <div className="text6" />
                </div>
              </div>
              <div className="buyer-name-cell">
                <div className="content10">
                  <div className="text6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrdersForm;
