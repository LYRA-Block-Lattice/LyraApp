import { FunctionComponent, useCallback } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./PreviewSellOrderForm.css";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

const PreviewSellOrderForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const data = decodeURIComponent(searchParams.get("data")!);
  const obj = JSON.parse(data);

  const onPrepareSellOrderButtonClick = useCallback(() => {
    window.rrProxy.ReactRazor.Pages.Home.Interop.CreateOrderAsync(window.rrComponent, data)
      .then(function (response) {
        var ret = JSON.parse(response);
        if (ret.ret == "Success") {
          navigate("/createordersuccessform?tx=" + ret.txhash);
        }
        else {
          window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Warning", ret.msg);
        }
      })
  }, [navigate]);

  function ShowTS(props) {
    if (obj.secret != undefined)
      return <>
        <div>
          <p className="ill-send-trade">
            I’ll send trade secret to buyer privately as bellow:
          </p>
        </div >
        <textarea
          className="tot-description7"
          placeholder={`Please pay to my bank account number:

  Bank of America
  1234 1234 1234 1234`}
        />
      </>;
    else
      return <></>;
  };

  return (
    <div className="previewsellorderform">
      <div className="preview-sell-order">Preview Sell Order</div>
      <div className="ill-sell-count-container">
        <p className="ill-sell-count">I’ll sell {obj.count} of {obj.selltoken}.</p>
        <p className="ill-sell-count">
          I want buyer pay me by {obj.gettoken} on price {obj.price}
        </p>
        <p className="ill-sell-count">
          Order will be created in DAO { obj.daoid}
        </p>
        <p className="ill-sell-count">
          I'll contact buyers through dealer {obj.dealerid}
        </p>
        <ShowTS />
      </div>
      <FormControlLabel
        className="confirm-before-create-order"
        label="I agree to the term of service of Lyra Web3 eCommerce platform."
        labelPlacement="end"
        control={
          <Checkbox color="primary" defaultChecked required size="medium" />
        }
      />
      <button
        className="prepare-sell-order-button14"
        onClick={onPrepareSellOrderButtonClick}
      >
        <div className="primary-button">Place Order</div>
      </button>
    </div>
  );
};

export default PreviewSellOrderForm;
