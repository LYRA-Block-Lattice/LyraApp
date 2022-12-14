import React from 'react';
import { FunctionComponent, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  TextField,
  Input,
  Icon,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "./OpenWallet.css";

const OpenWallet: FunctionComponent = () => {
  const [
    dropdownButtonSimpleTextOAnchorEl,
    setDropdownButtonSimpleTextOAnchorEl,
  ] = useState<HTMLElement | null>(null);
  const [
    dropdownButtonSimpleTextOSelectedIndex,
    setDropdownButtonSimpleTextOSelectedIndex,
  ] = useState<number>(-1);

  const dropdownButtonSimpleTextOOpen = Boolean(
    dropdownButtonSimpleTextOAnchorEl
  );
  const handleDropdownButtonSimpleTextOClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setDropdownButtonSimpleTextOAnchorEl(event.currentTarget);
  };
  const handleDropdownButtonSimpleTextOMenuItemClick = (index: number) => {
    setDropdownButtonSimpleTextOSelectedIndex(index);
    setDropdownButtonSimpleTextOAnchorEl(null);
  };
  const handleDropdownButtonSimpleTextOClose = () => {
    setDropdownButtonSimpleTextOAnchorEl(null);
  };

  return (
    <div className="open-wallet">
      <b className="sign-in1">Open Wallet</b>
          <img className="illus5-copy-icon" alt="" src="_content/ReactRazor/imgs/illus5-copy.svg" />
      <div>
        <Button
          id="button-Select Wallet"
          aria-controls="menu-Select Wallet"
          aria-haspopup="true"
          aria-expanded={dropdownButtonSimpleTextOOpen ? "true" : undefined}
          onClick={handleDropdownButtonSimpleTextOClick}
          color="primary"
        >
          Select Wallet
        </Button>
        <Menu
          anchorEl={dropdownButtonSimpleTextOAnchorEl}
          open={dropdownButtonSimpleTextOOpen}
          onClose={handleDropdownButtonSimpleTextOClose}
        >
          <MenuItem
            selected={dropdownButtonSimpleTextOSelectedIndex === 0}
            onClick={() => handleDropdownButtonSimpleTextOMenuItemClick(0)}
          >
            wallet a
          </MenuItem>
          <MenuItem
            selected={dropdownButtonSimpleTextOSelectedIndex === 1}
            onClick={() => handleDropdownButtonSimpleTextOMenuItemClick(1)}
          >
            walle b
          </MenuItem>
        </Menu>
      </div>
      <TextField
        className="box-22"
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
      <button className="button-shape-21">
        <div className="button-shape1" />
        <div className="label1">Sign In</div>
      </button>
      <div className="frame-div">
        <button className="sign-up1">Sign Up</button>
        <button className="forgot-password-copy-2">Forgot password?</button>
      </div>
    </div>
  );
};

export default OpenWallet;
