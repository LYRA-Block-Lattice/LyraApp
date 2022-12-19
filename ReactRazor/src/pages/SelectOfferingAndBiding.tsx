import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectOfferingAndBiding.css";

const SelectOfferingAndBiding: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSelectTokenButtonClick = useCallback(() => {
    navigate("/selecttokenform");
  }, [navigate]);

  const onMintTokenButtonClick = useCallback(() => {
    navigate("/createtokenform");
  }, [navigate]);

  const onMintTokenButton1Click = useCallback(() => {
    navigate("/createtotform");
  }, [navigate]);

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/priceandcollateralform");
  }, [navigate]);

  return (
    <div className="selectofferingandbiding">
      <div className="i-want-to-sell-token">I want to sell [Token]:</div>
      <div className="buyer-should-pay-me-by">Buyer should pay me by:</div>
      <button
        className="select-token-button"
        onClick={onSelectTokenButtonClick}
      >
        <div className="rectangle-div4" />
        <div className="select-for-sell">Select for sell</div>
      </button>
      <button className="select-token-button1">
        <div className="rectangle-div4" />
        <div className="select-payment-token">Select payment token</div>
      </button>
      <button className="mint-token-button1" onClick={onMintTokenButtonClick}>
        <div className="rectangle-div4" />
        <div className="mint-for-sell">Mint for sell</div>
      </button>
      <button className="mint-token-button2" onClick={onMintTokenButton1Click}>
        <div className="rectangle-div4" />
        <div className="specify-payment-token">Specify payment token</div>
      </button>
      <div className="or1">or</div>
      <div className="or2">or</div>
      <button
        className="prepare-sell-order-button1"
        onClick={onPrepareSellOrderButtonClick}
      >
        <b className="next-step">Next Step</b>
      </button>
    </div>
  );
};

export default SelectOfferingAndBiding;
