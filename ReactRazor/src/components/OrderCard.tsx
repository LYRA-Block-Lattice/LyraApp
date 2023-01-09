import { FunctionComponent, useMemo, useState, useCallback } from "react";
import CSS, { Property } from "csstype";
import "./OrderCard.css";

import TableComponent, {
  TableComponentProps
} from "../components/TableComponent";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;
import TableComponent, {
  TableComponentProps
} from "../components/TableComponent";

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
  orderStatusBackgroundColor
}) => {
  const [trades, setTrades] = useState<any[]>([]);
  const [showTradeTable, setShowTradeTable] = useState(false);

  const toggle = useCallback(async () => {
    if (!showTradeTable) {
      var tt =
        await window.rrProxy.ReactRazor.Pages.Home.Interop.GetTradesAsync(
          window.rrComponent,
          orderid
        );
      var ret = JSON.parse(tt);
      if (ret.ret == "Success") {
        setTrades(ret.result);
      } else {
        window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(
          window.rrComponent,
          "Warning",
          ret.msg
        );
      }
    }
    setShowTradeTable(!showTradeTable);
  }, [trades, showTradeTable]);

  // useEffect(() => {
  //   setTrades(data);
  // }, []);

  const toggle = () => {
    setTrades(datasrc);
    setShowTradeTable(!showTradeTable);
  };

  const orderStatusStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: orderStatusBackgroundColor
    };
  }, [orderStatusBackgroundColor]);

  return (
    <div className="ordercard2">
      <div className="order-brief-section2">
        <button className="banner-image2" onClick={toggle}>
          <div className="order-banner2">
            <button className="order-image2">
              <img
                className="icbaseline-generating-tokens-icon2"
                alt=""
                src={offeringImg}
              />
              <img
                className="order-image-inner"
                alt=""
                src="_content/ReactRazor/asserts/arrow-12.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon2"
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
            <b className="sold">Sell</b>
            <b className="sold">{offering}</b>
            <img
              className="frame-child1"
              alt=""
              src="_content/ReactRazor/asserts/arrow-22.svg"
            />
            <b className="tetherusdt3">{biding}</b>
          </div>
          <div className="title-section-item" />
          <div className="am-container">
            <div className="sold">{time}</div>
          </div>
          <div className="details-section2">
            <div className="block12">
              <div className="sold">Price</div>
              <div className="sold">Limit Min</div>
              <div className="sold">Sold</div>
            </div>
            <div className="block22">
              <div className="sold">{price}</div>
              <div className="sold">{limitMin}</div>
              <div className="sold">{sold}</div>
            </div>
            <div className="details-section-inner" />
            <div className="block32">
              <div className="sold">Amount</div>
              <div className="sold">Limit Max</div>
              <div className="sold">Shelf</div>
            </div>
            <div className="block22">
              <div className="sold">{amount}</div>
              <div className="sold">{limitMax}</div>
              <div className="sold">{shelf}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section2">
        <div className="width-controller2">
          {showTradeTable ? <TableComponent data={trades} /> : null}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

const datasrc = [
  {
    name: "Marcel",
    surname: "Michau",
    age: "24",
    gender: "Male"
  },
  {
    name: "Joe",
    surname: "Bloggs",
    age: "27",
    gender: "Male"
  },
  {
    name: "Jane",
    surname: "Doe",
    age: "22",
    gender: "Female"
  }
];
