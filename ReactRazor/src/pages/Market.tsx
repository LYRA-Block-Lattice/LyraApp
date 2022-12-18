import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WalletCard from "../components/WalletCard";
import NavigationIcon from "../components/NavigationIcon";
import "./Market.css";

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const onUSDWalletClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onButton1Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onButton2Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onButton3Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onRectangleCopy3Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onGroupClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  return (
    <div className="market">
      <div className="bannersection">
        <div className="walletcard">
          <div className="mask-group">
            <WalletCard />
            <button className="usd-wallet" onClick={onUSDWalletClick}>
              My Primary Account
            </button>
            <div className="div">
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
            <div className="frame-div">
              <div className="frame-div1">
                <div className="div1">2</div>
              </div>
              <b className="wallet-no">Trade</b>
              <button className="button" onClick={onButtonClick}>
                0
              </button>
              <b className="wallet-no1">Orders</b>
              <button className="button1" onClick={onButton1Click}>
                0
              </button>
              <b className="wallet-no2">TFT</b>
              <button className="button2" onClick={onButton2Click}>
                3
              </button>
              <b className="wallet-no3">NFT</b>
              <button className="button3" onClick={onButton3Click}>
                12
              </button>
            </div>
            <div className="div2">
              <span>
                <span className="span2">500</span>
                <span>{`          `}</span>
              </span>
              <span className="span">USDT</span>
            </div>
            <button className="group" onClick={onGroupClick}>
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
            <div className="cen-wallet-copy">LYRA WALLET</div>
            <div className="rectangle" />
            <div className="rectangle1" />
          </div>
        </div>
      </div>
      <div className="iconssection">
        <div className="frame-div2">
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--surrounding.svg"
            ranking="DAO"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution.svg"
            ranking="OTC"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution1.svg"
            ranking="Invest"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution2.svg"
            ranking="Swap"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution3.svg"
            ranking="DEX"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution4.svg"
            ranking="NFT"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--interlocution5.svg"
            ranking="Mint"
          />
          <NavigationIcon
            homeIconSurrounding="../asserts/home--icon--ranking.svg"
            ranking="Staking"
          />
        </div>
      </div>
      <div className="lasttransactions">
        <div className="recent-transaction">Recent transaction</div>
        <div className="frame-div3">
          <div className="copy">
            <div className="buy-tv-at-sony-store">Recharge money</div>
            <div className="div4">From Harry James</div>
            <div className="div5">+ $1000</div>
            <img className="path-icon" alt="" src="_content/ReactRazor/asserts/path.svg" />
          </div>
          <div className="copy">
            <div className="buy-tv-at-sony-store">Pay electric bill</div>
            <div className="div4">From USD wallet</div>
            <div className="div5">- $100</div>
            <img className="path-icon" alt="" src="_content/ReactRazor/asserts/path1.svg" />
          </div>
        </div>
        <b className="more">More</b>
      </div>
      <div className="dealsection">
        <div className="rectangle2" />
        <b className="yellow-sofa">Yellow sofa</b>
        <div className="div8">{`$600 `}</div>
        <div className="group-div">
          <div className="div9">$1.200</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-2.svg"
          />
        </div>
        <div className="div10">4.8</div>
        <div className="div11">(849)</div>
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
          <div className="div12">50%</div>
        </div>
        <div className="rectangle4" />
        <b className="blue-sofa">Blue sofa</b>
        <div className="div13">{`$750 `}</div>
        <div className="group-div2">
          <div className="div14">$1.500</div>
          <img
            className="iconglyphstar-copy-2"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy-21.svg"
          />
        </div>
        <div className="div15">4.8</div>
        <div className="div16">(849)</div>
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
          <div className="div12">50%</div>
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
