import { FunctionComponent, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
  SelectChangeEvent
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./OpenWallet.css";

import * as actionTypes from "../app/actionTypes";
import { getWalletNamesSelector } from "../app/selectors";

const OpenWallet: FunctionComponent = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [index, setIndex] = useState<number>(0);
  const [password, setPassword] = useState("");
  const names = useSelector(getWalletNamesSelector);
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setIndex(+event.target.value);
  };

  const onOpenWallet = useCallback(() => {
    console.log("names is " + names);
    console.log("selected name is " + names[index]);

    dispatch({
      type: actionTypes.WALLET_OPEN,
      payload: {
        name: names[index],
        password: password
      }
    });
  }, [names, name, index, password, dispatch]);

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
        <Select
          color="primary"
          size="medium"
          label="Wallet Name"
          onChange={handleChange}
          value={index.toString()}
        >
          {names?.map((name: any, index: any) => (
            <MenuItem key={index} value={index}>
              {name}
            </MenuItem>
          ))}
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
          )
        }}
        label="Password"
        placeholder="Placeholder"
        size="medium"
        margin="none"
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="open-wallet-button" onClick={onOpenWallet}>
        <div className="button-shape1" />
        <div className="label">Open</div>
      </button>
      <div className="sign-up-parent">
        <button className="sign-up1" onClick={onOpenWallet}>
          Create Wallet
        </button>
        <button className="forgot-password-copy">Forgot password?</button>
      </div>
    </div>
  );
};

export default OpenWallet;
