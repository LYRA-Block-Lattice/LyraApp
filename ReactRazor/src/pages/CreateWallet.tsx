import { FunctionComponent, useCallback } from "react";
import {
  TextField,
  Input,
  Icon,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CreateWallet.css";

const CreateWallet: FunctionComponent = () => {
  const navigate = useNavigate();

  const onOpenWalletLinkClick = useCallback(() => {
    navigate("/open-wallet");
  }, [navigate]);

  return (
    <div className="createwallet">
      <b className="sign-up">Create Wallet</b>
      <TextField
        className="wallet-name"
        sx={{ width: 343 }}
        color="primary"
        variant="standard"
        type="text"
        label="Wallet Name"
        placeholder="Placeholder"
        size="medium"
        margin="none"
        required
      />
      <TextField
        className="wallet-name"
        sx={{ width: 343 }}
        color="primary"
        variant="standard"
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                <Icon>visibility</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        placeholder="Placeholder"
        size="medium"
        margin="none"
        required
      />
      <TextField
        className="wallet-name"
        sx={{ width: 343 }}
        color="primary"
        variant="standard"
        type="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility">
                <Icon>visibility</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Confirm password"
        placeholder="Placeholder"
        size="medium"
        margin="none"
        required
      />
      <FormControlLabel
        label="Label"
        labelPlacement="end"
        control={<Checkbox color="primary" size="medium" />}
      />
      <TextField
        className="wallet-name"
        sx={{ width: 343 }}
        color="primary"
        variant="standard"
        type="text"
        label="Private Key"
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
      <button className="create-wallet">
        <div className="button-shape" />
        <div className="createlabel">Create</div>
      </button>
      <button className="open-wallet-link" onClick={onOpenWalletLinkClick}>
        Open Wallet
      </button>
    </div>
  );
};

export default CreateWallet;
