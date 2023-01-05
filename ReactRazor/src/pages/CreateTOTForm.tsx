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

const CreateTOTForm: FunctionComponent = () => {
  const [isSignTradeSecretPopupOpen, setSignTradeSecretPopupOpen] =
    useState(false);

  const openSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(true);
  }, []);

  const closeSignTradeSecretPopup = useCallback(() => {
    setSignTradeSecretPopupOpen(false);
  }, []);

  return (
    <>
      <div className="createtotform">
        <form className="createtottosellform">
          <div className="create-and-sell">Create and Sell [TOT/SKU]</div>
          <FormControl sx={{ width: 301 }} variant="outlined">
            <InputLabel color="primary">Select Type of TOT</InputLabel>
            <Select color="primary" size="medium" label="Select Type of TOT">
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
          />
          <button
            className="prepare-sell-order-button3"
            onClick={openSignTradeSecretPopup}
          >
            <div className="utility-button">Sign trade secret</div>
          </button>
          <div className="note-i-need">
            Note: I need to send trade secret privately to buyer(s).
          </div>
          <button className="prepare-sell-order-button4">
            <div className="secondary-button2">Create TOT</div>
          </button>
        </form>
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
