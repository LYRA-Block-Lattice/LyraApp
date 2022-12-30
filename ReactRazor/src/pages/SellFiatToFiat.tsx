import { FunctionComponent, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SellFiatToFiat.css";

const SellFiatToFiat: FunctionComponent = () => {
  const navigate = useNavigate();

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="sellfiattofiat">
      <form className="searchtokenbyname5">
        <div className="sell-fiat1">Sell Fiat</div>
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
        <div className="sell-fiat1">To get Fiat</div>
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
          className="sellatprice6"
          type="number"
          placeholder="Price for biding token"
        />
        <div className="set-the-price-1-offering-fo6">Amount:</div>
        <input
          className="sellatprice6"
          type="number"
          placeholder="Count of the selling token"
        />
        <div className="limitoftrade6">
          <input className="limitmin6" type="number" placeholder="Limit Min" />
          <div className="div16">-</div>
          <input className="limitmin6" type="number" placeholder="Limit Max" />
        </div>
        <div className="set-the-price-1-offering-fo6">Collateral (in LYR):</div>
        <input
          className="sellatprice6"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
        />
        <div className="set-the-price-1-offering-fo6">
          Collateral worth in USD: $103
        </div>
        <div className="set-the-price-1-offering-fo6">Create order in DAO:</div>
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
        <div className="set-the-price-1-offering-fo6">
          Current dealer is [dealer name]. You will contact buyers through the
          dealer.
        </div>
        <button className="reviewtheorder6" onClick={onReviewTheOrderClick}>
          <div className="primary-button8">Review the Order</div>
        </button>
      </div>
    </div>
  );
};

export default SellFiatToFiat;
