import { FunctionComponent, useCallback } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
  Select,
  TextField,
  Input,
  Icon,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./OpenWallet.css";

const OpenWallet: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSignUpClick = useCallback(() => {
    navigate("/create-wallet");
  }, [navigate]);

  return (
    <div className="openwallet">
      <b className="sign-in">Open Wallet</b>
      <img
        className="illus5-copy-icon"
        alt=""
        src="../asserts/illus5-copy.svg"
      />
      <FormControl
        className="wallet-name1"
        sx={{ width: 343 }}
        variant="standard"
      >
        <InputLabel color="primary">Wallet Name</InputLabel>
        <Select color="primary" size="medium" label="Wallet Name">
          <MenuItem value="wallet a">wallet a</MenuItem>
          <MenuItem value="name b">name b</MenuItem>
        </Select>
        <FormHelperText />
      </FormControl>
      <TextField
        className="password"
        sx={{ width: 330 }}
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
      <button className="open-wallet-button">
        <div className="button-shape1" />
        <div className="label">Open</div>
      </button>
      <div className="sign-up-parent">
        <button className="sign-up1" onClick={onSignUpClick}>
          Create Wallet
        </button>
        <button className="forgot-password-copy-2">Forgot password?</button>
      </div>
    </div>
  );
};

export default OpenWallet;
