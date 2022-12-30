import { FunctionComponent, useMemo, useState, useEffect } from "react";
import CSS, { Property } from "csstype";
import "./OrderCard.css";

import TableComponent, {TableComponentProps} from "../components/TableComponent";

interface customWindow extends Window {
  lyraSetProxy?: any;
  lyraProxy?: any;
}
declare const window: customWindow;

type OrderCardType = {
  orderid?: string;
  offering?: string;
  biding?: string;
  orderStatus?: string;
  offeringImg?: string;
  bidingImg?: string;
  time?: string;
  price?: string;
  amount?: string;
  limitMin?: string;
  limitMax?: string;
  sold?: string;
  shelf?: string;

  /** Style props */
  orderStatusBackgroundColor?: Property.BackgroundColor;
};

const OrderCard: FunctionComponent<OrderCardType> = ({
  orderid,
  offering,
  biding,
  orderStatus,
  offeringImg,
  bidingImg,
  time,
  price,
  amount,
  limitMin,
  limitMax,
  sold,
  shelf,
  orderStatusBackgroundColor,
}) => {
  const [trades, setTrades] = useState<any[]>([]);
  const [showTradeTable, setShowTradeTable] = useState(false);

  const toggle = async () => {
    if (!showTradeTable) {
      var tt = await window.lyraProxy.invokeMethodAsync("GetTrades", orderid);
      var ret = JSON.parse(tt);
      setTrades(ret.trades);
    }
    setShowTradeTable(!showTradeTable); 
  }
  
  const orderStatusStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: orderStatusBackgroundColor,
    };
  }, [orderStatusBackgroundColor]);

  return (
    <div className="ordercard3">
      <div className="order-brief-section">
        <button className="banner-image" onClick={async () => { await toggle(); }}>
          <div className="order-banner">
            <button className="order-image">
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src={offeringImg}
              />
              <img
                className="order-image-child"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon"
                alt=""
                src={bidingImg}
              />
            </button>
            <div className="order-status" style={orderStatusStyle}>
              <b className="open3">{orderStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section">
          <div className="btc-parent">
            <b className="btc">{offering}</b>
            <img className="frame-child" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt">{biding}</b>
          </div>
          <div className="title-section-child" />
          <div className="am-wrapper">
            <div className="btc">{time}</div>
          </div>
          <div className="details-section">
            <div className="block1">
              <div className="btc">Price</div>
              <div className="btc">Limit Min</div>
              <div className="btc">Sold</div>
            </div>
            <div className="block2">
              <div className="btc">{price}</div>
              <div className="btc">{limitMin}</div>
              <div className="btc">{sold}</div>
            </div>
            <div className="details-section-child" />
            <div className="block3">
              <div className="btc">Amount</div>
              <div className="btc">Limit Max</div>
              <div className="btc">Shelf</div>
            </div>
            <div className="block2">
              <div className="btc">{amount}</div>
              <div className="btc">{limitMax}</div>
              <div className="btc">{shelf}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section">
        {showTradeTable ? <TableComponent data={trades} /> : null}
      </div>
    </div>
  );
};

export default OrderCard;

const datasrc = [{
  name: 'Marcel',
  surname: 'Michau',
  age: '24',
  gender: 'Male'
}, {
  name: 'Joe',
  surname: 'Bloggs',
  age: '27',
  gender: 'Male'
}, {
  name: 'Jane',
  surname: 'Doe',
  age: '22',
  gender: 'Female'
}];