import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MarketOrder from "../components/MarketOrder";
import DisplaySellItems from "../dup/DisplaySellItems";

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

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

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

    fetch("https://devnet.lyra.live/api/EC/Orders")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  const [lyrbns, setLyrbns] = useState(0);
  const [usdt, setUsdt] = useState(0);

  const [nftcnt, setNftcnt] = useState(0);
  const [totcnt, setTotcnt] = useState(0);
  const [sellcnt, setSellcnt] = useState(0);
  const [bidcnt, setBidcnt] = useState(0);

  // function to get json from rest api
  const getJson = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };

  // function to get web content from rest api
  const getWebContent = async (url: string) => {
    const response = await fetch(url);
    return response.text();
  };

  const onBalanceDisplayZoneClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onSwapButtonClick = useCallback(() => {
    navigate("/starttocreateorder");
  }, [navigate]);

  const onSwapButton1Click = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  const onDEXButtonClick = useCallback(() => {
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

  return (
    <div className="market">
      <div className="bannersection">
        <div className="walletcard">
          <div className="mask-group">
            <div className="maps-parent">
              <img className="maps-icon" alt="" src="_content/ReactRazor/asserts/maps.svg" />
              <a className="balance-display-zone">
                <b className="usdtbalance">{lyrbns}</b>
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
                  <button className="tot-count" onClick={onTOTCountClick}>
                    {totcnt}
                  </button>
                  <b className="nft-label">TOT</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoSellingButtonClick}
                >
                  <button className="tot-count" onClick={onSellingCountClick}>
                    {sellcnt}
                  </button>
                  <b className="nft-label">Selling</b>
                </button>
                <button
                  className="go-nft-button"
                  onClick={onGoBuyingButtonClick}
                >
                  <button className="tot-count" onClick={onBuyingCountClick}>
                    {bidcnt}
                  </button>
                  <b className="nft-label">Buying</b>
                </button>
              </div>
            </div>
      <div className="wallet-card1">
        <div className="wallet-card-child">
          <div className="rectangle-container">
            <div className="rectangle1" />
          </div>
        </div>
        <div className="frame-div">
          <div className="balance-display-zone-group">
            <button
              className="balance-display-zone1"
              onClick={onBalanceDisplayZoneClick}
            >
              <b className="wallet-name-label1">My Primary Account</b>
              <div className="balance-display-zone-inner" />
              <b className="usdtbalance2">1,025,000</b>
              <b className="lyrlabel1">LYR</b>
              <div className="rectangle-div" />
            </button>
            <div className="qrcode-button-container">
              <button className="qrcode-button1">
                <div className="qrcode-button-round1" />
                <img
                  className="qrcode-icon1"
                  alt=""
                  src="_content/ReactRazor/asserts/qrcode-icon.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="iconssection-container">
        <div className="iconssection1">
          <div className="swap-button-group">
            <button className="swap-button2" onClick={onSwapButtonClick}>
              <img
                className="home-icon-interlocution6"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution6.svg"
              />
              <div className="ranking6">New Sell</div>
            </button>
            <button className="swap-button2" onClick={onSwapButton1Click}>
              <img
                className="home-icon-interlocution6"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution7.svg"
              />
              <div className="ranking6">My Orders</div>
            </button>
            <button className="swap-button2" onClick={onDEXButtonClick}>
              <img
                className="home-icon-interlocution6"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution8.svg"
              />
              <div className="ranking6">My Trades</div>
            </button>
            <button className="swap-button2">
              <img
                className="home-icon-interlocution6"
                alt=""
                src="_content/ReactRazor/asserts/home--icon--interlocution9.svg"
              />
              <div className="ranking9">ODR</div>
            </button>
          </div>
        </div>
      </div>
      <div className="searchsection">
        <input
          className="searchsection-child"
          type="search"
          placeholder="Search products/token/NFT/TOT etc."
        />
      </div>
      <div className="orderandcatalog">
        <div className="tradableorderssection1">
          <div className="catalogtab1">
            <div className="token-group">
              <b className="token1">Token</b>
              <div className="ellipse-container">
                <img
                  className="group-inner"
                  alt=""
                  src="_content/ReactRazor/asserts/ellipse-43.svg"
                />
                <div className="div2">18</div>
              </div>
            </div>
            <div className="nft-group">
              <b className="token1">NFT</b>
              <div className="ellipse-container">
                <img
                  className="group-inner"
                  alt=""
                  src="_content/ReactRazor/asserts/ellipse-43.svg"
                />
                <div className="div2">18</div>
              </div>
            </div>
            <div className="fiat-container">
              <b className="fiat1">Fiat</b>
            </div>
            <div className="fiat-container">
              <b className="fiat1">Goods</b>
            </div>
            <div className="fiat-container">
              <b className="fiat1">Service</b>
            </div>
          </div>
          <DisplaySellItems />
        </div>
        {items.map((blk) =>
          <SellItem
            sellerName="A big seller"
            offering={(blk as any).Order.offering}
            biding={(blk as any).Order.biding}
            sellerRating="98%"
            lastUpdated={(blk as any).TimeStamp}
            orderStatus={(blk as any).UOStatus}
            price={(blk as any).Order.price}
            amount="1113.2"
            limitMin="3.2"
            limitMax="3.2"
            sold="123"
            shelf="123"
          />
        )}
      </div>
    </div>
  );
};

export default Market;
