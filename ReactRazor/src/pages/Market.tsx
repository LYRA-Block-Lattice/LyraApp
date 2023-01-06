import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import SellItem from "../components/SellItem";
import "./Market.css";

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const onNFTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGoNFTButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onTOTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGoTOTButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onSellingCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGoSellingButtonClick = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  const onBuyingCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGoBuyingButtonClick = useCallback(() => {
    navigate("/viewtradesform");
  }, [navigate]);

  const onWalletNameLabelClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onQRCodeButtonRoundClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onQRCodeButtonContainerClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onDaoButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onSwapButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onInvestButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onSwapButton1Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  return (
    <div className="market">
      <div className="bannersection">
        <div className="walletcard">
          <div className="mask-group">
            <div className="maps-parent">
              <img className="maps-icon" alt="" src="_content/ReactRazor/asserts/maps.svg" />
              <a className="balance-display-zone">
                <b className="usdtbalance">1,025,000</b>
                <b className="lyrlabel">LYR</b>
                <div className="balance-display-zone-child" />
                <b className="usdtbalance">5,000</b>
                <b className="lyrlabel">USDT</b>
              </a>
              <div className="token-lists">
                <button className="go-nft-button" onClick={onGoNFTButtonClick}>
                  <button className="nft-count" onClick={onNFTCountClick}>
                    12
                  </button>
                  <b className="nft-label">NFT</b>
                </button>
                <button className="go-nft-button" onClick={onGoTOTButtonClick}>
                  <button className="tot-count" onClick={onTOTCountClick}>
                    3
                  </button>
                  <b className="nft-label">TOT</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoSellingButtonClick}
                >
                  <button className="tot-count" onClick={onSellingCountClick}>
                    0
                  </button>
                  <b className="nft-label">Selling</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoBuyingButtonClick}
                >
                  <button className="tot-count" onClick={onBuyingCountClick}>
                    0
                  </button>
                  <b className="nft-label">Buying</b>
                </button>
              </div>
            </div>
            <button
              className="wallet-name-label"
              onClick={onWalletNameLabelClick}
            >
              My Primary Account
            </button>
            <div
              className="qrcode-button"
              onClick={onQRCodeButtonContainerClick}
            >
              <div
                className="qrcode-button-round"
                onClick={onQRCodeButtonRoundClick}
              />
              <img
                className="qrcode-icon"
                alt=""
                src="_content/ReactRazor/asserts/qrcode-icon.svg"
              />
            </div>
            <div className="wallet-decoration">LYRA WALLET</div>
            <div className="rectangle" />
            <div className="rectangle1" />
          </div>
        </div>
      </div>
      <div className="iconssection">
        <div className="dao-button-parent">
          <button className="dao-button" onClick={onDaoButtonClick}>
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution.svg"
            />
            <div className="ranking">DAO</div>
          </button>
          <button className="dao-button" onClick={onSwapButtonClick}>
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution1.svg"
            />
            <div className="ranking">OTC</div>
          </button>
          <button className="dao-button" onClick={onInvestButtonClick}>
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution2.svg"
            />
            <div className="ranking">Invest</div>
          </button>
          <button className="dao-button" onClick={onSwapButton1Click}>
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution3.svg"
            />
            <div className="ranking">Swap</div>
          </button>
        </div>
      </div>
      <div className="iconssection">
        <div className="dao-button-parent">
          <button className="dao-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution4.svg"
            />
            <div className="ranking">DEX</div>
          </button>
          <button className="dao-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution5.svg"
            />
            <div className="ranking">NFT</div>
          </button>
          <button className="dao-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution6.svg"
            />
            <div className="ranking">Mint</div>
          </button>
          <button className="dao-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution7.svg"
            />
            <div className="ranking">Staking</div>
          </button>
        </div>
      </div>
      <div className="catalogselectionhorizontal-parent">
        <div className="catalogselectionhorizontal">
          <div className="tradecatalog">
            <button className="select-token-catalog-button">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src="_content/ReactRazor/asserts/icbaselinegeneratingtokens4.svg"
              />
              <div className="token-wrapper">
                <b className="token">Token</b>
              </div>
            </button>
            <button className="select-token-catalog-button">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src="_content/ReactRazor/asserts/mapartgallery2.svg"
              />
              <div className="token-wrapper">
                <b className="token">NFT</b>
              </div>
            </button>
            <button className="select-token-catalog-button">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src="_content/ReactRazor/asserts/fluentemojihighcontrastdollarbanknote2.svg"
              />
              <div className="token-wrapper">
                <b className="fiat">Fiat</b>
              </div>
            </button>
            <button className="select-token-catalog-button">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src="_content/ReactRazor/asserts/mditruckdelivery2.svg"
              />
              <div className="token-wrapper">
                <b className="goods">Goods</b>
              </div>
            </button>
            <button className="select-token-catalog-button">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src="_content/ReactRazor/asserts/carbonuserservicedesk4.svg"
              />
              <div className="token-wrapper">
                <b className="fiat">Service</b>
              </div>
            </button>
          </div>
        </div>
        <SellItem
          sellerName="A big seller"
          offering="BTC"
          biding="tether/USDT"
          sellerRating="98%"
          lastUpdated="12/29/2022 10:25:37 AM"
          orderStatus="Open"
          price="10,323"
          amount="1113.2"
          limitMin="3.2"
          limitMax="3.2"
          sold="123"
          shelf="123"
        />
      </div>
    </div>
  );
};

export default Market;
