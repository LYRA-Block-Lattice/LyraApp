import { FunctionComponent, useCallback } from "react";
import "./AssertDetailView.css";

const AssertDetailView: FunctionComponent = () => {
  const onPrepareSellOrderButtonClick = useCallback(() => {
    // Please sync "SelectTokenForOrder" to the project
  }, []);

  return (
    <div className="assertdetailview">
      <div className="asserttitleregion">
        <div className="assertauthorsection">
          <div className="a-legend-token">A legend token seller</div>
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
      <div className="priceandbuyregion">
        <div className="pricelabel">
          <div className="meka-legends">Current Price</div>
        </div>
        <div className="priceandvaluelabel">
          <div className="meka-legends">0.0325 ETH</div>
          <div className="div">$86.20</div>
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
    </div>
  );
};

export default AssertDetailView;
