import { FunctionComponent, useState, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
} from "@mui/material";
import SignTradeSecretPopup from "../components/SignTradeSecretPopup";
import PortalPopup from "../components/PortalPopup";
import "./CreateTOTForm.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}

declare const window: customWindow;

type TokenMintProps = {
  onClose?: (ticker?: string) => void;
  children?: React.ReactNode;
  tag?: string;
};

const holdTypes = {
  "Goods": "TOT",
  "Service": "SVC",
  "Generic Trade only Token": "TOT"
};

const CreateTOTForm: FunctionComponent<TokenMintProps> = props => {
  const [tott, setTott] = useState("Goods");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [supply, setSupply] = useState<number>(1);

  // signature for trade secret.
  const [tssign, setTssign] = useState<string | undefined>(undefined);

  const totTypeChanged = (e) => {
    e.preventDefault();
    setTott(e.target.value)
  };

  const [isSignTradeSecretPopupOpen, setSignTradeSecretPopupOpen] =
    useState(false);

  const openSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(true);
  }, []);

  const closeSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(false);
  }, []);

  const onMintClick = useCallback(() => {
    console.log("Creating TOT...");
    window.lyraProxy.invokeMethodAsync("CreateTOT", holdTypes[tott], name, desc, supply, tssign)
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (result) {
        if (result.ret == "Success") {
          let tickr = result.result;
          window.lyraProxy.invokeMethodAsync("Alert", "Success", tickr + " is ready for use.");
          props.onClose!(tickr);
        }
        else {
          window.lyraProxy.invokeMethodAsync("Alert", "Warning", result.msg);
          props.onClose!();
        }
      });

  }, [name, desc, supply]);

  return (
    <>
      <div className="create-tot-form">
        <div className="createtottosellform">
          <div className="create-and-sell-totsku">
            Create and Sell [TOT/SKU]
          </div>
          <FormControl sx={{ width: 301 }} variant="outlined">
            <InputLabel color="primary">Select Type of TOT</InputLabel>
            <Select color="primary" size="medium" label="Select Type of TOT"
              onChange={totTypeChanged}
            >
              <MenuItem value="Goods">Goods</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Generic Trade only Token">
                Generic Trade only Token
              </MenuItem>
            </Select>
            <FormHelperText />
          </FormControl>
          <TextField
            className="tot-name"
            sx={{ width: 301 }}
            color="primary"
            variant="outlined"
            type="text"
            label="TOT Name"
            size="medium"
            margin="none"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{ width: 301 }}
            color="primary"
            variant="outlined"
            multiline
            rows={5}
            label="Public Description, seen by everyone"
            placeholder="Introduct to my token"
            margin="none"
            onChange={(e) => setDesc(e.target.value)}
          />
          <TextField
            className="tot-name"
            sx={{ width: 301 }}
            color="primary"
            variant="outlined"
            type="number"
            label="Total Supply"
            placeholder="1"
            size="medium"
            margin="none"
            onChange={(e) => setSupply(+e.target.value)}
          />
          <button
            className="prepare-sell-order-button2"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button">Sign trade secret</div>
          </button>
          <div className="note-i-need-to-send-trade-sec">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button3" onClick={onMintClick}>
            <div className="secondary-button2">Create TOT</div>
          </button>
        </div>
      </div>
      {isSignTradeSecretPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSignTradeSecretPopup}
        >
          <SignTradeSecretPopup onClose={closeSignTradeSecretPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default CreateTOTForm;
