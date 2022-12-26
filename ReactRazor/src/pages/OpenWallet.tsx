import { FunctionComponent, useState, useCallback } from "react";
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
import { useNavigate } from "react-router-dom";
import "./OpenWallet.css";

const OpenWallet: FunctionComponent = () => {
  const [selectedWalletNameAnchorEl, setSelectedWalletNameAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedWalletNameSelectedIndex, setSelectedWalletNameSelectedIndex] =
    useState<number>(-1);

  const navigate = useNavigate();
  const selectedWalletNameOpen = Boolean(selectedWalletNameAnchorEl);
  const handleSelectedWalletNameClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedWalletNameAnchorEl(event.currentTarget);
  };
  const handleSelectedWalletNameMenuItemClick = (index: number) => {
    setSelectedWalletNameSelectedIndex(index);
    setSelectedWalletNameAnchorEl(null);
  };
  const handleSelectedWalletNameClose = () => {
    setSelectedWalletNameAnchorEl(null);
  };

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
      <div>
        <Button
          id="button-Select Wallet"
          aria-controls="menu-Select Wallet"
          aria-haspopup="true"
          aria-expanded={selectedWalletNameOpen ? "true" : undefined}
          onClick={handleSelectedWalletNameClick}
          color="primary"
        >
          Select Wallet
        </Button>
        <Menu
          anchorEl={selectedWalletNameAnchorEl}
          open={selectedWalletNameOpen}
          onClose={handleSelectedWalletNameClose}
        >
          <MenuItem
            selected={selectedWalletNameSelectedIndex === 0}
            onClick={() => handleSelectedWalletNameMenuItemClick(0)}
          >
            wallet a
          </MenuItem>
          <MenuItem
            selected={selectedWalletNameSelectedIndex === 1}
            onClick={() => handleSelectedWalletNameMenuItemClick(1)}
          >
            walle b
          </MenuItem>
        </Menu>
      </div>
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
