import { FunctionComponent, useCallback, useState, useEffect, useRef } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SellTokenToToken.css";
import { option } from "yargs";
import Search from "antd/lib/transfer/search";

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
  daoid: string;
}

const SellTokenToToken: FunctionComponent = () => {
  //const [isDisabled, setDisabled] = useState<boolean>(false);

  const [tokens, setTokens] = useState<IBalance[]>([]);  
  const [options, setOptions] = useState<IToken[]>([]);
  const [daos, setDaos] = useState<IDao[]>([]);

  const [tosell, setTosell] = useState("");
  const [toget, setToget] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [limitmin, setLimitmin] = useState<number>(0);
  const [limitmax, setLimitmax] = useState<number>(0);
  const [collateral, setCollateral] = useState<number>(0);
  const [daoid, setDaoid] = useState("");
  const [dealerid, setDealerid] = useState("");

  const navigate = useNavigate();

  const searchToken = (searchTerm) => {
    window.lyraProxy.invokeMethodAsync("SearchToken", searchTerm, "Token")
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

  const searchDao = (searchTerm) => {
    window.lyraProxy.invokeMethodAsync("SearchDao", searchTerm)
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
        setDaos(myJson);
      });
  };

  const onSellChange = useCallback((event, value, reason) => {
    if (value) {
      setTosell(value);
    } else {
      setTosell("");
    }
  }, [tosell, tokens]);

  const onGetTokenInputChange = useCallback((event, value, reason) => {
    if (value) {
      setToget(value);
      searchToken(value);
    } else {
      setToget("");
      setOptions([]);
    }
  }, [toget, options]);

  const onDaoSearchChange = useCallback((event, value, reason) => {
    if (value) {
      searchDao(value);
    } else {
      setDaos([]);
    }
  }, [toget, options]);

  async function getTokens() {
    let t = await window.lyraProxy.invokeMethodAsync("GetBalance");
    var tkns = JSON.parse(t);
    setTokens(tkns);

    let dlr = await window.lyraProxy.invokeMethodAsync("GetCurrentDealer");
    setDealerid(dlr);
  }

  useEffect(() => {
    getTokens();
  }, [tokens]);

  const onReviewTheOrderClick = useCallback(() => {
    let togettoken = options.find(a => a.name == toget)?.token;
    console.log("sell " + tosell + ", to get " + togettoken + ", on price " + price);
    var obj = {
      selltoken: tosell,
      gettoken: togettoken,
      price: price,
      count: count,
      collateral: collateral,
      secret: undefined,
    };
    navigate("/previewsellorderform/?data=" + encodeURIComponent(JSON.stringify(obj)));
  }, [navigate, tosell, toget, price, count, collateral]);

  return (
    <div className="selltokentotoken">
      <form className="searchtokenbyname7">
        <div className="sell2">Sell</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          onInputChange={onSellChange}
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
          onInputChange={onGetTokenInputChange}
          getOptionLabel={(option) => option.name}
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
          Set the price, 1 {tosell} for {toget}:
        </div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Price for biding token"
          onChange={(e) => setPrice(+e.target.value)}
        />
        <div className="set-the-price-1-offering-fo8">Amount:</div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Count of the selling token"
          onChange={(e) => setCount(+e.target.value)}
        />
        <div className="limitoftrade8">
          <input
            className="limitmin8"
            type="number"
            placeholder="Set limit min"
            onChange={(e) => setLimitmin(+e.target.value)}
          />
          <div className="div8">-</div>
          <input
            className="limitmin8"
            type="number"
            placeholder="Set limit max"
            onChange={(e) => setLimitmax(+e.target.value)}
          />
        </div>
        <div className="set-the-price-1-offering-fo8">Collateral (in LYR):</div>
        <input
          className="sellatprice8"
          type="number"
          placeholder="Collateral in LYR to guard the trade"
          onChange={(e) => setCollateral(+e.target.value)}
        />
        <div className="set-the-price-1-offering-fo8">
          Collateral worth in USD: $103
        </div>
        <div className="set-the-price-1-offering-fo8">Create order in DAO:</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          options={daos}
          onInputChange={onDaoSearchChange}
          getOptionLabel={(option) => option.name}
          renderInput={(params: any) => (
            <TextField
              {...params}
              color="primary"
              label="Select DAO the order will be created in"
              variant="outlined"
              placeholder=""
              helperText="Find DAO"
              required
            />
          )}
          size="medium"
        />
        <div className="set-the-price-1-offering-fo8">
          Current dealer is [dealer name]. You will contact buyers by the
          dealer.
        </div>
        <button className="reviewtheorder8" onClick={onReviewTheOrderClick}>
          <div className="primary-button8">Review the Order</div>
        </button>
      </div>
    </div>
  );
};

export default SellTokenToToken;
