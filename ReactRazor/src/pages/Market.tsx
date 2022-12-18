import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import EntryButton from "../components/EntryButton";
import TxInfoBar from "../components/TxInfoBar";
import "./Market.css";

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const onWalletNameLabelClick = useCallback(() => {
    navigate("/redir/wallet");
  }, [navigate]);

  const onTradesCountClick = useCallback(() => {
    navigate("/redir/trades");
  }, [navigate]);

  const onOrdersCountClick = useCallback(() => {
    navigate("/redir/orders");
  }, [navigate]);

  const onTFTCountClick = useCallback(() => {
    navigate("/redir/tft");
  }, [navigate]);

  const onNFTCountClick = useCallback(() => {
    navigate("/redir/nft");
  }, [navigate]);

  const onRectangleCopy3Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onQRCodeButtonClick = useCallback(() => {
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
                <div className="div8">2</div>
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
                className="rectangle-copy-32"
                onClick={onRectangleCopy3Click}
              />
              <img
                className="iconglyphbuy-copy-21"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphbuy-copy-21.svg"
              />
            </button>
            <div className="wallet-decoration">LYRA WALLET</div>
            <div className="rectangle5" />
            <div className="rectangle6" />
          </div>
        </div>
      </div>
      <div className="iconssection">
        <div className="frame-div1">
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution.svg"
            ranking="DAO"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution1.svg"
            ranking="OTC"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution2.svg"
            ranking="Invest"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution3.svg"
            ranking="Swap"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution4.svg"
            ranking="DEX"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution5.svg"
            ranking="NFT"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution6.svg"
            ranking="Mint"
          />
          <EntryButton
            homeIconInterlocution="_content/ReactRazor/asserts/home--icon--interlocution7.svg"
            ranking="Staking"
          />
        </div>
      </div>
      <div className="lasttransactions">
        <div className="recent-transaction">Recent transaction</div>
        <div className="frame-div2">
          <TxInfoBar
            buyTVAtSonyStore="Receive"
            component="From Harry James"
            component1="+ 1000 LYR"
            path="_content/ReactRazor/asserts/path3.svg"
          />
          <TxInfoBar
            componentZIndex="1"
            buyTVAtSonyStore="Send"
            component="From USD wallet"
            component1="- 100 LYR"
            componentColor="#d15252"
            componentFontWeight="600"
            path="_content/ReactRazor/asserts/path4.svg"
          />
          <div className="div9">10 Min ago</div>
          <div className="div10">10 Min ago</div>
        </div>
        <button className="more" onClick={onMoreClick}>
          More
        </button>
      </div>
      <div className="dealsection">
        <div className="rectangle7" />
        <b className="yellow-sofa">Yellow sofa</b>
        <div className="div11">{`$600 `}</div>
        <div className="group-div9">
          <div className="div12">$1.200</div>
          <img
            className="iconglyphstar-copy-23"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-23.svg"
          />
        </div>
        <div className="div13">4.8</div>
        <div className="div14">(849)</div>
        <img
          className="iconglyphstar3"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar3.svg"
        />
        <div className="end-in-12001">End in 1:20:01</div>
        <img
          className="iconglyphstar-copy3"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar-copy3.svg"
        />
        <div className="group-div10">
          <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-5.svg" />
          <div className="rectangle8" />
          <div className="div15">50%</div>
        </div>
        <div className="rectangle9" />
        <b className="blue-sofa">Blue sofa</b>
        <div className="div16">{`$750 `}</div>
        <div className="group-div11">
          <div className="div17">$1.500</div>
          <img
            className="iconglyphstar-copy-23"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-24.svg"
          />
        </div>
        <div className="div18">4.8</div>
        <div className="div19">(849)</div>
        <img
          className="iconglyphstar4"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar4.svg"
        />
        <div className="end-in-120011">End in 1:20:01</div>
        <img
          className="iconglyphstar-copy4"
          alt=""
          src="_content/ReactRazor/asserts/iconglyphstar-copy4.svg"
        />
        <div className="group-div12">
          <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-51.svg" />
          <div className="rectangle8" />
          <div className="div15">50%</div>
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
