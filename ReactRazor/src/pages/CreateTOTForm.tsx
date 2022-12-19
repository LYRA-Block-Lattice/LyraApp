import { FunctionComponent, useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CreateTOTForm.css";

const CreateTOTForm: FunctionComponent = () => {
  const [selectTypeOfTOTAnchorEl, setSelectTypeOfTOTAnchorEl] =
    useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const selectTypeOfTOTOpen = Boolean(selectTypeOfTOTAnchorEl);
  const handleSelectTypeOfTOTClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectTypeOfTOTAnchorEl(event.currentTarget);
  };
  const handleSelectTypeOfTOTClose = () => {
    setSelectTypeOfTOTAnchorEl(null);
  };

  const onSignTradeSecretButtonClick = useCallback(() => {
    navigate("/signtradesecretform");
  }, [navigate]);

  return (
    <form className="createtotform">
      <div className="create-tot">Create TOT</div>
      <input className="tot-name" type="text" placeholder="TOT Name" />
      <div className="selecttypeoftot">
        <Button
          sx={{ width: 301 }}
          id="button-Select Type of TOT"
          aria-controls="menu-Select Type of TOT"
          aria-haspopup="true"
          aria-expanded={selectTypeOfTOTOpen ? "true" : undefined}
          onClick={handleSelectTypeOfTOTClick}
          color="primary"
        >
          Select Type of TOT
        </Button>
        <Menu
          anchorEl={selectTypeOfTOTAnchorEl}
          open={selectTypeOfTOTOpen}
          onClose={handleSelectTypeOfTOTClose}
        />
      </div>
      <input className="tot-supply" type="text" placeholder="Total Supply" />
      <input
        className="tot-description2"
        type="text"
        placeholder="Public Description, seen by everyone"
      />
      <button
        className="sign-trade-secret-button1"
        onClick={onSignTradeSecretButtonClick}
      >
        <div className="frame-div1" />
        <div className="sign-trade-secretoptional">
          Sign trade secret(Optional)
        </div>
      </button>
      <div className="note-i-need-to-send-trade-sec">
        Note: I need to send trade secret privately to buyer(s).
      </div>
      <button className="create-tot-button">
        <div className="rectangle-div1" />
        <div className="create-tot1">Create TOT</div>
      </button>
    </form>
  );
};

export default CreateTOTForm;
