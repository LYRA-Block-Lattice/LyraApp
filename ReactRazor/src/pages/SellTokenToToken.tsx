import { FunctionComponent, useCallback, useState, useEffect, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SellTokenToToken.css";
import { option } from "yargs";

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

const SellTokenToToken: FunctionComponent = () => {
  const [tokens, setTokens] = useState<IBalance[]>([]);
  const navigate = useNavigate();

  const [options, setOptions] = useState<IToken[]>([]);

  const getData = (searchTerm) => {
    window.lyraProxy.invokeMethodAsync("SearchTokens", searchTerm, "Token")
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (myJson) {
        console.log(
          "search term: " + searchTerm + ", results: ",
          myJson
        );
        //const updatedOptions = myJson.map((p) => {
        //  return { token: p.token };
        //});
        setOptions(myJson);
      });
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  async function getTokens() {
    let t = await window.lyraProxy.invokeMethodAsync("GetBalance");
    var tkns = JSON.parse(t);
    setTokens(tkns);
  }

  useEffect(() => {
    getTokens();
  }, [tokens]);

  const onReviewTheOrderClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="selltokentotoken">
      <form className="searchtokenbyname7">
        <div className="sell2">Sell</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          options={tokens.filter(a => !a.token.startsWith("tot/") && !a.token.startsWith("fiat/") && !a.token.startsWith("svc/")).map(a => a.token)}
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
        <div className="sell2">To get</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          options={options}
          onInputChange={onInputChange}
          getOptionLabel={(option) => option.token}
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
      <div className="priceandcollateralform8">
        <div className="price-and-collateral8">Price and Collateral</div>
        <div className="set-the-price-1-offering-fo8">
          Set the price, 1 [offering] for [biding]:
        </div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Price for biding token"
        />
        <div className="set-the-price-1-offering-fo8">Count:</div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Count of the selling token"
        />
        <div className="set-the-price-1-offering-fo8">Collateral (in LYR):</div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
        />
        <div className="set-the-price-1-offering-fo8">
          Collateral worth in USD: $103
        </div>
        <button className="reviewtheorder8" onClick={onReviewTheOrderClick}>
          <div className="primary-button8">Review the Order</div>
        </button>
      </div>
    </div>
  );
};

export default SellTokenToToken;
