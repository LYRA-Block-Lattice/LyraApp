import { ActionTypes } from "@mui/base";
import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getAppSelector } from "../app/selectors";
import TokenDisplayItem from "../components/TokenDisplayItem";
import * as actionTypes from "../app/actionTypes";
import "./WalletHome.css";

const WalletHome: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const app = useSelector(getAppSelector);

  const [sellcnt, setSellcnt] = useState(0);
  const [bidcnt, setBidcnt] = useState(0);

  useEffect(() => {
    dispatch({ type: actionTypes.WALLET_GET_BALANCE });
  }, [dispatch]);

  const onSwapButtonClick = useCallback(() => {
    navigate("/market");
  }, [navigate]);

  const showTokens = () => {
    console.log("in use call back to showTokens", app?.wallet?.balances);
    if (app.wallet.balances === undefined) return <div>No coins.</div>;
    else {
      return (
        <>
          {Object.keys(app.wallet.balances).map((a) => (
            <TokenDisplayItem
              coinIcon="_content/ReactRazor/asserts/lyralogoblackicon@2x.png"
              coinName={a}
              amountText={app.wallet.balances[a]}
              amountWorth="$2"
            />
          ))}
        </>
      );
    }
  };

  return (
    <div className="wallethome">
      <div className="wallet-card">
        <div className="wallet-card-inner">
          <div className="rectangle-wrapper">
            <div className="rectangle" />
          </div>
        </div>
        <div className="frame-parent">
          <div className="balance-display-zone-parent">
            <Link className="balance-display-zone" to="/openwallet">
              <button className="wallet-name-label">{app.name}</button>
              <div className="balance-display-zone-child" />
              <b className="usdtbalance">{app.wallet.balance}</b>
              <b className="lyrlabel">LYR</b>
              <div className="balance-display-zone-item" />
              <b className="usdtbalance">{app.wallet.usdt}</b>
              <b className="lyrlabel">USDT</b>
            </Link>
            <div className="qrcode-button-wrapper">
              <button className="qrcode-button">
                <div className="qrcode-button-round" />
                <img
                  className="qrcode-icon"
                  alt=""
                  src="_content/ReactRazor/asserts/qrcode-icon.svg"
                />
              </button>
            </div>
          </div>
          <div className="token-lists">
            <button className="go-nft-button">
              <div className="nft-count">{app.wallet.nftcnt}</div>
              <b className="nft-label">NFT</b>
            </button>
            <button className="go-nft-button">
              <div className="tot-count">{app.wallet.totcnt}</div>
              <b className="nft-label">TOT</b>
            </button>
            <button className="go-nft-button">
              <div className="tot-count">{sellcnt}</div>
              <b className="nft-label">Selling</b>
            </button>
            <button className="go-nft-button">
              <div className="tot-count">{bidcnt}</div>
              <b className="nft-label">Buying</b>
            </button>
          </div>
        </div>
      </div>
      <div className="iconssection-wrapper">
        <div className="iconssection">
          <div className="swap-button-parent">
            <button className="swap-button" onClick={onSwapButtonClick}>
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution.svg"
              />
              <div className="ranking">Market</div>
            </button>
            <button className="swap-button">
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution1.svg"
              />
              <div className="ranking">Swap</div>
            </button>
            <button className="swap-button">
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution2.svg"
              />
              <div className="ranking">DEX</div>
            </button>
            <button className="swap-button">
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution3.svg"
              />
              <div className="ranking">DAO</div>
            </button>
            <button className="swap-button">
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution4.svg"
              />
              <div className="ranking">Staking</div>
            </button>
            <button className="swap-button">
              <img
                className="home-icon-interlocution"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution5.svg"
              />
              <div className="ranking">Mint</div>
            </button>
          </div>
        </div>
      </div>
      <div className="tradableorderssection">
        <div className="catalogtab">
          <div className="token-parent">
            <b className="token">Token</b>
            <div className="ellipse-parent">
              <img
                className="group-child"
                alt=""
                src="_content/ReactRazor/asserts/ellipse-43.svg"
              />
              <div className="div">18</div>
            </div>
          </div>
          <div className="nft-parent">
            <b className="token">NFT</b>
            <div className="ellipse-parent">
              <img
                className="group-child"
                alt=""
                src="_content/ReactRazor/asserts/ellipse-43.svg"
              />
              <div className="div">18</div>
            </div>
          </div>
          <div className="fiat-wrapper">
            <b className="fiat">Fiat</b>
          </div>
          <div className="fiat-wrapper">
            <b className="fiat">Goods</b>
          </div>
          <div className="fiat-wrapper">
            <b className="fiat">Service</b>
          </div>
        </div>
      </div>
      <div className="coinlisting">{showTokens()}</div>
    </div>
  );
};

export default WalletHome;
