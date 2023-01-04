import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import PriceAndCollateralForm from "../components/PriceAndCollateralForm";
import "./SellTokenToTOT.css";

const SellTokenToTOT: FunctionComponent = () => {
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
      <div className="selltokentotot">
        <form className="searchtokenbyname1">
          <div className="sell">Sell</div>
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
        <form className="togettotform1">
          <div className="sell">To get [TOT/SKU/SVC]</div>
          <input className="tot-name3" type="text" placeholder="Name" />
          <input
            className="tot-description2"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <button
            className="prepare-sell-order-button7"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button3">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec3">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button8">
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

export default SellTokenToTOT;
