import { FunctionComponent } from "react";
import "antd/dist/antd.min.css";
import { Input } from "antd";
import {
  DownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  LeftOutlined,
  LockOutlined,
  MailOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  RightOutlined,
  SearchOutlined,
  SendOutlined,
  ShareAltOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./TransactionHistory.css";

const TransactionHistory: FunctionComponent = () => {
  return (
    <div className="transactionhistory">
      <div className="search-bar">
        <Input
          className="search-keyword-input"
          type="text"
          style={{ width: "283px" }}
          prefix={<SearchOutlined />}
          size="middle"
          placeholder="Searh Transaction History"
          allowClear
        />
        <img
          className="advanced-filter-icon"
          alt=""
          src="../asserts/advanced-filter.svg"
        />
      </div>
      <div className="group-parent">
        <div className="group">
          <div className="rectangle" />
          <div className="div6">$200</div>
          <img
            className="iconglyphstar-copy-4"
            alt=""
            src="../asserts/iconglyphstar-copy-4.svg"
          />
        </div>
        <div className="group-4-copy">
          <div className="group1">
            <div className="rectangle1" />
            <div className="div7">9/10/2018</div>
            <img
              className="iconglyphstar-copy-41"
              alt=""
              src="../asserts/iconglyphstar-copy-41.svg"
            />
          </div>
        </div>
      </div>
      <div className="all-transactions-wrapper">
        <div className="all-transactions">All transactions</div>
      </div>
      <div className="receivedetailcard-parent">
        <div className="receivedetailcard">
          <div className="rectangle2" />
          <div className="group2">
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
            <div className="div8">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div9">$200</div>
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
          <div className="group2">
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
            <div className="div8">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div9">$200</div>
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
          <div className="group2">
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
            <div className="div8">09/10/2018</div>
            <img
              className="iconglyphstar-copy"
              alt=""
              src="../asserts/iconglyphstar-copy.svg"
            />
          </div>
          <div className="container">
            <div className="div9">$200</div>
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
