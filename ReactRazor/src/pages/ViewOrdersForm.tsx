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
        <div className="price3">Price:</div>
        <div className="amount9">Amount:</div>
        <div className="a-big-buyer">A Big Buyer</div>
        <div className="pricelabel">1,323</div>
        <div className="amountlabel">3.2</div>
        <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
      </div>
      <div className="ordercard3">
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
        <div className="price3">Price:</div>
        <div className="amount9">Amount:</div>
        <div className="a-big-buyer">A Big Buyer</div>
        <div className="pricelabel">1,323</div>
        <div className="amountlabel">3.2</div>
        <img className="ordercard-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
      </div>
    </div>
  );
};

export default ViewOrdersForm;
