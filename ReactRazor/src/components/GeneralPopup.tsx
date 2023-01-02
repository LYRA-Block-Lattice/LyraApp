import { FunctionComponent } from "react";
import "./GeneralPopup.css";
import MintFiatToken from "../pages/MintFiatToken";
import CreateTokenForm from "../pages/CreateTokenForm";
import CreateTOTForm from "../pages/CreateTOTForm";
import CreateNFTForm from "../pages/CreateNFTForm";

type GeneralPopupType = {
  onClose?: (ticker?: string) => void;
  children?: React.ReactNode;
  tag?: string;
};

const GeneralPopup: FunctionComponent<GeneralPopupType> = props => {
  const components = {
    "Token": CreateTokenForm,
    "Fiat": MintFiatToken,
    "NFT": CreateNFTForm,
    "TOT": CreateTOTForm,
    "Goods": CreateTOTForm,
    "Service": CreateTOTForm
  };

  const TagName = components[props.tag || 'Token'];

  return (
    <div className="generalpopup">
      {props.children}
      <TagName onClose={props.onClose} />
    </div>
  );
};

export default GeneralPopup;
