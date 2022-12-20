import { FunctionComponent, useMemo, LegacyRef } from "react";
import CSS, { Property } from "csstype";
import "./SelectTokenCatalogButton.css";

type SelectTokenCatalogButtonType = {
  icbaselineGeneratingToken?: string;
  token?: string;
  tokenClicked: (tokenName: string | undefined) => void;
  disabled: boolean;
  act?: string;
  xref: LegacyRef<HTMLButtonElement> | undefined
};

const SelectTokenCatalogButton: FunctionComponent<
  SelectTokenCatalogButtonType
> = ({ icbaselineGeneratingToken, token, tokenClicked, disabled, act, xref }) => {
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
      ref={xref}
      id={`${act}-${token}`}
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
