import { FunctionComponent } from "react";
import "./GeneralPopup.css";

type GeneralPopupType = {
  onClose?: () => void;
  children?: React.ReactNode;
};

const GeneralPopup: FunctionComponent<GeneralPopupType> = props => {
  return (
    <div className="generalpopup">
      <div>{props.children}</div>
    </div>
  );
};

export default GeneralPopup;
