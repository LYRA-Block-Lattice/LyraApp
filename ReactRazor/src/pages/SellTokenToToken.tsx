import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import GeneralPopup from "../components/GeneralPopup";
import PortalPopup from "../components/PortalPopup";
import { useSearchParams } from "react-router-dom";
import PriceAndCollateralForm from "../components/PriceAndCollateralForm";
import "./SellTokenToToken.css";
import SearchTokenInput from "../dup/SearchTokenInput";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

interface IToken {
  token: string;
  domain: string;
  isTOT: boolean;
  name: string;
}

const SellTokenToToken: FunctionComponent = () => {
  //const [isDisabled, setDisabled] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const catsell = decodeURIComponent(searchParams.get("sell")!);
  const catget = decodeURIComponent(searchParams.get("get")!);

  const [tosell, setTosell] = useState("LYR");
  const [toget, setToget] = useState("tether/USDT");
  const [isGeneralPopupOpen, setGeneralPopupOpen] = useState(false);

  const [val, setVal] = useState<IToken>();

  const onSellChange = useCallback((value) => {
    console.log("onSellChange: " + value);
    if (value) {
      setTosell(value);
    } else {
      setTosell("");
    }
  }, [tosell]);

  const openGeneralPopup = useCallback(() => {
    setGeneralPopupOpen(true);
  }, []);

  const closeGeneralPopup = useCallback((ticker) => {
    if (ticker == null) {
      console.log("popup closed. nothing happened.");
    }
    else {
      console.log("popup closed!, the ticker is " + ticker);
      setTosell(ticker);
      setVal({ "token": ticker, "name": ticker } as IToken);
    }

    setGeneralPopupOpen(false);
  }, [tosell, val]);

  return (
    <>
      <div className="selltokentotoken">
        <div className="searchtokenbyname2">
          <SearchTokenInput key="tosell" val={val} dir="Sell" cat={catsell} ownOnly={true} onTokenSelect={onSellChange} />
          <button
            className="prepare-sell-order-button11"
            onClick={openGeneralPopup}
          >
            <div className="utility-button4">Mint to sell</div>
          </button>
          <div className="searchtokenbyname-child" />
          <SearchTokenInput key="toget" val={val} dir="Get" cat={catget} ownOnly={false} onTokenSelect={setToget} />
        </div>
        <PriceAndCollateralForm offering={tosell} biding={toget} />
      </div>
      {isGeneralPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={() => closeGeneralPopup(null)}
        >
          <GeneralPopup tag={catsell} onClose={closeGeneralPopup}>
          </GeneralPopup>
        </PortalPopup>
      )}
    </>
  );
};

export default SellTokenToToken;
