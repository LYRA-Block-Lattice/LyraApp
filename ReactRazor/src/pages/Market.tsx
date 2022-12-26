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
          <TxInfoBar
            buyTVAtSonyStore="Receive"
            component="From Harry James"
            component1="+ 1000 LYR"
            path="../asserts/path3.svg"
          />
          <TxInfoBar
            componentWidth="333px"
            buyTVAtSonyStore="Send"
            component="From USD wallet"
            component1="- 100 LYR"
            componentColor="#d15252"
            componentFontWeight="600"
            path="../asserts/path4.svg"
            componentTop="27px"
            componentRight="8px"
          />
        </div>
        <button className="more" onClick={onMoreClick}>
          More
        </button>
      </div>
    </div>
  );
};

export default Market;
