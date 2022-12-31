import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import GeneralPopup from "../components/GeneralPopup";
import PortalPopup from "../components/PortalPopup";
import { useSearchParams } from "react-router-dom";
import PriceAndCollateralForm from "../components/PriceAndCollateralForm";
import "./SellTokenToToken.css";
import SearchTokenInput from "../dup/SearchTokenInput";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

const SellTokenToToken: FunctionComponent = () => {
  //const [isDisabled, setDisabled] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const catsell = decodeURIComponent(searchParams.get("sell")!);
  const catget = decodeURIComponent(searchParams.get("get")!);

  const [tosell, setTosell] = useState("");
  const [toget, setToget] = useState("");
  const [isGeneralPopupOpen, setGeneralPopupOpen] = useState(false);

  //const onSellChange = useCallback((event, value, reason) => {
  //  if (value) {
  //    setTosell(value);
  //  } else {
  //    setTosell("");
  //  }
  //}, [tosell, tokens]);

  const openGeneralPopup = useCallback(() => {
    setGeneralPopupOpen(true);
  }, []);

  const closeGeneralPopup = useCallback(() => {
    console.log("popup closed!");
    setGeneralPopupOpen(false);
  }, []);

  return (
    <>
      <div className="selltokentotoken">
        <div className="searchtokenbyname2">
          <SearchTokenInput dir="Sell" cat={catsell} ownOnly={true} onTokenSelect={setTosell} />
          <button
            className="prepare-sell-order-button10"
            onClick={openGeneralPopup}
          >
            <div className="utility-button4">Mint to sell</div>
          </button>
          <div className="searchtokenbyname-child" />
          <SearchTokenInput dir="Get" cat={catget} ownOnly={false} onTokenSelect={setToget} />
        </div>
        <PriceAndCollateralForm offering="offering" biding="biding" />
      </div>
      {isGeneralPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeGeneralPopup}
        >
          <GeneralPopup tag={catsell} onClose={closeGeneralPopup}>
          </GeneralPopup>
        </PortalPopup>
      )}
    </>
  );
};

export default SellTokenToToken;
