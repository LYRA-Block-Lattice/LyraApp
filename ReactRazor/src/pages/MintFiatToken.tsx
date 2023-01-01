import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./MintFiatToken.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}

declare const window: customWindow;

interface IToken {
  token: string;
  domain: string;
  isTOT: boolean;
  name: string;
}

type TokenMintProps = {
  onClose?: (ticker?: string) => void;
  children?: React.ReactNode;
  tag?: string;
};

const MintFiatToken: FunctionComponent<TokenMintProps> = props => {
  const [name, setName] = useState<string>("");
  const [supply, setSupply] = useState<number>(0);
  const [options, setOptions] = useState<IToken[]>([]);

  async function getTokens() {
    let t = await window.lyraProxy.invokeMethodAsync("SearchToken", "fiat/", "Fiat");
    var tkns = JSON.parse(t);
    setOptions(tkns);
  }

  useEffect(() => {
    getTokens();
  }, []);

  const onMintClick = useCallback(() => {
    console.log("printing fiat...");
    window.lyraProxy.invokeMethodAsync("PrintFiat", name, supply)
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (result) {
        if (result.ret == "Success") {
          let tickr = name;
          window.lyraProxy.invokeMethodAsync("Alert", "Success", tickr + " is ready for use.");
          props.onClose!(tickr);
        }
        else {
          window.lyraProxy.invokeMethodAsync("Alert", "Warning", result.msg);
          props.onClose!();
        }
      });

  }, [name, supply]);

  const onGetTokenInputChange = useCallback((event, value, reason) => {
    if (value) {
      setName(value);
    } else {
      setName("");
    }
  }, [options]);

  return (
    <div className="mint-fiat-token">
      <div className="print-fiat-for-free">Print Fiat for free</div>
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
            label="Select Fiat Type"
            variant="outlined"
            placeholder=""
            helperText=""
          />
        )}
        size="medium"
      />
      <TextField
        className="domain-name"
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        type="number"
        label="Amount to print"
        placeholder="100"
        size="medium"
        margin="none"
        onChange={(e) => setSupply(+e.target.value)}
      />
      <button className="prepare-sell-order-button" onClick={onMintClick}>
        <div className="secondary-button">Print</div>
      </button>
    </div>
  );
};

export default MintFiatToken;
