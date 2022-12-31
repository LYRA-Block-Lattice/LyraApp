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
        <form className="searchtokenbyname">
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
        <form className="togettotform">
          <div className="sell">To get [TOT/SKU/SVC]</div>
          <input className="tot-name1" type="text" placeholder="Name" />
          <input
            className="tot-description1"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <button
            className="prepare-sell-order-button4"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button1">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec1">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button5">
            <div className="secondary-button3">Create TOT</div>
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
