import { FunctionComponent, useCallback } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SellTokenToToken.css";

const SellTokenToToken: FunctionComponent = () => {
  const navigate = useNavigate();

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="selltokentotoken">
      <form className="searchtokenbyname2">
        <div className="to-sell-token">To Sell Token</div>
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
        <button className="prepare-sell-order-button10">
          <div className="mini-button">Mint to sell</div>
        </button>
        <div className="searchtokenbyname-child" />
        <div className="to-sell-token">To Get Fiat</div>
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
      <div className="priceandcollateralform3">
        <div className="price-and-collateral3">Price and Collateral</div>
        <div className="set-the-price-1-offering-fo3">
          Set the price, 1 [offering] for [biding]:
        </div>
        <input
          className="sellatprice3"
          type="number"
          placeholder="Price for biding token"
        />
        <div className="set-the-price-1-offering-fo3">Amount:</div>
        <input
          className="sellatprice3"
          type="number"
          placeholder="Count of the selling token"
        />
        <div className="limitoftrade3">
          <input className="limitmin3" type="number" placeholder="Limit Min" />
          <div className="div3">-</div>
          <input className="limitmin3" type="number" placeholder="Limit Max" />
        </div>
        <div className="set-the-price-1-offering-fo3">Collateral (in LYR):</div>
        <input
          className="sellatprice3"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
        />
        <div className="set-the-price-1-offering-fo3">
          Collateral worth in USD: $103
        </div>
        <div className="set-the-price-1-offering-fo3">Create order in DAO:</div>
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
        <div className="set-the-price-1-offering-fo3">
          Current dealer is [dealer name]. You will contact buyers through the
          dealer.
        </div>
        <button className="reviewtheorder3" onClick={onReviewTheOrderClick}>
          <div className="primary-button3">Review the Order</div>
        </button>
      </div>
    </div>
  );
};

export default SellTokenToToken;
