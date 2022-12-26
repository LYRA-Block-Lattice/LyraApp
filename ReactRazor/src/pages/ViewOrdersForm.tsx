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
          className="prepare-sell-order-button"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="utility-button">New</div>
        </button>
      </div>
      <div className="ordercard">
        <div className="great-nft">Great NFT</div>
        <div className="fiat-usd">Fiat USD</div>
        <div className="open">Open</div>
        <div className="div">$300</div>
        <div className="selling">Selling</div>
        <div className="biding">Biding</div>
        <div className="status">Status</div>
        <div className="price">Price</div>
      </div>
      <div className="ordercard">
        <div className="great-nft">Great NFT</div>
        <div className="fiat-usd">Fiat USD</div>
        <div className="open">Open</div>
        <div className="div">$300</div>
        <div className="selling">Selling</div>
        <div className="biding">Biding</div>
        <div className="status">Status</div>
        <div className="price">Price</div>
      </div>
      <div className="ordercard">
        <div className="great-nft">Great NFT</div>
        <div className="fiat-usd">Fiat USD</div>
        <div className="open">Open</div>
        <div className="div">$300</div>
        <div className="selling">Selling</div>
        <div className="biding">Biding</div>
        <div className="status">Status</div>
        <div className="price">Price</div>
      </div>
    </div>
  );
};

export default ViewOrdersForm;
