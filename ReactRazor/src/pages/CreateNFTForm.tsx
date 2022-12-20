import { FunctionComponent } from "react";
import "./CreateNFTForm.css";

const CreateNFTForm: FunctionComponent = () => {
  return (
    <div className="createnftform">
      <div className="create-nft">Create NFT</div>
      <input className="nft-name" type="text" placeholder="NFT Name" />
      <input
        className="nft-description"
        type="text"
        placeholder="Description"
      />
      <input className="nft-name" type="text" placeholder="Metadata URL" />
      <div className="or">or</div>
      <input
        className="nft-name"
        type="text"
        placeholder="Select Local Image"
      />
      <button className="prepare-sell-order-button6">
        <div className="secondary-button2">Create NFT</div>
      </button>
    </div>
  );
};

export default CreateNFTForm;
