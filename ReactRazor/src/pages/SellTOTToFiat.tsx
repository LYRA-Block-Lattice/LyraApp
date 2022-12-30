import { FunctionComponent, useState, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import { useNavigate } from "react-router-dom";
import "./SellTOTToFiat.css";

const SellTOTToFiat: FunctionComponent = () => {
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
      <div className="selltottofiat">
        <form className="createtottosellform2">
          <div className="create-and-sell-totsku2">
            Create and Sell [TOT/SKU]
          </div>
          <select className="selecttypeoftot2">
            <option value="sku">Goods</option>
            <option value="svc">Service</option>
            <option value="tot">Generic Trade only TOken</option>
          </select>
          <input className="tot-name5" type="text" placeholder="TOT Name" />
          <input
            className="tot-description7"
            type="text"
            placeholder="Public Description, seen by everyone"
          />
          <input
            className="tot-name5"
            type="number"
            placeholder="Total Supply"
          />
          <button
            className="prepare-sell-order-button19"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button7">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec5">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button20">
            <div className="secondary-button9">Create TOT</div>
          </button>
        </form>
        <form className="searchtokenbyname6">
          <div className="create-and-sell-totsku2">To get Fiat</div>
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
        <div className="priceandcollateralform7">
          <div className="price-and-collateral7">Price and Collateral</div>
          <div className="set-the-price-1-offering-fo7">
            Set the price, 1 [offering] for [biding]:
          </div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Price for biding token"
          />
          <div className="set-the-price-1-offering-fo7">Amount:</div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Count of the selling token"
          />
          <div className="limitoftrade7">
            <input
              className="limitmin7"
              type="number"
              placeholder="Limit Min"
            />
            <div className="div17">-</div>
            <input
              className="limitmin7"
              type="number"
              placeholder="Limit Max"
            />
          </div>
          <div className="set-the-price-1-offering-fo7">
            Collateral (in LYR):
          </div>
          <input
            className="tot-name5"
            type="number"
            placeholder="Collateral in LYR to guard the trade"
          />
          <div className="set-the-price-1-offering-fo7">
            Collateral worth in USD: $103
          </div>
          <div className="set-the-price-1-offering-fo7">
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
          <div className="set-the-price-1-offering-fo7">
            Current dealer is [dealer name]. You will contact buyers through the
            dealer.
          </div>
          <button className="reviewtheorder7" onClick={onReviewTheOrderClick}>
            <div className="primary-button9">Review the Order</div>
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

export default SellTOTToFiat;
