import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import EntryButton from "../components/EntryButton";
import "./Market.css";

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const onWalletNameLabelClick = useCallback(() => {
    navigate("/redir/wallet");
  }, [navigate]);

  const onNFTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onTOTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onOrdersCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGroupButtonClick = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  const onTradesCountClick = useCallback(() => {
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
              <div className="nft-label-parent">
                <b className="nft-label">NFT</b>
                <button className="nft-count" onClick={onNFTCountClick}>
                  12
                </button>
              </div>
              <div className="tot-label-parent">
                <b className="nft-label">TOT</b>
                <button className="tot-count" onClick={onTOTCountClick}>
                  3
                </button>
              </div>
              <button
                className="orders-label-parent"
                onClick={onGroupButtonClick}
              >
                <b className="orders-label">Selling</b>
                <button className="orders-count" onClick={onOrdersCountClick}>
                  0
                </button>
              </button>
              <div className="trades-label-parent">
                <b className="nft-label">Buying</b>
                <button className="trades-count" onClick={onTradesCountClick}>
                  0
                </button>
              </div>
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
                src="../asserts/qrcode-icon.svg"
              />
            </div>
            <div className="wallet-decoration">LYRA WALLET</div>
            <div className="rectangle5" />
            <div className="rectangle6" />
          </div>
        </div>
      </div>
      <div className="iconssection">
        <div className="dao-button-parent">
          <EntryButton
            homeIconInterlocution="../asserts/home--icon--interlocution.svg"
            ranking="DAO"
          />
          <EntryButton
            homeIconInterlocution="../asserts/home--icon--interlocution1.svg"
            ranking="OTC"
          />
          <EntryButton
            homeIconInterlocution="../asserts/home--icon--interlocution2.svg"
            ranking="Invest"
          />
          <EntryButton
            homeIconInterlocution="../asserts/home--icon--interlocution3.svg"
            ranking="Swap"
          />
        </div>
      </div>
      <div className="iconssection">
        <div className="dao-button-parent">
          <button className="dex-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="../asserts/home--icon--interlocution4.svg"
            />
            <div className="ranking">DEX</div>
          </button>
          <button className="dex-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="../asserts/home--icon--interlocution5.svg"
            />
            <div className="ranking">NFT</div>
          </button>
          <button className="dex-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="../asserts/home--icon--interlocution6.svg"
            />
            <div className="ranking">Mint</div>
          </button>
          <button className="dex-button">
            <img
              className="home-icon-interlocution"
              alt=""
              src="../asserts/home--icon--interlocution7.svg"
            />
            <div className="ranking">Staking</div>
          </button>
        </div>
      </div>
      <div className="lasttransactions">
        <div className="recent-transaction">Recent transaction</div>
        <div className="frame-div">
          <div className="div11">
            <div className="buy-tv-at-sony-store">Receive</div>
            <div className="div12">From Harry James</div>
            <b className="b">+ 1000 LYR</b>
            <img className="path-icon3" alt="" src="../asserts/path3.svg" />
            <div className="div13">10 Min ago</div>
          </div>
          <div className="copy">
            <div className="buy-tv-at-sony-store1">Send</div>
            <div className="div14">From USD wallet</div>
            <div className="div15">- 100 LYR</div>
            <img className="path-icon4" alt="" src="../asserts/path4.svg" />
            <div className="div16">10 Min ago</div>
          </div>
        </div>
        <button className="more" onClick={onMoreClick}>
          More
        </button>
      </div>
    </div>
  );
};

export default Market;
