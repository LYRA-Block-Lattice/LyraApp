import { FunctionComponent, useCallback } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PreviewSellOrderForm.css";

const PreviewSellOrderForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  return (
    <div className="previewsellorderform">
      <div className="preview-sell-order">Preview Sell Order</div>
      <button
        className="prepare-sell-order-button"
        onClick={onPrepareSellOrderButtonClick}
      >
        <b className="place-order">Place Order</b>
      </button>
      <div className="ill-sell-count-type-of-t">
        <p className="ill-sell-count">I’ll sell (count) (type) of (token).</p>
        <p className="ill-sell-count">
          I want buyer pay me by (type) via (way)
        </p>
        <p className="ill-send-trade">
          I’ll send trade secret to buyer privately as bellow:
        </p>
      </div>
      <textarea
        className="tot-description1"
        placeholder={`Please pay to my bank account number:

Bank of America
1234 1234 1234 1234`}
      />
      <FormControlLabel
        className="confirm-before-create-order"
        label="I agree to the term of service of Lyra Web3 eCommerce platform."
        labelPlacement="end"
        control={
          <Checkbox color="primary" defaultChecked required size="medium" />
        }
      />
    </div>
  );
};

export default PreviewSellOrderForm;
