import { FunctionComponent, useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./SelectTokenNameForm.css";

const SelectTokenNameForm: FunctionComponent = () => {
  const [selectTokenAnchorEl, setSelectTokenAnchorEl] =
    useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const selectTokenOpen = Boolean(selectTokenAnchorEl);
  const handleSelectTokenClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectTokenAnchorEl(event.currentTarget);
  };
  const handleSelectTokenClose = () => {
    setSelectTokenAnchorEl(null);
  };

  const onConfrimSelectTokenButtonClick = useCallback(() => {
    navigate("/selecttokenfororder");
  }, [navigate]);

  return (
    <form className="selecttokennameform">
      <div className="select-token2">Select Token</div>
      <div className="select-token3">
        <Button
          sx={{ width: 301 }}
          id="button-Token Name"
          aria-controls="menu-Token Name"
          aria-haspopup="true"
          aria-expanded={selectTokenOpen ? "true" : undefined}
          onClick={handleSelectTokenClick}
          color="primary"
        >
          Token Name
        </Button>
        <Menu
          anchorEl={selectTokenAnchorEl}
          open={selectTokenOpen}
          onClose={handleSelectTokenClose}
        />
      </div>
      <button
        className="confrim-select-token-button"
        onClick={onConfrimSelectTokenButtonClick}
      >
        <div className="rectangle-div2" />
        <div className="confirm">Confirm</div>
      </button>
    </form>
  );
};

export default SelectTokenNameForm;
