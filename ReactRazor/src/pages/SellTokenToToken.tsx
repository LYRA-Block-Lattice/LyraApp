import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./SellTokenToToken.css";
import SearchTokenInput from "../dup/SearchTokenInput";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;
interface IBalance {
  token: string;
  balance: number;
}

interface IDao {
  name: string;
  daoId: string;
}

const SellTokenToToken: FunctionComponent = () => {
  //const [isDisabled, setDisabled] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const catsell = decodeURIComponent(searchParams.get("sell")!);
  const catget = decodeURIComponent(searchParams.get("get")!);

  const [tokens, setTokens] = useState<IBalance[]>([]);  
  
  const [daos, setDaos] = useState<IDao[]>([]);

  const [tosell, setTosell] = useState("");
  const [toget, setToget] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [limitmin, setLimitmin] = useState<number>(0);
  const [limitmax, setLimitmax] = useState<number>(0);
  const [collateral, setCollateral] = useState<number>(0);
  const [daoId, setDaoId] = useState("");
  const [dealerid, setDealerid] = useState("");

  const navigate = useNavigate();

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

  const onDaoSearchChange = useCallback((event, value, reason) => {
    if (value) {
      searchDao(value);
    } else {
      setDaos([]);
    }
  }, [daos]);

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
    let togettoken = toget;
    console.log("sell " + tosell + ", to get " + togettoken + ", on price " + price);
    var obj = {
      selltoken: tosell,
      gettoken: togettoken,
      price: price,
      count: count,
      collateral: collateral,
      secret: undefined,
      daoid: daoId,
      dealerid: dealerid,
      limitmin: limitmin,
      limitmax: limitmax,
    };
    navigate("/previewsellorderform/?data=" + encodeURIComponent(JSON.stringify(obj)));
  }, [navigate, tosell, toget, price, count, collateral, daoId, dealerid]);

  return (
    <div className="selltokentotoken">
      <form className="searchtokenbyname7">
        <div className="sell2">Sell</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          onInputChange={onSellChange}
          options={tokens.filter(a => !a.token.startsWith("nft/") && !a.token.startsWith("tot/") && !a.token.startsWith("fiat/") && !a.token.startsWith("svc/")).map(a => a.token)}
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
        <SearchTokenInput dir="Get" cat={catget} ownOnly={false} onTokenSelect={setToget} />
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
          onChange={(event, value) => setDaoId(value?.daoId!)}
          getOptionLabel={(option) => option.name}
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
        <div className="set-the-price-1-offering-fo8">
          Current dealer is [dealer name]. You will contact buyers through the
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
