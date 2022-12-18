import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import NavigationIcon from "../components/NavigationIcon";
import "./Market.css";

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const onWalletNameLabelClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onTradesCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onOrdersCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onTFTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onNFTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onRectangleCopy3Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onQRCodeButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onSwapButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onMoreClick = useCallback(() => {
    navigate("/transactionhistory");
  }, [navigate]);

  return (
    <div className="market">
      <div className="bannersection">
        <div className="walletcard">
          <div className="mask-group">
            <WalletCard />
            <button
              className="wallet-name-label"
              onClick={onWalletNameLabelClick}
            >
              My Primary Account
            </button>
            <div className="basebalance">
              <span>
                <b>120,000</b>
                <span className="span">
                  <span className="span1">{` `}</span>
                </span>
              </span>
              <span className="span">
                <span>LYR</span>
              </span>
            </div>
            <div className="aux-balance">
              <span>
                <span className="span2">500</span>
                <span>{`          `}</span>
              </span>
              <span className="span">USDT</span>
            </div>
            <div className="token-lists">
              <div className="token-catalog">
                <div className="div">2</div>
              </div>
              <b className="trades-label">Trade</b>
              <button className="trades-count" onClick={onTradesCountClick}>
                0
              </button>
              <b className="orders-label">Orders</b>
              <button className="orders-count" onClick={onOrdersCountClick}>
                0
              </button>
              <b className="tft-label">TFT</b>
              <button className="tft-count" onClick={onTFTCountClick}>
                3
              </button>
              <b className="nft-label">NFT</b>
              <button className="nft-count" onClick={onNFTCountClick}>
                12
              </button>
            </div>
            <button className="qrcode-button" onClick={onQRCodeButtonClick}>
              <button
                className="rectangle-copy-3"
                onClick={onRectangleCopy3Click}
              />
              <img
                className="iconglyphbuy-copy-21"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphbuy-copy-21.svg"
              />
            </button>
            <div className="wallet-decoration">LYRA WALLET</div>
            <div className="rectangle" />
            <div className="rectangle1" />
          </div>
        </div>
      </div>
      <div className="iconssection">
        <div className="frame-div">
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution.svg"
            ranking="OTC"
          />
          <button className="swap-button" onClick={onSwapButtonClick}>
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution1.svg"
            />
            <div className="ranking">OTC</div>
          </button>
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution1.svg"
            ranking="Invest"
          />
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution2.svg"
            ranking="Swap"
          />
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution3.svg"
            ranking="DEX"
          />
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution4.svg"
            ranking="NFT"
          />
          <NavigationIcon
            homeIconSurrounding="_content/ReactRazor/asserts/home--icon--interlocution5.svg"
            ranking="Mint"
          />
          <button className="swap-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="_content/ReactRazor/asserts/home--icon--interlocution7.svg"
            />
            <div className="ranking">Staking</div>
          </button>
        </div>
      </div>
      <div className="lasttransactions">
        <div className="recent-transaction">Recent transaction</div>
        <div className="frame-div1">
          <div className="div1">
            <div className="buy-tv-at-sony-store">Receive</div>
            <div className="div2">From Harry James</div>
            <b className="b">+ 1000 LYR</b>
            <img className="path-icon" alt="" src="_content/ReactRazor/asserts/path.svg" />
          </div>
          <div className="copy">
            <div className="buy-tv-at-sony-store">Send</div>
            <div className="div2">From USD wallet</div>
            <div className="div4">- 100 LYR</div>
            <img className="path-icon" alt="" src="_content/ReactRazor/asserts/path1.svg" />
          </div>
          <div className="div5">10 Min ago</div>
          <div className="div6">10 Min ago</div>
        </div>
        <button className="more" onClick={onMoreClick}>
          More
        </button>
      </div>
      <div className="dealsection">
        <div className="rectangle2" />
        <b className="yellow-sofa">Yellow sofa</b>
        <div className="div7">{`$600 `}</div>
        <div className="group-div">
          <div className="div8">$1.200</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-2.svg"
          />
        </div>
        <div className="div9">4.8</div>
        <div className="div10">(849)</div>
        <img
          className="iconglyphstar"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar.svg"
        />
        <div className="end-in-12001">End in 1:20:01</div>
        <img
          className="iconglyphstar-copy"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar-copy.svg"
        />
        <div className="group-div1">
          <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-5.svg" />
          <div className="rectangle3" />
          <div className="div11">50%</div>
        </div>
        <div className="rectangle4" />
        <b className="blue-sofa">Blue sofa</b>
        <div className="div12">{`$750 `}</div>
        <div className="group-div2">
          <div className="div13">$1.500</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-21.svg"
          />
        </div>
        <div className="div14">4.8</div>
        <div className="div15">(849)</div>
        <img
          className="iconglyphstar1"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar1.svg"
        />
        <div className="end-in-120011">End in 1:20:01</div>
        <img
          className="iconglyphstar-copy1"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar-copy1.svg"
        />
        <div className="group-div3">
          <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-51.svg" />
          <div className="rectangle3" />
          <div className="div11">50%</div>
        </div>
        <b className="deal-of-the-day">Deal of the day</b>
        <b className="see-all">See all</b>
        <img className="frame-icon" alt="" src="_content/ReactRazor/asserts/frame.svg" />
        <img className="frame-icon1" alt="" src="_content/ReactRazor/asserts/frame1.svg" />
      </div>
    </div>
  );
};

export default Market;
