import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TxInfoBar from "../components/TxInfoBar";
import "./Market.css";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

const Market: FunctionComponent = () => {
  const navigate = useNavigate();

  const [lyrbns, setLyrbns] = useState(0);
  const [usdt, setUsdt] = useState(0);

  const [nftcnt, setNftcnt] = useState(0);
  const [totcnt, setTotcnt] = useState(0);
  const [sellcnt, setSellcnt] = useState(0);
  const [bidcnt, setBidcnt] = useState(0);

  useEffect(() => {
    window.rrProxy.ReactRazor.Pages.Home.Interop.GetBalancesAsync(window.rrComponent)
      .then((json) => JSON.parse(json))
      .then((ret) => {
        console.log(ret);
        if (ret.result != null) {
          setNftcnt(ret.result.filter((a) => a.token.startsWith("nft/")).length);
          setTotcnt(ret.result.filter((a) => a.token.startsWith("tot/") || a.token.startsWith("svc/")).length);
          setLyrbns(ret.result.find(a => a.token == "LYR")?.balance ?? 0);
          setUsdt(ret.result.find(a => a.token == "tether/USDT")?.balance ?? 0);
        }
      });
  }, []);

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
    navigate("/redir/wallet");
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

  const onMoreClick = useCallback(() => {
    navigate("/transactionhistory");
  }, [navigate]);

  return (
    <div className="market">
      <div className="bannersection">
        <div className="walletcard">
          <div className="mask-group">
            <div className="maps-parent">
              <img className="maps-icon" alt="" src="_content/ReactRazor/asserts/maps.svg" />
              <a className="balance-display-zone">
                <b className="lyrbalance">{lyrbns}</b>
                <b className="lyrlabel">LYR</b>
                <div className="balance-display-zone-child" />
                <b className="usdtbalance">{usdt}</b>
                <b className="lyrlabel">USDT</b>
              </a>
              <div className="token-lists">
                <button className="go-nft-button" onClick={onGoNFTButtonClick}>
                  <button className="nft-count" onClick={onNFTCountClick}>
                    {nftcnt}
                  </button>
                  <b className="nft-label">NFT</b>
                </button>
                <button className="go-nft-button" onClick={onGoTOTButtonClick}>
                  <button className="nft-count" onClick={onTOTCountClick}>
                    {totcnt}
                  </button>
                  <b className="nft-label">TOT</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoSellingButtonClick}
                >
                  <button className="nft-count" onClick={onSellingCountClick}>
                    {sellcnt}
                  </button>
                  <b className="nft-label">Selling</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoBuyingButtonClick}
                >
                  <button className="nft-count" onClick={onBuyingCountClick}>
                    {bidcnt}
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
            <div className="rectangle5" />
            <div className="rectangle6" />
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
      <div className="lasttransactions">
        <div className="recent-transaction">Recent transaction</div>
        <div className="frame-div">
          <TxInfoBar
            buyTVAtSonyStore="Receive"
            component="From Harry James"
            component1="+ 1000 LYR"
            path="_content/ReactRazor/asserts/path3.svg"
          />
          <TxInfoBar
            componentWidth="333px"
            buyTVAtSonyStore="Send"
            component="From USD wallet"
            component1="- 100 LYR"
            componentColor="#d15252"
            componentFontWeight="600"
            path="_content/ReactRazor/asserts/path4.svg"
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
