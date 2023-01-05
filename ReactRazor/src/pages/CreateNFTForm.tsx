import { FunctionComponent } from "react";
import { TextField } from "@mui/material";
import "./CreateNFTForm.css";

const CreateNFTForm: FunctionComponent = () => {
  return (
    <div className="createnftform">
      <div className="create-nft">Create NFT</div>
      <TextField
        className="nft-name"
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        type="text"
        label="NFT Name"
        size="medium"
        margin="none"
      />
      <TextField
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        multiline
        rows={5}
        label="Description"
        margin="none"
      />
      <TextField
        className="nft-name"
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        type="text"
        label="Metadata URL"
        placeholder="https://..."
        size="medium"
        margin="none"
      />
      <div className="or">or</div>
      <input className="select-nft-image" type="file" />
      <button className="prepare-sell-order-button16">
        <div className="secondary-button7">Create NFT</div>
      </button>
    </div>
  );
};

export default CreateNFTForm;
