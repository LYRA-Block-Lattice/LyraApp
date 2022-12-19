import { FunctionComponent, useState, useCallback } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PriceAndCollateralForm.css";

const PriceAndCollateralForm: FunctionComponent = () => {
  const [selectTokenAnchorEl, setSelectTokenAnchorEl] =
    useState<HTMLElement | null>(null);
  const [selectToken1AnchorEl, setSelectToken1AnchorEl] =
    useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const selectTokenOpen = Boolean(selectTokenAnchorEl);
  const handleSelectTokenClick = (event: React.MouseEvent<HTMLElement>) => {
    setSelectTokenAnchorEl(event.currentTarget);
  };
  const handleSelectTokenClose = () => {
    setSelectTokenAnchorEl(null);
  };
  const selectToken1Open = Boolean(selectToken1AnchorEl);
  const handleSelectToken1Click = (event: React.MouseEvent<HTMLElement>) => {
    setSelectToken1AnchorEl(event.currentTarget);
  };
  const handleSelectToken1Close = () => {
    setSelectToken1AnchorEl(null);
  };

  const onReviewOrderButtonClick = useCallback(() => {
    navigate("/previewsellorderform");
  }, [navigate]);

  return (
    <div className="priceandcollateralform">
      <div className="price-and-collateral">Price and Collateral</div>
      <div className="select-token">
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
      <div className="select-token1">
        <Button
          sx={{ width: 301 }}
          id="button-Token Name"
          aria-controls="menu-Token Name"
          aria-haspopup="true"
          aria-expanded={selectToken1Open ? "true" : undefined}
          onClick={handleSelectToken1Click}
          color="primary"
        >
          Token Name
        </Button>
        <Menu
          anchorEl={selectToken1AnchorEl}
          open={selectToken1Open}
          onClose={handleSelectToken1Close}
        />
      </div>
      <div className="offering-for-biding">1 [offering] for [biding]:</div>
      <div className="collateral-in-lyr">Collateral (in LYR):</div>
      <div className="collateral-worth-in-usd-103">
        Collateral worth in USD: $103
      </div>
      <button
        className="review-order-button"
        onClick={onReviewOrderButtonClick}
      >
        <b className="review-the-order">Review the Order</b>
      </button>
    </div>
  );
};

export default PriceAndCollateralForm;
