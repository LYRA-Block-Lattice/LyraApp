import { FunctionComponent, useState, useCallback } from "react";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import "./CreateTOTForm.css";

const CreateTOTForm: FunctionComponent = () => {
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
      <div className="create-tot-form">
        <form className="createtottosellform">
          <div className="create-and-sell-totsku">
            Create and Sell [TOT/SKU]
          </div>
          <select className="selecttypeoftot">
            <option value="sku">Goods</option>
            <option value="svc">Service</option>
            <option value="tot">Generic Trade only TOken</option>
          </select>
          <input className="tot-name" type="text" placeholder="TOT Name" />
          <input
            className="tot-description"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <input
            className="tot-name"
            type="number"
            placeholder="Total Supply"
          />
          <button
            className="prepare-sell-order-button2"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button3">
            <div className="secondary-button2">Create TOT</div>
          </button>
        </form>
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

export default CreateTOTForm;
