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
        <div className="ordercard" key={order.hash}>
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
          <div className="a-big-seller">{order.offering}</div>
          <div className="price">Price:</div>
          <div className="amount">Amount:</div>
          <div className="a-big-buyer">{order.biding}</div>
          <div className="pricelabel">{order.price}</div>
          <div className="amountlabel">{order.amount}</div>
          <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
        </div>
      )}

    </div>
  );
};

export default ViewOrdersForm;
