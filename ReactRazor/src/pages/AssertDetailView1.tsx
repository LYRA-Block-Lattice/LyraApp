import { FunctionComponent, useCallback } from "react";
import "./AssertDetailView1.css";

const AssertDetailView1: FunctionComponent = () => {
  const onPrepareSellOrderButtonClick = useCallback(() => {
    // Please sync "SelectTokenForOrder" to the project
  }, []);

  return (
    <div className="assertdetailview2">
      <div className="asserttitleregion1">
        <div className="assertauthorsection1">
          <div className="a-legend-token1">A legend token seller</div>
          <div className="material-symbolsshare-group">
            <img
              className="material-symbolsshare-icon1"
              alt=""
              src="_content/ReactRazor/asserts/materialsymbolsshare.svg"
            />
            <img
              className="material-symbolsshare-icon1"
              alt=""
              src="_content/ReactRazor/asserts/carbonoverflowmenuhorizontal.svg"
            />
          </div>
        </div>
        <div className="asserttitlesection1">
          <div className="meka-legends1">Meka Legends # 500</div>
        </div>
        <div className="assertownersection1">
          <div className="meka-legends1">Owner someone</div>
        </div>
      </div>
      <div className="asserttitleregion1">
        <div className="icon-park-solidblockchain-container">
          <img
            className="material-symbolsshare-icon1"
            alt=""
            src="_content/ReactRazor/asserts/iconparksolidblockchain.svg"
          />
        </div>
        <img
          className="titlebannerregion-item"
          alt=""
          src="_content/ReactRazor/asserts/frame-61@2x.png"
        />
      </div>
      <div className="assertstatssection1">
        <div className="icoutline-remove-red-eye-group">
          <img
            className="material-symbolsshare-icon1"
            alt=""
            src="_content/ReactRazor/asserts/icoutlineremoveredeye.svg"
          />
          <div className="meka-legends1">32 views</div>
        </div>
        <div className="icoutline-remove-red-eye-group">
          <img
            className="material-symbolsshare-icon1"
            alt=""
            src="_content/ReactRazor/asserts/mdicardsheartoutline.svg"
          />
          <div className="meka-legends1">5 favorite</div>
        </div>
        <div className="icoutline-remove-red-eye-group">
          <img
            className="material-symbolsshare-icon1"
            alt=""
            src="_content/ReactRazor/asserts/mdishapeoutline.svg"
          />
          <div className="meka-legends1">Fiat OTC</div>
        </div>
      </div>
      <div className="priceandbuyregion1">
        <div className="pricelabel2">
          <div className="meka-legends1">Current Price</div>
        </div>
        <div className="priceandvaluelabel2">
          <div className="meka-legends1">0.0325 ETH</div>
          <div className="div3">$86.20</div>
        </div>
        <div className="makeofferbutton1">
          <button
            className="prepare-sell-order-button18"
            onClick={onPrepareSellOrderButtonClick}
          >
            <img
              className="material-symbolsshare-icon1"
              alt=""
              src="_content/ReactRazor/asserts/evapricetagsoutline.svg"
            />
            <div className="primary-button3">Make offer</div>
          </button>
        </div>
      </div>
      <div className="descriptiontitle1">
        <img
          className="material-symbolsshare-icon1"
          alt=""
          src="_content/ReactRazor/asserts/fluenttextdescription20filled.svg"
        />
        <div className="meka-legends1">Description</div>
      </div>
      <div className="descriptiondetails1">
        <div className="meka-legends1">By A great designer</div>
      </div>
    </div>
  );
};

export default AssertDetailView1;
