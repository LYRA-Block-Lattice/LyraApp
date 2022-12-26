import { FunctionComponent } from "react";
import "./TransactionHistory.css";

const TransactionHistory: FunctionComponent = () => {
  return (
    <div className="transactionhistory">
      <div className="bars-search-1-copy-5">
        <div className="search-field" />
        <div className="placeholder-label">Search</div>
        <img className="iconback" alt="" src="../asserts/iconback.svg" />
        <img
          className="group-3-copy"
          alt=""
          src="../asserts/group-3-copy.svg"
        />
      </div>
      <div className="group">
        <div className="rectangle" />
        <div className="div3">$200</div>
        <img
          className="iconglyphstar-copy-4"
          alt=""
          src="../asserts/iconglyphstar-copy-4.svg"
        />
      </div>
      <div className="group-4-copy">
        <div className="group1">
          <div className="rectangle1" />
          <div className="div4">9/10/2018</div>
          <img
            className="iconglyphstar-copy-41"
            alt=""
            src="../asserts/iconglyphstar-copy-41.svg"
          />
        </div>
      </div>
      <img
        className="transactionhistory-child"
        alt=""
        src="../asserts/group-5.svg"
      />
      <div className="all-transactions">All transactions</div>
      <div className="bars-navigation-bar-light">
        <div className="group2">
          <div className="rectangle-copy-3" />
          <img className="iconnext" alt="" />
        </div>
        <div className="group-copy">
          <div className="rectangle-copy-31" />
          <img className="iconnext" alt="" />
        </div>
        <img className="iconback1" alt="" />
        <b className="large-title">Transaction history</b>
      </div>
      <div className="receivedetailcard-parent">
        <div className="receivedetailcard">
          <div className="rectangle2" />
          <div className="group3">
            <b className="transfer-money">Receive</b>
            <div className="to-harry-james">From: Harry James</div>
          </div>
          <div className="successful-parent">
            <div className="successful">Successful</div>
            <img
              className="iconglyphstar"
              alt=""
              src="../asserts/iconglyphstar.svg"
            />
          </div>
          <div className="parent">
            <div className="div5">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div6">$200</div>
            <img
              className="iconglyphstar-copy-2"
              alt=""
              src="../asserts/iconglyphstar-copy-2.svg"
            />
          </div>
          <img className="path-icon" alt="" src="../asserts/path.svg" />
          <img
            className="receive-icon"
            alt=""
            src="../asserts/receive-icon.svg"
          />
        </div>
        <div className="receivedetailcard">
          <div className="rectangle2" />
          <div className="group3">
            <b className="transfer-money">Send</b>
            <div className="to-harry-james">To: Harry James</div>
          </div>
          <div className="successful-parent">
            <div className="successful">Successful</div>
            <img
              className="iconglyphstar"
              alt=""
              src="../asserts/iconglyphstar.svg"
            />
          </div>
          <div className="parent">
            <div className="div5">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div6">$200</div>
            <img
              className="iconglyphstar-copy-2"
              alt=""
              src="../asserts/iconglyphstar-copy-2.svg"
            />
          </div>
          <img className="path-icon" alt="" src="../asserts/path.svg" />
          <img
            className="senddetailcard-child"
            alt=""
            src="../asserts/group-4.svg"
          />
        </div>
        <div className="receivedetailcard">
          <div className="rectangle2" />
          <div className="group3">
            <b className="transfer-money">Receive</b>
            <div className="to-harry-james">From: Harry James</div>
          </div>
          <div className="successful-parent">
            <div className="successful">Successful</div>
            <img
              className="iconglyphstar"
              alt=""
              src="../asserts/iconglyphstar.svg"
            />
          </div>
          <div className="parent">
            <div className="div5">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div6">$200</div>
            <img
              className="iconglyphstar-copy-2"
              alt=""
              src="../asserts/iconglyphstar-copy-2.svg"
            />
          </div>
          <img className="path-icon" alt="" src="../asserts/path.svg" />
          <img
            className="receive-icon"
            alt=""
            src="../asserts/receive-icon.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
