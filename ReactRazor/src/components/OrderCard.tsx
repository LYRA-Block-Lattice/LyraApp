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
    <div className="ordercard3">
      <div className="order-brief-section3">
        <button className="banner-image3" onClick={toggle}>
          <div className="order-banner3">
            <button className="order-image3">
              <img
                className="icbaseline-generating-tokens-icon4"
                alt=""
                src={offeringImg}
              />
              <img className="arrow-icon" alt="" src="_content/ReactRazor/asserts/arrow-1.svg" />
              <img
                className="icbaseline-generating-tokens-icon4"
                alt=""
                src={bidingImg}
              />
            </button>
            <div className="order-status3" style={orderStatusStyle}>
              <b className="open3">{orderStatus}</b>
            </div>
          </div>
        </button>
        <div className="title-section3">
          <div className="sell-container">
            <b className="sell3">Sell</b>
            <b className="sell3">{offering}</b>
            <img className="frame-child1" alt="" src="_content/ReactRazor/asserts/arrow-2.svg" />
            <b className="tetherusdt3">{biding}</b>
          </div>
          <div className="line-div" />
          <div className="frame-div">
            <div className="sell3">{time}</div>
          </div>
          <div className="details-section3">
            <div className="block13">
              <div className="sell3">Price</div>
              <div className="sell3">Limit Min</div>
              <div className="sell3">Sold</div>
            </div>
            <div className="block23">
              <div className="sell3">{price}</div>
              <div className="sell3">{limitMin}</div>
              <div className="sell3">{sold}</div>
            </div>
            <div className="details-section-child1" />
            <div className="block33">
              <div className="sell3">Amount</div>
              <div className="sell3">Limit Max</div>
              <div className="sell3">Shelf</div>
            </div>
            <div className="block23">
              <div className="sell3">{amount}</div>
              <div className="sell3">{limitMax}</div>
              <div className="sell3">{shelf}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="trades-section3">
        <div className="width-controller3">
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