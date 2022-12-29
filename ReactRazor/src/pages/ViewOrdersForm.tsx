import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
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
      <OrderCard
        offering="BTC"
        biding="tether/USDT"
        orderStatus="Open"
        offeringImg="_content/ReactRazor/asserts/icbaselinegeneratingtokens.svg"
        bidingImg="_content/ReactRazor/asserts/carbonuserservicedesk.svg"
        time="12/29/2022 10:25:37 AM"
        price="10,323"
        amount="1113.2"
        limitMin="3.3"
        limitMax="4.3"
        sold="12"
        shelf="123"
        orderStatusBackgroundColor="#2196F3"
      />
    </div>
  );
};

export default ViewOrdersForm;
