import { FunctionComponent, useMemo, useState, useCallback } from "react";
import CSS, { Property } from "csstype";
import "./OrderCard.css";

import TableComponent, {TableComponentProps} from "../components/TableComponent";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
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

  const toggle = useCallback(async () => {
    if (!showTradeTable) {
      var tt = await window.rrProxy.ReactRazor.Pages.Home.Interop.GetTradesAsync(window.rrComponent, orderid);
      var ret = JSON.parse(tt);
      if (ret.ret == "Success") {
        setTrades(ret.result);
      }
      else {
        window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Warning", ret.msg);
      }      
    }
    setShowTradeTable(!showTradeTable);
  }, [trades, showTradeTable]);
  
  const orderStatusStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: orderStatusBackgroundColor,
    };
  }, [orderStatusBackgroundColor]);

  return (
    <div className="ordercard2">
      <div className="order-brief-section2">
        <button className="banner-image2" onClick={toggle}>
          <div className="order-banner2">
            <button className="order-image2">
              <img
                className="icbaseline-generating-tokens-icon3"
                alt=""
                src={offeringImg}
              />
              <img
                className="order-image-inner"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon3"
                alt=""
                src={bidingImg}
              />
            </button>
            <div className="order-status2" style={orderStatusStyle}>
              <b className="open2">{orderStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section2">
          <div className="sell-group">
            <b className="sell2">Sell</b>
            <b className="sell2">{offering}</b>
            <img className="frame-inner" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt2">{biding}</b>
          </div>
          <div className="title-section-inner" />
          <div className="am-frame">
            <div className="sell2">{time}</div>
          </div>
          <div className="details-section2">
            <div className="block12">
              <div className="sell2">Price</div>
              <div className="sell2">Limit Min</div>
              <div className="sell2">Sold</div>
            </div>
            <div className="block22">
              <div className="sell2">{price}</div>
              <div className="sell2">{limitMin}</div>
              <div className="sell2">{sold}</div>
            </div>
            <div className="details-section-inner" />
            <div className="block32">
              <div className="sell2">Amount</div>
              <div className="sell2">Limit Max</div>
              <div className="sell2">Shelf</div>
            </div>
            <div className="block22">
              <div className="sell2">{amount}</div>
              <div className="sell2">{limitMax}</div>
              <div className="sell2">{shelf}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section2">
        <div className="width-controller2">          
        </div>
        {showTradeTable ? <TableComponent data={trades} /> : null}
      </div>
    </div>
  );
};

export default OrderCard;