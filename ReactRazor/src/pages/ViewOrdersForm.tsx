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
        <div className="great-nft3">Great NFT</div>
        <div className="fiat-usd3">Fiat USD</div>
        <div className="open3">Open</div>
        <div className="div3">$300</div>
        <div className="selling3">Selling</div>
        <div className="biding3">Biding</div>
        <div className="status3">Status</div>
        <div className="price3">Price</div>
      </div>
      <div className="ordercard3">
        <div className="great-nft3">Great NFT</div>
        <div className="fiat-usd3">Fiat USD</div>
        <div className="open3">Open</div>
        <div className="div3">$300</div>
        <div className="selling3">Selling</div>
        <div className="biding3">Biding</div>
        <div className="status3">Status</div>
        <div className="price3">Price</div>
      </div>
      <div className="ordercard3">
        <div className="great-nft3">Great NFT</div>
        <div className="fiat-usd3">Fiat USD</div>
        <div className="open3">Open</div>
        <div className="div3">$300</div>
        <div className="selling3">Selling</div>
        <div className="biding3">Biding</div>
        <div className="status3">Status</div>
        <div className="price3">Price</div>
      </div>
    </div>
  );
};

export default ViewOrdersForm;
