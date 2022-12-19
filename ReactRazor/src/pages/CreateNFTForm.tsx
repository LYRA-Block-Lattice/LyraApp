import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNFTForm.css";

const CreateNFTForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onRectangleButtonClick = useCallback(() => {
    navigate("/selecttokenfororder");
  }, [navigate]);

  return (
    <div className="createnftform">
      <div className="create-nft">Create NFT</div>
      <input className="nft-name" type="text" placeholder="NFT Name" />
      <input
        className="nft-metadata-url"
        type="text"
        placeholder="Metadata URL"
      />
      <input
        className="nft-description"
        type="text"
        placeholder="Description"
      />
      <div className="create-nft-button">
        <button className="rectangle-button" onClick={onRectangleButtonClick} />
        <div className="create-nft1">Create NFT</div>
      </div>
      <div className="or">or</div>
      <input
        className="select-nft-image"
        type="text"
        placeholder="Select Local Image"
      />
    </div>
  );
};

export default CreateNFTForm;
