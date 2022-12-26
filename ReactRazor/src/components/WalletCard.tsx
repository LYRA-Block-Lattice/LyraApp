import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./WalletCard.css";

const WalletCard: FunctionComponent = () => {
  const navigate = useNavigate();

  const onNFTCountClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onFrameButtonClick = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onNFTCount1Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onFrameButton1Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onNFTCount2Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onFrameButton2Click = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  const onNFTCount3Click = useCallback(() => {
    navigate("/redir");
  }, [navigate]);

  const onFrameButton3Click = useCallback(() => {
    navigate("/viewtradesform");
  }, [navigate]);

  return (
    <div className="maps-parent">
      <img className="maps-icon" alt="" src="_content/ReactRazor/asserts/maps.svg" />
      <a className="balance-display-zone">
        <b className="lyrbalance">120,000</b>
        <b className="lyrlabel">LYR</b>
        <b className="lyrbalance">5,000</b>
        <b className="lyrlabel">USDT</b>
      </a>
      <div className="token-lists">
        <button className="nft-count-parent" onClick={onFrameButtonClick}>
          <button className="nft-count" onClick={onNFTCountClick}>
            12
          </button>
          <b className="nft-label">NFT</b>
        </button>
        <button className="nft-count-group" onClick={onFrameButton1Click}>
          <button className="nft-count1" onClick={onNFTCount1Click}>
            3
          </button>
          <b className="nft-label1">TOT</b>
        </button>
        <button className="nft-count-group" onClick={onFrameButton2Click}>
          <button className="nft-count1" onClick={onNFTCount2Click}>
            0
          </button>
          <b className="nft-label1">Selling</b>
        </button>
        <button className="nft-count-group" onClick={onFrameButton3Click}>
          <button className="nft-count1" onClick={onNFTCount3Click}>
            0
          </button>
          <b className="nft-label1">Buying</b>
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
