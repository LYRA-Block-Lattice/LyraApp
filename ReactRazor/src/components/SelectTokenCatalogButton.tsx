import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./SelectTokenCatalogButton.css";

type SelectTokenCatalogButtonType = {
  icbaselineGeneratingToken?: string;
  token?: string;
  tokenClicked: (tokenName: string | undefined) => void;
  disabled: boolean;
};

const SelectTokenCatalogButton: FunctionComponent<
  SelectTokenCatalogButtonType
> = ({ icbaselineGeneratingToken, token, tokenClicked, disabled }) => {
  const selectTokenButtonStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: disabled ? "lightgray" : "#424242",
    };
  }, [
    disabled,
  ]);
  return (
    <button className="select-token-catalog-button"
      onClick={e => tokenClicked(token)}
      style={selectTokenButtonStyle} 
      >
      <img
        className="icbaseline-generating-tokens-icon"
        alt=""
        src={icbaselineGeneratingToken}
      />
      <div className="frame-div7">
        <b className="token">{token}</b>
      </div>
    </button>
  );
};

export default SelectTokenCatalogButton;
