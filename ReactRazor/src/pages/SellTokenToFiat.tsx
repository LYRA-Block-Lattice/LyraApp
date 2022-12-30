import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SellTokenToFiat.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;
interface IBalance {
  token: string;
  balance: number;
}
interface IToken {
  token: string;
  domain: string;
  isTOT: boolean;
  name: string;
}
interface IDao {
  name: string;
  daoId: string;
}

const SellTokenToFiat: FunctionComponent = () => {
  const navigate = useNavigate();

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="selltokentofiat">
      <form className="searchtokenbyname1">
        <div className="to-fiat">Sell</div>
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
        <div className="to-fiat">To Fiat</div>
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
      <div className="priceandcollateralform1">
        <div className="price-and-collateral1">Price and Collateral</div>
        <div className="set-the-price-1-offering-fo1">
          Set the price, 1 [offering] for [biding]:
        </div>
        <input
          className="sellatprice1"
          type="number"
          placeholder="Price for biding token"
        />
        <div className="set-the-price-1-offering-fo1">Amount:</div>
        <input
          className="sellatprice1"
          type="number"
          placeholder="Count of the selling token"
        />
        <div className="limitoftrade1">
          <input className="limitmin1" type="number" placeholder="Limit Min" />
          <div className="div1">-</div>
          <input className="limitmin1" type="number" placeholder="Limit Max" />
        </div>
        <div className="set-the-price-1-offering-fo1">Collateral (in LYR):</div>
        <input
          className="sellatprice1"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
        />
        <div className="set-the-price-1-offering-fo1">
          Collateral worth in USD: $103
        </div>
        <div className="set-the-price-1-offering-fo1">Create order in DAO:</div>
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
  );
};

export default SellTokenToFiat;
