import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./SellFiatToTOT.css";

const SellFiatToTOT: FunctionComponent = () => {
  const [isSignTradeSecretPopupOpen, setSignTradeSecretPopupOpen] =
    useState(false);
  const navigate = useNavigate();

  const openSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(true);
  }, []);

  const closeSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(false);
  }, []);

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <>
      <div className="sellfiattotot">
        <form className="searchtokenbyname2">
          <div className="sell-fiat">Sell Fiat</div>
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
          <div className="sell-fiat">To get [TOT/SKU/SVC]</div>
          <input className="tot-name1" type="text" placeholder="Name" />
          <input
            className="tot-description1"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <button
            className="prepare-sell-order-button2"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button1">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec1">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button3">
            <div className="secondary-button1">Create TOT</div>
          </button>
        </form>
        <div className="priceandcollateralform2">
          <div className="price-and-collateral2">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo2">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-name1"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo2">Amount:</div>
          <input
            className="tot-name1"
            type="number"
            placeholder="Count of the selling token"
          />
          <div className="limitoftrade2">
            <input
              className="limitmin2"
              type="number"
              placeholder="Limit Min"
            />
            <div className="div2">-</div>
            <input
              className="limitmin2"
              type="number"
              placeholder="Limit Max"
            />
          </div>
          <div className="set-the-price-1-offering-fo2">
            Collateral (in LYR):
          </div>
          <input
            className="tot-name1"
            type="number"
            placeholder="Collateral in LYR to guard the trade"
          />
          <div className="set-the-price-1-offering-fo2">
            Collateral worth in USD: $103
          </div>
          <div className="set-the-price-1-offering-fo2">
            Create order in DAO:
          </div>
          <Autocomplete
            sx={{ width: 301 }}
            disablePortal
            options={[] as any}
            renderInput={(params: any) => (
              <TextField
                {...params}
                color="primary"
                label="Find DAO"
                variant="outlined"
                placeholder=""
                helperText="Select DAO the order will be created in"
                required
              />
            )}
            size="medium"
          />
          <div className="set-the-price-1-offering-fo2">
            Current dealer is [dealer name]. You will contact buyers through the
            dealer.
          </div>
          <button className="reviewtheorder2" onClick={onReviewTheOrderClick}>
            <div className="primary-button2">Review the Order</div>
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
    </>
  );
};

export default SellFiatToTOT;
