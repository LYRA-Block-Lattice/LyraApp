import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import "./SearchTokenInput.css";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

interface IToken {
  token: string;
  domain: string;
  isTOT: boolean;
  name: string;
}

function SearchTokenInput ({ dir, cat, ownOnly, onTokenSelect }) {
  const [options, setOptions] = useState<IToken[]>([]);

  const searchToken = (searchTerm, cat) => {
    window.lyraProxy.invokeMethodAsync("SearchToken", searchTerm, cat)
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
    } else {
      onTokenSelect("");
      setOptions([]);
    }
  }, [options]);

    return (
      <div>
        <div className="sell2">To {dir}</div>
        <Autocomplete
          sx={{ width: 301 }}
          disablePortal
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
      </div>
    );
}

export default SearchTokenInput;
