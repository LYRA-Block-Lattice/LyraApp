import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./SellTOTToToken.css";

const SellTOTToToken: FunctionComponent = () => {
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
      <div className="selltottotoken">
        <form className="createtottosellform2">
          <div className="to-get-tokennft">Create and Sell [TOT/SKU]</div>
          <select className="selecttypeoftot2">
            <option value="sku">Goods</option>
            <option value="svc">Service</option>
            <option value="tot">Generic Trade only TOken</option>
          </select>
          <input className="tot-name5" type="text" placeholder="TOT Name" />
          <input
            className="tot-description5"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <input
            className="tot-name5"
            type="number"
            placeholder="Total Supply"
          />
          <button
            className="prepare-sell-order-button10"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button5">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec5">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button11">
            <div className="secondary-button5">Create TOT</div>
          </button>
        </form>
        <form className="searchtokenbyname5">
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
        <div className="priceandcollateralform6">
          <div className="price-and-collateral6">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo6">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo6">Count:</div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Count of the selling token"
          />
          <div className="set-the-price-1-offering-fo6">
            Collateral (in LYR):
          </div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Collateral in LYR to guard the trade"
          />
          <div className="set-the-price-1-offering-fo6">
            Collateral worth in USD: $103
          </div>
          <button className="reviewtheorder6" onClick={onReviewTheOrderClick}>
            <div className="primary-button6">Review the Order</div>
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

export default SellTOTToToken;
