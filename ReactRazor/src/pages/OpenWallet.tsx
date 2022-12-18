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
  const dropdownButtonSimpleTextOOpen = Boolean(
    dropdownButtonSimpleTextOAnchorEl
  );
  const handleDropdownButtonSimpleTextOClick = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setDropdownButtonSimpleTextOAnchorEl(event.currentTarget);
  };
    const handleDropdownButtonSimpleTextOMenuItemClick = (event: React.MouseEvent<HTMLElement>,
        index: number) => {
        setDropdownButtonSimpleTextOSelectedIndex(index);
        setDropdownButtonSimpleTextOAnchorEl(null);
  };
  const handleDropdownButtonSimpleTextOClose = () => {
    setDropdownButtonSimpleTextOAnchorEl(null);
  };

    const onOpenWallet = useCallback(() => {
        console.log("names is " + wnames);
        console.log("index changed to " + dropdownButtonSimpleTextOSelectedIndex);
        console.log("selected name is " + wnames[dropdownButtonSimpleTextOSelectedIndex]);

        window.lyraProxy.invokeMethodAsync("OpenWallet", wnames[dropdownButtonSimpleTextOSelectedIndex], inputRef.current!.value)
            .then(data => {
                alert("DotNet reply: " + data);
            });
    }, [wnames, dropdownButtonSimpleTextOSelectedIndex]);

  const onSignUpClick = useCallback(() => {
    navigate("/create-wallet");
  }, [navigate]);

  return (
    <div className="openwallet">
      <b className="sign-in1">Open Wallet</b>
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
          aria-expanded={dropdownButtonSimpleTextOOpen ? "true" : undefined}
          onClick={handleDropdownButtonSimpleTextOClick}
          color="primary"
              >
                  {wnames[dropdownButtonSimpleTextOSelectedIndex]}
        </Button>
        <Menu
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
        <button className="button-shape-21" onClick={onOpenWallet}>
        <div className="button-shape1" />
        <div className="label1">Sign In</div>
      </button>
      <div className="frame-div4">
        <button className="sign-up1" onClick={onSignUpClick}>
          Sign Up
        </button>
        <button className="forgot-password-copy-2">Forgot password?</button>
      </div>
    </div>
  );
};

export default OpenWallet;
