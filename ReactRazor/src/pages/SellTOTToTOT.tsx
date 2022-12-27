import { FunctionComponent, useState, useCallback } from "react";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./SellTOTToTOT.css";

const SellTOTToTOT: FunctionComponent = () => {
  const [isSignTradeSecretPopupOpen, setSignTradeSecretPopupOpen] =
    useState(false);
  const [isSignTradeSecretPopup1Open, setSignTradeSecretPopup1Open] =
    useState(false);
  const navigate = useNavigate();

  const openSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(true);
  }, []);

  const closeSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(false);
  }, []);

  const openSignTradeSecretPopup1 = useCallback(() => {
    setSignTradeSecretPopup1Open(true);
  }, []);

  const closeSignTradeSecretPopup1 = useCallback(() => {
    setSignTradeSecretPopup1Open(false);
  }, []);

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <>
      <div className="selltottotot">
        <form className="createtottosellform">
          <div className="create-and-sell-totsku">
            Create and Sell [TOT/SKU]
          </div>
          <select className="selecttypeoftot">
            <option value="sku">Goods</option>
            <option value="svc">Service</option>
            <option value="tot">Generic Trade only TOken</option>
          </select>
          <input className="tot-supply" type="text" placeholder="TOT Name" />
          <input
            className="tot-description2"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <input
            className="tot-supply"
            type="number"
            placeholder="Total Supply"
          />
          <button
            className="prepare-sell-order-button4"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button2">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec2">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button5">
            <div className="secondary-button2">Create TOT</div>
          </button>
        </form>
        <form className="createtottosellform">
          <div className="create-and-sell-totsku">To get [TOT/SKU/SVC]</div>
          <input className="tot-supply" type="text" placeholder="Name" />
          <input
            className="tot-description2"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <button
            className="prepare-sell-order-button6"
            onClick={openSignTradeSecretPopup1}
          >
            <div className="utility-button2">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec2">
            Note: This [tot/sku/svc] share the same trade secret of selling
            item.
          </div>
          <button className="prepare-sell-order-button5">
            <div className="secondary-button2">Create TOT</div>
          </button>
        </form>
        <div className="priceandcollateralform4">
          <div className="price-and-collateral4">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo4">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-supply"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo4">Count:</div>
          <input
            className="tot-supply"
            type="number"
            placeholder="Count of the selling token"
          />
          <div className="set-the-price-1-offering-fo4">
            Collateral (in LYR):
          </div>
          <input
            className="tot-supply"
            type="number"
            placeholder="Collateral in LYR to guard the trade"
          />
          <div className="set-the-price-1-offering-fo4">
            Collateral worth in USD: $103
          </div>
          <button className="reviewtheorder4" onClick={onReviewTheOrderClick}>
            <div className="primary-button4">Review the Order</div>
          </button>
        </div>
      </div>
      {isSignTradeSecretPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignTradeSecretPopup}
        >
          <SignTradeSecretPopup onClose={closeSignTradeSecretPopup} />
        </PortalPopup>
      )}
      {isSignTradeSecretPopup1Open && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignTradeSecretPopup1}
        >
          <SignTradeSecretPopup onClose={closeSignTradeSecretPopup1} />
        </PortalPopup>
      )}
    </>
  );
};

export default SellTOTToTOT;
