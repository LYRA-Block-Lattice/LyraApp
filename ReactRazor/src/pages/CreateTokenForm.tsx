import { FunctionComponent } from "react";
import "./CreateTokenForm.css";

const CreateTokenForm: FunctionComponent = () => {
  return (
    <form className="createtokenform">
      <div className="mint-token">Mint Token</div>
      <input className="token-name" type="text" placeholder="Token Name" />
      <input className="token-name" type="text" placeholder="Domain Name" />
      <input
        className="token-description"
        type="text"
        placeholder="Description"
      />
      <input className="token-name" type="text" placeholder="Total Supply" />
      <button className="prepare-sell-order-button17">
        <div className="secondary-button8">Mint Token</div>
      </button>
    </form>
  );
};

export default CreateTokenForm;
