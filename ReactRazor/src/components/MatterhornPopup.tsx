import { FunctionComponent } from "react";
import "./MatterhornPopup.css";

type MatterhornPopupType = {
  onClose?: () => void;
};

const MatterhornPopup: FunctionComponent<MatterhornPopupType> = ({
  onClose,
}) => {
  return (
    <div className="matterhorn-popup">
      <video className="video" controls autoPlay muted>
        <source src="https://lyra.live/assets/img/lyra.mp4" />
      </video>
    </div>
  );
};

export default MatterhornPopup;
