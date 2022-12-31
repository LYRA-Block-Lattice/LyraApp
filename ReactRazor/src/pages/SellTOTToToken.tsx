import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import PriceAndCollateralForm from "../components/PriceAndCollateralForm";
import "./SellTOTToToken.css";

const SellTOTToToken: FunctionComponent = () => {
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
      <div className="selltottotoken">
        <form className="createtottosellform1">
          <div className="to-get-tokennft">Create and Sell [TOT/SKU]</div>
          <select className="selecttypeoftot1">
            <option value="sku">Goods</option>
            <option value="svc">Service</option>
            <option value="tot">Generic Trade only TOken</option>
          </select>
          <input className="tot-name3" type="text" placeholder="TOT Name" />
          <input
            className="tot-description3"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <input
            className="tot-name3"
            type="number"
            placeholder="Total Supply"
          />
          <button
            className="prepare-sell-order-button8"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button3">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec3">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button9">
            <div className="secondary-button5">Create TOT</div>
          </button>
        </form>
        <form className="searchtokenbyname1">
          <div className="to-get-tokennft">To get Token/NFT</div>
          <Autocomplete
            sx={{ width: 301 }}
            disablePortal
            options={["aaa", "bbb", "ccc"]}
            renderInput={(params: any) => (
              <TextField
                {...params}
                color="primary"
                label="Token Name"
                variant="outlined"
                placeholder=""
                helperText=""
              />
            )}
            size="medium"
          />
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

export default SellTOTToToken;
