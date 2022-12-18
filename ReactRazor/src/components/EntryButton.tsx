import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./EntryButton.css";

type EntryButtonType = {
  homeIconInterlocution?: string;
  ranking?: string;
};

const EntryButton: FunctionComponent<EntryButtonType> = ({
  homeIconInterlocution,
  ranking,
}) => {
  const navigate = useNavigate();

  const onDaoButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  return (
    <button className="dao-button" onClick={onDaoButtonClick}>
      <img
        className="home-icon-interlocution"
        alt=""
        src={homeIconInterlocution}
      />
      <div className="ranking">{ranking}</div>
    </button>
  );
};

export default EntryButton;
