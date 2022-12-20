import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Empty.css";

const Empty: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPXL202103092034547561Click = useCallback(() => {
    navigate("/market");
  }, [navigate]);

  return (
    <div className="empty">
      <button
        className="pxl-20210309-203454756-1"
        onClick={onPXL202103092034547561Click}
      />
      <div className="should-not-see-me">Should not see me</div>
    </div>
  );
};

export default Empty;
