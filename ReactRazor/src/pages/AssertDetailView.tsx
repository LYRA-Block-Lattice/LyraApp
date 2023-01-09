import { FunctionComponent, useCallback } from "react";
import { Box, Slider } from "@mui/material";
import "./AssertDetailView.css";

const AssertDetailView: FunctionComponent = () => {
  const onPrepareSellOrderButtonClick = useCallback(() => {
    // Please sync "SelectTokenForOrder" to the project
  }, []);

  return (
    <div className="assertdetailview">
      <div className="assertdetailview1">
        <div className="asserttitleregion">
          <div className="assertauthorsection">
            <div className="a-legend-nft">A legend NFT author</div>
            <div className="material-symbolsshare-parent">
              <img
                className="material-symbolsshare-icon"
                alt=""
                src="_content/ReactRazor/asserts/materialsymbolsshare.svg"
              />
              <img
                className="material-symbolsshare-icon"
                alt=""
                src="_content/ReactRazor/asserts/carbonoverflowmenuhorizontal.svg"
              />
            </div>
          </div>
          <div className="asserttitlesection">
            <div className="meka-legends">Meka Legends # 500</div>
          </div>
          <div className="assertownersection">
            <div className="meka-legends">Owner someone</div>
          </div>
        </div>
        <div className="asserttitleregion">
          <div className="icon-park-solidblockchain-wrapper">
            <img
              className="material-symbolsshare-icon"
              alt=""
              src="_content/ReactRazor/asserts/iconparksolidblockchain.svg"
            />
          </div>
          <img
            className="titlebannerregion-child"
            alt=""
            src="_content/ReactRazor/asserts/frame-61@2x.png"
          />
        </div>
        <div className="assertstatssection">
          <div className="icoutline-remove-red-eye-parent">
            <img
              className="material-symbolsshare-icon"
              alt=""
              src="_content/ReactRazor/asserts/icoutlineremoveredeye.svg"
            />
            <div className="meka-legends">32 views</div>
          </div>
          <div className="icoutline-remove-red-eye-parent">
            <img
              className="material-symbolsshare-icon"
              alt=""
              src="_content/ReactRazor/asserts/mdicardsheartoutline.svg"
            />
            <div className="meka-legends">5 favorite</div>
          </div>
          <div className="icoutline-remove-red-eye-parent">
            <img
              className="material-symbolsshare-icon"
              alt=""
              src="_content/ReactRazor/asserts/mdishapeoutline.svg"
            />
            <div className="meka-legends">Fiat OTC</div>
          </div>
        </div>
      </div>
      <div className="descriptiontitle">
        <img
          className="material-symbolsshare-icon"
          alt=""
          src="_content/ReactRazor/asserts/fluenttextdescription20filled.svg"
        />
        <div className="meka-legends">Description</div>
      </div>
      <div className="descriptiondetails">
        <div className="meka-legends">By A great designer</div>
      </div>
      <div className="descriptiontitle">
        <img
          className="material-symbolsshare-icon"
          alt=""
          src="_content/ReactRazor/asserts/icoutlinepricechange.svg"
        />
        <div className="meka-legends">Price and payment</div>
      </div>
      <div className="buysection">
        <div className="priceandbuyregion">
          <div className="pricelabel">
            <div className="meka-legends">Current Price</div>
          </div>
          <div className="priceandvaluelabel">
            <div className="meka-legends">0.0325 ETH</div>
            <div className="tetherusdt">$86.20</div>
          </div>
        </div>
        <div className="selectamountsection">
          <div className="setlimitsection">
            <div className="pricelabel1">
              <div className="meka-legends">Available to buy</div>
            </div>
            <div className="priceandvaluelabel1">
              <div className="meka-legends">100 - 200</div>
              <div className="tetherusdt">tether/USDT</div>
              <div className="div6">$40 ~ 84.20</div>
            </div>
          </div>
          <div className="limitadjustsection">
            <div className="meka-legends">Min</div>
            <Box className="slidercontinuous">
              <Slider
                color="primary"
                defaultValue={20}
                orientation="horizontal"
              />
            </Box>
            <div className="meka-legends">Max</div>
          </div>
          <input className="selectedamount" type="number" placeholder="150" />
        </div>
        <div className="makeofferbutton">
          <button
            className="prepare-sell-order-button"
            onClick={onPrepareSellOrderButtonClick}
          >
            <img
              className="material-symbolsshare-icon"
              alt=""
              src="_content/ReactRazor/asserts/evapricetagsoutline.svg"
            />
            <div className="primary-button">Make offer</div>
          </button>
        </div>
        <div className="descriptiontitle">
          <img
            className="material-symbolsshare-icon"
            alt=""
            src="_content/ReactRazor/asserts/galasecure.svg"
          />
          <div className="meka-legends">Trading protection</div>
        </div>
        <div className="descriptiondetails">
          <div className="a-legend-nft">
            This order is protected by staking of 100,000 LYR, or $1,000 in USD,
            from the seller. This order belongs to DAO ‘A good shop’ which has a
            total staking of 30,000,000 LYR.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssertDetailView;
