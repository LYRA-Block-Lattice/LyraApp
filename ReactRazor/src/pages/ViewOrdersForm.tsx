import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ViewOrdersForm.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

interface IOrder {
  status: string;
  offering: string;
  biding: string;
  price: number;
  amount: number;
}

const ViewOrdersForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<IOrder[]>([]);

  async function getOrders() {
    let t = await window.lyraProxy.invokeMethodAsync("GetOrders");
    var ret = JSON.parse(t);
    setOrders(ret.orders);
  }

  useEffect(() => {
    getOrders();
  }, [orders]);

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/starttocreateorder");
  }, [navigate]);

  return (
    <div className="viewordersform">
      <div className="view-orders-parent">
        <div className="view-orders">View Orders</div>
        <button
          className="prepare-sell-order-button"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="utility-button">New</div>
        </button>
      </div>
      <div className="ordercard">
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
        <div className="a-big-seller">A Big Seller</div>
        <div className="price">Price:</div>
        <div className="amount">Amount:</div>
        <div className="a-big-buyer">A Big Buyer</div>
        <div className="pricelabel">1,323</div>
        <div className="amountlabel">3.2</div>
        <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
      </div>
      <div className="ordercard">
        <button className="order-image">
          <img
            className="icbaseline-generating-tokens-icon"
            alt=""
            src="_content/ReactRazor/asserts/icbaselinegeneratingtokens1.svg"
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
        <div className="a-big-seller">A Big Seller</div>
        <div className="price">Price:</div>
        <div className="amount">Amount:</div>
        <div className="a-big-buyer">A Big Buyer</div>
        <div className="pricelabel">1,323</div>
        <div className="amountlabel">3.2</div>
        <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
      </div>
    </div>
  );
};

export default ViewOrdersForm;
