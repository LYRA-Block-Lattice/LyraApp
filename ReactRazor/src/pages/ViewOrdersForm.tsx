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
          className="prepare-sell-order-button12"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="utility-button6">New</div>
        </button>
      </div>
      {orders.map((order, index) => (
        <div className="ordercard3">
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
          <div className="a-big-seller">{order.offering.replace(/(.{8})..+/, "$1...")}</div>
          <div className="price3">Price:</div>
          <div className="amount9">Amount:</div>
          <div className="a-big-buyer">{order.biding.replace(/(.{8})..+/, "$1...")}</div>
          <div className="pricelabel">{order.price}</div>
          <div className="amountlabel">{order.amount}</div>
          <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
        </div>
      ))}
    </div>
  );
};

export default ViewOrdersForm;
