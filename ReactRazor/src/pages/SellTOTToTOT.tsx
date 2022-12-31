import { FunctionComponent, useState, useCallback } from "react";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import PriceAndCollateralForm from "../components/PriceAndCollateralForm";
import "./SellTOTToTOT.css";

const SellTOTToTOT: FunctionComponent = () => {
  const [isSignTradeSecretPopupOpen, setSignTradeSecretPopupOpen] =
    useState(false);

  const openSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(true);
  }, []);

  const closeSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(false);
  }, []);

  return (
    <>
      <div className="selltottotot">
        <form className="togettotform1">
          <div className="to-get-totskusvc1">To get [TOT/SKU/SVC]</div>
          <input className="tot-name2" type="text" placeholder="Name" />
          <input
            className="tot-description1"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <button
            className="prepare-sell-order-button6"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button2">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec2">
            Note: This [tot/sku/svc] share the same trade secret of selling
            item.
          </div>
          <button className="prepare-sell-order-button7">
            <div className="secondary-button4">Create TOT</div>
          </button>
        </form>
        <PriceAndCollateralForm offering="offering" biding="biding" />
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
    </>
  );
};

export default SellTOTToTOT;
