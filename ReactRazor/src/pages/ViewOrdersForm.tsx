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
          <div className="great-nft3">{order.offering}</div>
          <div className="fiat-usd3">{order.biding}</div>
          <div className="open3">{order.status}</div>
          <div className="div12">{order.price}</div>
          <div className="selling3">Selling</div>
          <div className="biding3">Biding</div>
          <div className="status3">Status</div>
          <div className="price3">Price</div>
        </div>
      ))}
    </div>
  );
};

export default ViewOrdersForm;
