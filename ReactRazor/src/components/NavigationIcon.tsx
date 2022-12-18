import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./NavigationIcon.css";

type NavigationIconType = {
  homeIconSurrounding?: string;
  ranking?: string;
};

const NavigationIcon: FunctionComponent<NavigationIconType> = ({
  homeIconSurrounding,
  ranking,
}) => {
  const navigate = useNavigate();

  const onDaoButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  return (
    <button className="dao-button" onClick={onDaoButtonClick}>
      <img
        className="home-icon-interlocution2"
        alt=""
        src={homeIconSurrounding}
      />
      <div className="ranking2">{ranking}</div>
    </button>
  );
};

export default NavigationIcon;
