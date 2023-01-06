import { FunctionComponent, useState, useCallback, useEffect } from "react";
import MatterhornPopup from "../components/MatterhornPopup";
import PortalPopup from "../components/PortalPopup";
import * as NebStore from "../dup/Store";
import { LyraCrypto } from "lyra-crypto";

import "./Empty.css";

const Empty: FunctionComponent = () => {
  const [isMatterhornPopupOpen, setMatterhornPopupOpen] = useState(false);

  const openMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(true);
  }, []);

  const closeMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(false);
  }, []);

  useEffect(() => {

  }, []);

  return (
    <>
      <div className="empty">
        <button
          className="pxl-20210309-203454756-1"
          onClick={openMatterhornPopup}
        />
        <div className="should-not-see">Should not see me</div>
      </div>
      {isMatterhornPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMatterhornPopup}
        >
          <MatterhornPopup onClose={closeMatterhornPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Empty;
