import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./SearchTokenInput.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

interface IBalance {
  token: string;
  balance: number;
}

interface IToken {
  token: string;
  domain: string;
  isTOT: boolean;
  name: string;
}

function SearchTokenInput({ dir, cat, ownOnly, onTokenSelect, val }) {
  const [defval, setDefval] = useState<IToken>();
  const [options, setOptions] = useState<IToken[]>([]);
  const [balance, setBalance] = useState<IBalance[]>([]);
  const [selbalance, setSelbalance] = useState<number | undefined>(0);

  async function getTokens() {
    let t = await window.lyraProxy.invokeMethodAsync("GetBalance");
    var tkns = JSON.parse(t);
    setBalance(tkns);
  }

  //useEffect(() => {
  //  //let tok = { "token": val, "name": val } as IToken;
  //  //if (options.find(a => a.token == val) == null) {
  //  //  options.push(tok);
  //  //}
  //  setDefval(val);
  //}, [val])

  useEffect(() => {
    getTokens();
  }, []);

  const searchToken = (searchTerm, cat) => {
    let method = "SearchToken";
    if (ownOnly && cat != "Fiat") { // search in wallet/balance
      method = "SearchTokenForAccount";
    }

    window.lyraProxy.invokeMethodAsync(method, searchTerm, cat)
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (myJson) {
        console.log(
          "search term: " + searchTerm + ", results: ",
          myJson
        );
        setOptions(myJson);
      });
  };

  const onGetTokenInputChange = useCallback((event, value, reason) => {
    if (value) {
      onTokenSelect(value);
      searchToken(value, cat);

      if (balance?.find(a => a.token == value)) {
        setSelbalance(balance?.find(a => a.token == value)?.balance)
      }
    } else {
      onTokenSelect("");
      setOptions([]);
      setSelbalance(0);
    }
  }, [options]);

    return (
      <div>
        <div className="sell2">To {dir} {cat}</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
          defaultValue={val}
          options={options}
          onInputChange={onGetTokenInputChange}
          getOptionLabel={(option) => option.name}
          renderInput={(params: any) => (
            <TextField
              {...params}
              color="primary"
              label="Token Name"
              variant="outlined"
              placeholder=""
              helperText=""
            />
          )}
          size="medium"
        />
        <div>Balance: {selbalance}</div>
      </div>
    );
}

export default SearchTokenInput;
