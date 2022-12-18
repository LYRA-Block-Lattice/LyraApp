import { FunctionComponent } from "react";
import "./Empty.css";

const Empty: FunctionComponent = () => {
  return (
    <div className="empty">
      <img
        className="pxl-20210309-203454756-1-icon"
        alt=""
        src="../asserts/pxl-20210309-203454756-1@2x.png"
      />
      <div className="should-not-see-me">Should not see me</div>
    </div>
  );
};

export default Empty;
