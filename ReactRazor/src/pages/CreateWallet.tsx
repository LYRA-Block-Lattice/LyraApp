import React from 'react'
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

  const onSignInClick = useCallback(() => {
    navigate("/open-wallet");
  }, [navigate]);

  return (
    <div className="create-wallet">
      <b className="sign-up">Create Wallet</b>
      <TextField
        className="box-2-copy"
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
        className="box-2-copy"
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
        className="box-2-copy"
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
        className="box-2-copy"
        sx={{ width: 343 }}
        color="primary"
        variant="standard"
        type="text"
        label="Private Key"
        placeholder="Placeholder"
        size="medium"
        margin="none"
      />
      <button className="button-shape-2">
        <div className="button-shape" />
        <div className="label">Sign Up</div>
      </button>
      <button className="sign-in" onClick={onSignInClick}>
        Sign In
      </button>
    </div>
  );
};

export default CreateWallet;
