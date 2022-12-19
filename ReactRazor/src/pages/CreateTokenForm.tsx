import { FunctionComponent } from "react";
import "./CreateTokenForm.css";

const CreateTokenForm: FunctionComponent = () => {
  return (
    <form className="createtokenform">
      <div className="mint-token">Mint Token</div>
      <input className="token-name" type="text" placeholder="Token Name" />
      <input className="domain-name" type="text" placeholder="Domain Name" />
      <input
        className="token-description"
        type="text"
        placeholder="Description"
      />
      <button className="mint-token-button">
        <div className="rectangle-div3" />
        <div className="mint-token1">Mint Token</div>
      </button>
      <input className="total-supply" type="text" placeholder="Total Supply" />
    </form>
  );
};

export default CreateTokenForm;
