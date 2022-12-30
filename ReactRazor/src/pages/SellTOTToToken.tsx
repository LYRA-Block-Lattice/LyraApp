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
        <div className="priceandcollateralform2">
          <div className="price-and-collateral2">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo2">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-name3"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo2">Amount:</div>
          <input
            className="tot-name3"
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
            className="tot-name3"
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

export default SellTOTToToken;
