import { FunctionComponent, useRef, useState, useEffect, useCallback } from "react";
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

interface customWindow extends Window {
    lyraSetProxy?: any;
    lyraProxy?: any;
}

declare const window: customWindow;

const OpenWallet: FunctionComponent = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const selRef = useRef<HTMLInputElement>(null);
    const [wnames, setwnames] = useState([]);
    const [
        dropdownButtonSimpleTextOAnchorEl,
        setDropdownButtonSimpleTextOAnchorEl,
    ] = useState<HTMLElement | null>(null);
    const [
        dropdownButtonSimpleTextOSelectedIndex,
        setDropdownButtonSimpleTextOSelectedIndex,
    ] = useState<number>(0);
  const [selectedWalletNameAnchorEl, setSelectedWalletNameAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedWalletNameSelectedIndex, setSelectedWalletNameSelectedIndex] =
    useState<number>(-1);

    async function getWalletName() {
        let wnames = await window.lyraProxy.invokeMethodAsync("GetWalletNames");
        setwnames(wnames);
    }

    useEffect(() => {
        getWalletName();
    }, [wnames]);

    useEffect(() => {
        console.log("names is " + wnames);
        console.log("index changed to " + dropdownButtonSimpleTextOSelectedIndex);
        console.log("selected name is " + wnames[dropdownButtonSimpleTextOSelectedIndex]);
    }, [dropdownButtonSimpleTextOSelectedIndex]);

  const navigate = useNavigate();
  const selectedWalletNameOpen = Boolean(selectedWalletNameAnchorEl);
  const handleSelectedWalletNameClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setSelectedWalletNameAnchorEl(event.currentTarget);
  };
    const handleDropdownButtonSimpleTextOMenuItemClick = (event: React.MouseEvent<HTMLElement>,
        index: number) => {
        setDropdownButtonSimpleTextOSelectedIndex(index);
        setDropdownButtonSimpleTextOAnchorEl(null);
  const handleSelectedWalletNameMenuItemClick = (index: number) => {
    setSelectedWalletNameSelectedIndex(index);
    setSelectedWalletNameAnchorEl(null);
  };
  const handleSelectedWalletNameClose = () => {
    setSelectedWalletNameAnchorEl(null);
  };

    const onOpenWallet = useCallback(() => {
        console.log("names is " + wnames);
        console.log("index changed to " + dropdownButtonSimpleTextOSelectedIndex);
        console.log("selected name is " + wnames[dropdownButtonSimpleTextOSelectedIndex]);

        window.lyraProxy.invokeMethodAsync("OpenWallet", wnames[dropdownButtonSimpleTextOSelectedIndex], inputRef.current!.value);
    }, [wnames, dropdownButtonSimpleTextOSelectedIndex]);

  const onSignUpClick = useCallback(() => {
    navigate("/create-wallet");
  }, [navigate]);

  return (
    <div className="openwallet">
      <b className="sign-in">Open Wallet</b>
      <img
        className="illus5-copy-icon"
        alt=""
        src="_content/ReactRazor/asserts/illus5-copy.svg"
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
                  {wnames[dropdownButtonSimpleTextOSelectedIndex]}
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
          anchorEl={dropdownButtonSimpleTextOAnchorEl}
          open={dropdownButtonSimpleTextOOpen}
          onClose={handleDropdownButtonSimpleTextOClose}
              >
                  {wnames.map((name, index) => (
                      <MenuItem
                          key={name}
                          selected={index === dropdownButtonSimpleTextOSelectedIndex}
                          onClick={(event) => handleDropdownButtonSimpleTextOMenuItemClick(event, index)}
                      >
                          {name}
                      </MenuItem>
                  ))}
        </Menu>
      </div>
      <TextField
        className="password"
        <TextField
         inputRef={inputRef}
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
      <button className="open-wallet-button">
        <button className="button-shape-21" onClick={onOpenWallet}>
        <div className="button-shape1" />
        <div className="label">Open</div>
      </button>
      <div className="frame-div3">
        <button className="sign-up1" onClick={onSignUpClick}>
          Create Wallet
        </button>
        <button className="forgot-password-copy-2">Forgot password?</button>
      </div>
    </div>
  );
};

export default OpenWallet;
