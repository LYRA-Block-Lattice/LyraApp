import { FunctionComponent, useState, useCallback } from "react";
import { TextField } from "@mui/material";
import "./CreateNFTForm.css";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

type TokenMintProps = {
  onClose?: (ticker?: string) => void;
  children?: React.ReactNode;
  tag?: string;
};

const CreateNFTForm: FunctionComponent<TokenMintProps> = props => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [supply, setSupply] = useState<number>(1);

  function readFileData(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];

    return new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        resolve(event.target!.result as ArrayBuffer);
      };

      reader.onerror = (err) => {
        reject(err);
      };

      reader.readAsArrayBuffer(file);
    });
  }

  const changeHandler = (event) => {
    console.log(event.target.files);
    console.log("Uploading file...");
    readFileData(event)
      .then((value) => {
        console.log(value);
        var data = new Uint8Array(value);
        console.log(data);
        window.rrProxy.ReactRazor.Pages.Home.Interop.UploadFileAsync(window.rrComponent, event.target.files[0].name, event.target.files[0].type, data)
          .then(function (response) {
            return JSON.parse(response);
          })
          .then(function (result) {
            if (result.ret == "Success") {
              // we got image url. so we create metadata for it.
              window.rrProxy.ReactRazor.Pages.Home.Interop.CreateNFTMetaDataAsync(window.rrComponent, name, desc, result.result)
                .then(function (response) {
                  return JSON.parse(response);
                })
                .then(function (result) {
                  if (result.ret == "Success") {
                    setUrl(result.result);
                  }
                  else {
                    window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Error", result.msg);
                  }
                })              
            }
            else {
              window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Warning", result.msg);
            }
          });
      })
      .catch((err) => {
        console.log("file upload error! " + err)
      });
  };

  const onMintClick = useCallback(() => {
    console.log("mint NFT.");
    window.rrProxy.ReactRazor.Pages.Home.Interop.MintNFTAsync(window.rrComponent, name, desc, supply, url)
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (result) {
        if (result.ret == "Success") {
          let tickr = result.result;
          window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Success", tickr + " is ready for use.");
          props.onClose!(tickr);
        }
        else {
          window.rrProxy.ReactRazor.Pages.Home.Interop.AlertAsync(window.rrComponent, "Warning", result.msg);
          props.onClose!();
        }
      });

  }, [name, desc, url, supply]);

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
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        multiline
        rows={5}
        label="Description"
        margin="none"
        onChange={(e) => setDesc(e.target.value)}
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
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="or">or</div>
      <input className="select-nft-image" type="file" onChange={changeHandler} />
      <button className="prepare-sell-order-button15" onClick={onMintClick}>
        <div className="secondary-button7">Create NFT</div>
      </button>
    </div>
  );
};

export default CreateNFTForm;
