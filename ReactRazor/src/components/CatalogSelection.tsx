import { FunctionComponent, useState, useCallback } from "react";
import SelectTokenCatalogButton from "../components/SelectTokenCatalogButton";
import "./CatalogSelection.css";

type CatalogSelectionType = {
  iWantTo?: string;
  tokenActionClicked: (action: string | undefined, tokenName: string | undefined) => void;
};

const CatalogSelection: FunctionComponent<CatalogSelectionType> = ({
  iWantTo,
  tokenActionClicked
}) => {
  const [buttons, setButtons] =
  useState<{tokenName: string; disabled: boolean, icon: string}[]>([
      { tokenName: "Token", disabled: false, icon: "_content/ReactRazor/asserts/icbaselinegeneratingtokens.svg"},
      { tokenName: "NFT", disabled: false, icon: "_content/ReactRazor/asserts/mapartgallery.svg"},
      { tokenName: "Fiat", disabled: false, icon: "_content/ReactRazor/asserts/fluentemojihighcontrastdollarbanknote.svg"},
      { tokenName: "Goods", disabled: false, icon: "_content/ReactRazor/asserts/mditruckdelivery.svg"},
      { tokenName: "Service", disabled: false, icon: "_content/ReactRazor/asserts/carbonuserservicedesk.svg"},
  ]);

  const traceToken = useCallback((action: string | undefined, tokenName: string | undefined) => {
    setButtons(prev => 
      {
        let ele = prev.find(a => a.tokenName === tokenName);
        if(ele?.disabled)
        {
          ele.disabled = false;
        }
        prev.filter(a => a.tokenName != tokenName)
          .map(a => a.disabled = true);
        return [...prev];
      });      
      tokenActionClicked(action, tokenName);
  }, [buttons]);

  return (
    <div className="catalogselection">
      <div className="i-want-to-sell">{iWantTo}</div>
      <div className="tradecatalog">
        {buttons.map((a, index) => (
            <SelectTokenCatalogButton
              icbaselineGeneratingToken={a.icon}                                    
              token={a.tokenName}
              tokenClicked={e => traceToken(iWantTo, e)}
              disabled={a.disabled}
            />
          ))}
      </div>
    </div>
  );
};

export default CatalogSelection;
