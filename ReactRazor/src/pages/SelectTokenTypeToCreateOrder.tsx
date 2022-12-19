import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SelectTokenTypeToCreateOrder.css";

const SelectTokenTypeToCreateOrder: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/selecttokenfororder");
  }, [navigate]);

  return (
    <div className="selecttokentypetocreateorder">
      <div className="frame-div2">
        <div className="frame-div3">
          <div className="i-want-to-sell">I want to sell:</div>
          <div className="tradecatalog">
            <button className="select-token-button2">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/materialsymbolsgeneratingtokensrounded.svg"
                />
                <b className="token">Token</b>
              </div>
            </button>
            <button className="select-nft-button">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/materialsymbolstokenrounded.svg"
                />
                <b className="nft">NFT</b>
              </div>
            </button>
            <button className="frame-button">
              <div className="frame-div6">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/phmoneylight.svg"
                />
                <b className="token">Fiat</b>
              </div>
            </button>
            <button className="frame-button1">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/lucidepackageopen.svg"
                />
                <b className="nft">Goods</b>
              </div>
            </button>
            <button className="frame-button2">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/mdiworkeroutline.svg"
                />
                <b className="token">Service</b>
              </div>
            </button>
          </div>
        </div>
        <div className="frame-div3">
          <div className="i-want-to-sell">I want to get:</div>
          <div className="tradecatalog1">
            <button className="select-token-button2">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/materialsymbolsgeneratingtokensrounded.svg"
                />
                <b className="token">Token</b>
              </div>
            </button>
            <button className="select-nft-button">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/materialsymbolstokenrounded.svg"
                />
                <b className="nft">NFT</b>
              </div>
            </button>
            <button className="frame-button">
              <div className="frame-div6">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/phmoneylight.svg"
                />
                <b className="token">Fiat</b>
              </div>
            </button>
            <button className="frame-button1">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/lucidepackageopen.svg"
                />
                <b className="nft">Goods</b>
              </div>
            </button>
            <button className="frame-button2">
              <div className="frame-div4">
                <img
                  className="material-symbolsgenerating-to-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/mdiworkeroutline.svg"
                />
                <b className="token">Service</b>
              </div>
            </button>
          </div>
        </div>
      </div>
      <button
        className="prepare-sell-order-button2"
        onClick={onPrepareSellOrderButtonClick}
      >
        <b className="prepare-tokens">Prepare Token(s)</b>
      </button>
    </div>
  );
};

export default SelectTokenTypeToCreateOrder;
