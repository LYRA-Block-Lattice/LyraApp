import { setegid } from "process";
import { FunctionComponent, useCallback, LegacyRef, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CatalogSelection from "../components/CatalogSelection";
import "./StartToCreateOrder.css";
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import { refType } from "@mui/utils";

const boxStyle = {border: "grey solid 2px", borderRadius: "10px", padding: "5px"};

const StartToCreateOrder: FunctionComponent = () => {
  const [start, setStart] = useState<string|undefined>();
  const [end, setEnd] = useState<string|undefined>();

  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/selecttokenfororder");
  }, [navigate]);

  const onTokenAction = (act:string | undefined, tok:string | undefined, xref: LegacyRef<HTMLButtonElement> | undefined) => {
    if(act === "Sell")
    {
      setStart(tok);
    }
    else
    {
      setEnd(tok);
    }
    //alert(`act is ${act} and token is ${tok}`);
  };

  return (
    <div className="starttocreateorder">
      <div className="choose-the-catalog">Choose the catalog</div>
      <div className="catalog-section">
      <Xwrapper>
             <Xarrow showXarrow={start != null && end != null} start={`Sell-${start}`} end={`Get-${end}`}/>
        
        <CatalogSelection iWantTo="Sell" tokenActionClicked={onTokenAction}/>
        <div className="catalog-section-child" />
        <CatalogSelection iWantTo="Get" tokenActionClicked={onTokenAction}/>
        </Xwrapper>
      </div>
      <button
        className="prepare-sell-order-button15"
        onClick={onPrepareSellOrderButtonClick}
      >
        <div className="primary-button3">Next</div>
      </button>
    </div>
  );
};

export default StartToCreateOrder;
