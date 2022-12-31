import { FunctionComponent } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./MintFiatToken.css";

const MintFiatToken: FunctionComponent = () => {
  return (
    <form className="mint-fiat-token">
      <div className="print-fiat-for-free">Print Fiat for free</div>
      <Autocomplete
        sx={{ width: 301 }}
        disablePortal
        options={[] as any}
        renderInput={(params: any) => (
          <TextField
            {...params}
            color="primary"
            label="Select Fiat Type"
            variant="outlined"
            placeholder=""
            helperText=""
          />
        )}
        size="medium"
      />
      <input
        className="domain-name"
        type="number"
        placeholder="Amount to print"
        required
      />
      <button className="prepare-sell-order-button">
        <div className="secondary-button">Print</div>
      </button>
    </form>
  );
};

export default MintFiatToken;