import { FunctionComponent } from "react";
import "./NavigationIcon.css";

type NavigationIconType = {
  homeIconSurrounding?: string;
  ranking?: string;
};

const NavigationIcon: FunctionComponent<NavigationIconType> = ({
  homeIconSurrounding,
  ranking,
}) => {
  return (
    <button className="home-icon-component">
      <img className="home-icon-surrounding" alt="" src={homeIconSurrounding} />
      <div className="ranking">{ranking}</div>
    </button>
  );
};

export default NavigationIcon;
