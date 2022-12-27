import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectOfferingAndBiding.css";

const SelectOfferingAndBiding: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/selecttokennameform");
  }, [navigate]);

  const onPrepareSellOrderButton1Click = useCallback(() => {
    navigate("/createtokenform");
  }, [navigate]);

  const onPrepareSellOrderButton2Click = useCallback(() => {
    navigate("/selecttokennameform");
  }, [navigate]);

  const onPrepareSellOrderButton3Click = useCallback(() => {
    navigate("/createtokenform");
  }, [navigate]);

  const onPrepareSellOrderButton4Click = useCallback(() => {
    navigate("/priceandcollateralform");
  }, [navigate]);

  return (
    <div className="selectofferingandbiding">
      <div className="i-want-to-sell-token-parent">
        <div className="i-want-to-sell-token">I want to sell [Token]:</div>
        <button
          className="prepare-sell-order-button23"
          onClick={onPrepareSellOrderButtonClick}
        >
          <div className="secondary-button11">Secondary Button</div>
        </button>
        <div className="or1">or</div>
        <button
          className="prepare-sell-order-button23"
          onClick={onPrepareSellOrderButton1Click}
        >
          <div className="secondary-button11">Secondary Button</div>
        </button>
      </div>
      <div className="buyer-should-pay-me-by-parent">
        <div className="buyer-should-pay-me-by">Buyer should pay me by:</div>
        <button
          className="prepare-sell-order-button23"
          onClick={onPrepareSellOrderButton2Click}
        >
          <div className="secondary-button11">Secondary Button</div>
        </button>
        <div className="or1">or</div>
        <button
          className="prepare-sell-order-button23"
          onClick={onPrepareSellOrderButton3Click}
        >
          <div className="secondary-button11">Secondary Button</div>
        </button>
      </div>
      <button
        className="prepare-sell-order-button27"
        onClick={onPrepareSellOrderButton4Click}
      >
        <div className="primary-button12">Next</div>
      </button>
    </div>
  );
};

export default SelectOfferingAndBiding;
