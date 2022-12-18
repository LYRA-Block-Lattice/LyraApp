import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import EntryButton from "../components/EntryButton";
import TxInfoBar from "../components/TxInfoBar";
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

  const onQRCodeButtonRoundClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onQRCodeButtonContainerClick = useCallback(() => {
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
        <div className="frame-div">
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
        <div className="frame-div1">
          <TxInfoBar
            buyTVAtSonyStore="Receive"
            component="From Harry James"
            component1="+ 1000 LYR"
            path="path3.svg"
          />
          <TxInfoBar
            componentZIndex="1"
            buyTVAtSonyStore="Send"
            component="From USD wallet"
            component1="- 100 LYR"
            componentColor="#d15252"
            componentFontWeight="600"
            path="path4.svg"
          />
          <div className="div1">10 Min ago</div>
          <div className="div2">10 Min ago</div>
        </div>
        <button className="more" onClick={onMoreClick}>
          More
        </button>
      </div>
      <div className="dealsection">
        <div className="rectangle2" />
        <b className="yellow-sofa">Yellow sofa</b>
        <div className="div3">{`$600 `}</div>
        <div className="group-div">
          <div className="div4">$1.200</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-2.svg"
          />
        </div>
        <div className="div5">4.8</div>
        <div className="div6">(849)</div>
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
          <div className="div7">50%</div>
        </div>
        <div className="rectangle4" />
        <b className="blue-sofa">Blue sofa</b>
        <div className="div8">{`$750 `}</div>
        <div className="group-div2">
          <div className="div9">$1.500</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-21.svg"
          />
        </div>
        <div className="div10">4.8</div>
        <div className="div11">(849)</div>
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
          <div className="div7">50%</div>
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
