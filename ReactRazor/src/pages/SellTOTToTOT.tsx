import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./SellTOTToTOT.css";

const SellTOTToTOT: FunctionComponent = () => {
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
      <div className="selltottotot">
        <form className="togettotform1">
          <div className="to-get-totskusvc1">To get [TOT/SKU/SVC]</div>
          <input className="tot-name2" type="text" placeholder="Name" />
          <input
            className="tot-description2"
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
        <div className="priceandcollateralform1">
          <div className="price-and-collateral1">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo1">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-name2"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo1">Amount:</div>
          <input
            className="tot-name2"
            type="number"
            placeholder="Count of the selling token"
          />
          <div className="limitoftrade1">
            <input
              className="limitmin1"
              type="number"
              placeholder="Limit Min"
            />
            <div className="div1">-</div>
            <input
              className="limitmin1"
              type="number"
              placeholder="Limit Max"
            />
          </div>
          <div className="set-the-price-1-offering-fo1">
            Collateral (in LYR):
          </div>
          <input
            className="tot-name2"
            type="number"
            placeholder="Collateral in LYR to guard the trade"
          />
          <div className="set-the-price-1-offering-fo1">
            Collateral worth in USD: $103
          </div>
          <div className="set-the-price-1-offering-fo1">
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
          <div className="set-the-price-1-offering-fo1">
            Current dealer is [dealer name]. You will contact buyers through the
            dealer.
          </div>
          <button className="reviewtheorder1" onClick={onReviewTheOrderClick}>
            <div className="primary-button1">Review the Order</div>
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

export default SellTOTToTOT;
