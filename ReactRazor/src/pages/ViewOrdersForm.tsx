import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import OrderCard from "../components/OrderCard";
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
          className="prepare-sell-order-button11"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="utility-button5">New</div>
        </button>
      </div>
      <OrderCard
        offering="BTC"
        biding="tether/USDT"
        orderStatus="Open"
        offeringImg="../asserts/icbaselinegeneratingtokens.svg"
        bidingImg="../asserts/carbonuserservicedesk.svg"
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
