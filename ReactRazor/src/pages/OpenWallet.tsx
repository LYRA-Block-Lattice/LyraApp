import { FunctionComponent, useRef, useState, useEffect, useCallback } from "react";
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

interface customWindow extends Window {
    lyraSetProxy?: any;
    lyraProxy?: any;
}

declare const window: customWindow;

const OpenWallet: FunctionComponent = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const selRef = useRef<HTMLInputElement>(null);
    const [wnames, setwnames] = useState([]);

  const [selectedWalletNameAnchorEl, setSelectedWalletNameAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectedWalletNameSelectedIndex, setSelectedWalletNameSelectedIndex] =
    useState<number>(0);

    async function getWalletName() {
        let wnames = await window.lyraProxy.invokeMethodAsync("GetWalletNames");
        setwnames(wnames);
    }

    useEffect(() => {
        getWalletName();
    }, [wnames]);

    useEffect(() => {
        console.log("names is " + wnames);
        console.log("index changed to " + selectedWalletNameSelectedIndex);
        console.log("selected name is " + wnames[selectedWalletNameSelectedIndex]);
    }, [selectedWalletNameSelectedIndex]);

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

    const onOpenWallet = useCallback(() => {
        console.log("names is " + wnames);
        console.log("index changed to " + selectedWalletNameSelectedIndex);
        console.log("selected name is " + wnames[selectedWalletNameSelectedIndex]);

        window.lyraProxy.invokeMethodAsync("OpenWallet", wnames[selectedWalletNameSelectedIndex], inputRef.current!.value);
    }, [wnames, selectedWalletNameSelectedIndex]);

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
        inputRef={inputRef}
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
        <button className="open-wallet-button" onClick={onOpenWallet}>
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
