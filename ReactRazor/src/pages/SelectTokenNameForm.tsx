import { FunctionComponent, useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import "./SelectTokenNameForm.css";

const SelectTokenNameForm: FunctionComponent = () => {
  const [selectTokenAnchorEl, setSelectTokenAnchorEl] =
    useState<HTMLElement | null>(null);
  const selectTokenOpen = Boolean(selectTokenAnchorEl);
  const handleSelectTokenClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectTokenAnchorEl(event.currentTarget);
  };
  const handleSelectTokenClose = () => {
    setSelectTokenAnchorEl(null);
  };

  return (
    <form className="selecttokennameform">
      <div className="select-token">Select Token</div>
      <div>
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
      <button className="prepare-sell-order-button8">
        <div className="secondary-button3">Confirm</div>
      </button>
    </form>
  );
};

export default SelectTokenNameForm;
