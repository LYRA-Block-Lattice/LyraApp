import { FunctionComponent } from "react";
import "./SellItem.css";

type SellItemType = {
  sellerName?: string;
  offering?: string;
  biding?: string;
  sellerRating?: string;
  lastUpdated?: string;
  orderStatus?: string;
  price?: string;
  amount?: string;
  limitMin?: string;
  limitMax?: string;
  sold?: string;
  shelf?: string;
};

const SellItem: FunctionComponent<SellItemType> = ({
  sellerName,
  offering,
  biding,
  sellerRating,
  lastUpdated,
  orderStatus,
  price,
  amount,
  limitMin,
  limitMax,
  sold,
  shelf,
}) => {
  return (
    <div className="ordercard2">
      <div className="order-brief-section2">
        <button className="banner-image2">
          <div className="order-banner2">
            <button className="order-image2">
              <img
                className="icbaseline-generating-tokens-icon4"
                alt=""
                src="_content/ReactRazor/asserts/icbaselinegeneratingtokens5.svg"
              />
              <img
                className="order-image-inner"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon4"
                alt=""
                src="_content/ReactRazor/asserts/carbonuserservicedesk.svg"
              />
            </button>
            <div className="order-status2">
              <b className="open2">{orderStatus}</b>
            </div>
          </div>
        </button>
        <a className="title-section2">
          <div className="a-big-seller-parent">
            <b className="a-big-seller">{sellerName}</b>
            <b className="b">{sellerRating}</b>
          </div>
          <div className="title-section-inner" />
          <div className="sell-group">
            <b className="a-big-seller">Sell</b>
            <b className="a-big-seller">{offering}</b>
            <img className="frame-inner" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt2">{biding}</b>
          </div>
          <div className="am-frame">
            <div className="a-big-seller">{lastUpdated}</div>
          </div>
          <div className="details-section2">
            <div className="block12">
              <div className="a-big-seller">Price</div>
              <div className="a-big-seller">Limit Min</div>
              <div className="a-big-seller">Sold</div>
            </div>
            <div className="block22">
              <div className="a-big-seller">{price}</div>
              <div className="a-big-seller">{limitMin}</div>
              <div className="a-big-seller">{sold}</div>
            </div>
            <div className="details-section-inner" />
            <div className="block32">
              <div className="a-big-seller">Amount</div>
              <div className="a-big-seller">Limit Max</div>
              <div className="a-big-seller">Shelf</div>
            </div>
            <div className="block22">
              <div className="a-big-seller">{amount}</div>
              <div className="a-big-seller">{limitMax}</div>
              <div className="a-big-seller">{shelf}</div>
            </div>
          </div>
        </a>
      </div>
      <div className="trades-section2">
        <div className="width-controller2" />
      </div>
    </div>
  );
};

export default SellItem;
