import { FunctionComponent, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SellFiatToToken.css";

const SellFiatToToken: FunctionComponent = () => {
  const navigate = useNavigate();

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="sellfiattotoken">
      <form className="searchtokenbyname6">
        <div className="to-get">Sell Fiat</div>
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
        <div className="to-get">To get</div>
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
          className="sellatprice7"
          type="number"
          placeholder="Price for biding token"
        />
        <div className="set-the-price-1-offering-fo7">Amount:</div>
        <input
          className="sellatprice7"
          type="number"
          placeholder="Count of the selling token"
        />
        <div className="limitoftrade7">
          <input className="limitmin7" type="number" placeholder="Limit Min" />
          <div className="div7">-</div>
          <input className="limitmin7" type="number" placeholder="Limit Max" />
        </div>
        <div className="set-the-price-1-offering-fo7">Collateral (in LYR):</div>
        <input
          className="sellatprice7"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
        />
        <div className="set-the-price-1-offering-fo7">
          Collateral worth in USD: $103
        </div>
        <div className="set-the-price-1-offering-fo7">Create order in DAO:</div>
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
          <div className="primary-button7">Review the Order</div>
        </button>
      </div>
    </div>
  );
};

export default SellFiatToToken;
