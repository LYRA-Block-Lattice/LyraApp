import { FunctionComponent, useMemo, useState, useEffect } from "react";
import CSS, { Property } from "csstype";
import "./OrderCard.css";

import TableComponent, {TableComponentProps} from "../components/TableComponent";

type OrderCardType = {
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

  // useEffect(() => {
  //   setTrades(data);
  // }, []);

  const toggle = () => {
    setTrades(datasrc);
    setShowTradeTable(!showTradeTable); 
  }
  
  const orderStatusStyle: CSS.Properties = useMemo(() => {
    return {
      backgroundColor: orderStatusBackgroundColor,
    };
  }, [orderStatusBackgroundColor]);

  return (
    <div className="ordercard1">
      <div className="order-brief-section1">
        <button className="banner-image1" onClick={toggle}>
          <div className="order-banner1">
            <button className="order-image1">
              <img
                className="icbaseline-generating-tokens-icon1"
                alt=""
                src={offeringImg}
              />
              <img
                className="order-image-item"
                alt=""
                src="_content/ReactRazor/asserts/arrow-1.svg"
              />
              <img
                className="icbaseline-generating-tokens-icon1"
                alt=""
                src={bidingImg}
              />
            </button>
            <div className="order-status1" style={orderStatusStyle}>
              <b className="open1">{orderStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section1">
          <div className="sell-parent">
            <b className="limit-min">Sell</b>
            <b className="limit-min">{offering}</b>
            <img className="frame-item" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt1">{biding}</b>
          </div>
          <div className="title-section-item" />
          <div className="am-container">
            <div className="limit-min">{time}</div>
          </div>
          <div className="details-section1">
            <div className="block11">
              <div className="limit-min">Price</div>
              <div className="limit-min">Limit Min</div>
              <div className="limit-min">Sold</div>
            </div>
            <div className="block21">
              <div className="limit-min">{price}</div>
              <div className="limit-min">{limitMin}</div>
              <div className="limit-min">{sold}</div>
            </div>
            <div className="details-section-item" />
            <div className="block31">
              <div className="limit-min">Amount</div>
              <div className="limit-min">Limit Max</div>
              <div className="limit-min">Shelf</div>
            </div>
            <div className="block21">
              <div className="limit-min">{amount}</div>
              <div className="limit-min">{limitMax}</div>
              <div className="limit-min">{shelf}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section1">
        <div className="width-controller1">
        {showTradeTable ? <TableComponent data={trades} /> : null}
      </div>
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