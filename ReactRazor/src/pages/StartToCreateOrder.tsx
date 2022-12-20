import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CatalogSelection from "../components/CatalogSelection";
import "./StartToCreateOrder.css";

const StartToCreateOrder: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/selecttokenfororder");
  }, [navigate]);

  const onTokenAction = (act:string | undefined, tok:string | undefined) => {
    //alert(`act is ${act} and token is ${tok}`);
  };

  return (
    <div className="starttocreateorder">
      <div className="chose-the-catalog">Chose the catalog</div>
      <div className="catalog-section">
        <CatalogSelection iWantTo="I want to sell:" tokenActionClicked={onTokenAction}/>
        <div className="line-div" />
        <CatalogSelection iWantTo="I want to get:" tokenActionClicked={onTokenAction}/>
      </div>
      <button
        className="prepare-sell-order-button15"
        onClick={onPrepareSellOrderButtonClick}
      >
        <div className="primary-button3">Next</div>
      </button>
    </div>
  );
};

export default StartToCreateOrder;
