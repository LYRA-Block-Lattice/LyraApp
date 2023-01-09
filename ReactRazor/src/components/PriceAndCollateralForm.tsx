import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { TextField, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./PriceAndCollateralForm.css";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

interface IDao {
  name: string;
  daoId: string;
}

type PriceAndCollateralFormType = {
  offering?: string;
  biding?: string;
};

const PriceAndCollateralForm: FunctionComponent<PriceAndCollateralFormType> = ({
  offering,
  biding
}) => {
  const navigate = useNavigate();
  const [daos, setDaos] = useState<IDao[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [limitmin, setLimitmin] = useState<number>(0);
  const [limitmax, setLimitmax] = useState<number>(0);
  const [collateral, setCollateral] = useState<number>(0);
  const [daoId, setDaoId] = useState("");
  const [dealerid, setDealerid] = useState("");

  async function init() {
    let dlr =
      await window.rrProxy.ReactRazor.Pages.Home.Interop.GetCurrentDealerAsync(
        window.rrComponent
      );
    setDealerid(dlr);
  }

  useEffect(() => {
    init();
  }, []);

  const searchDao = (searchTerm) => {
    window.rrProxy.ReactRazor.Pages.Home.Interop.SearchDaoAsync(
      window.rrComponent,
      searchTerm
    )
      .then(function (response) {
        return JSON.parse(response);
      })
      .then(function (myJson) {
        console.log("search term: " + searchTerm + ", results: ", myJson);
        setDaos(myJson);
      });
  };

  const onDaoSearchChange = useCallback(
    (event, value, reason) => {
      if (value) {
        searchDao(value);
      } else {
        setDaos([]);
      }
    },
    [daos]
  );

  const onReviewTheOrderClick = useCallback(() => {
    let togettoken = biding;
    console.log(
      "sell " + offering + ", to get " + togettoken + ", on price " + price
    );
    var obj = {
      selltoken: offering,
      gettoken: togettoken,
      price: price,
      count: count,
      collateral: collateral,
      secret: undefined,
      daoid: daoId,
      dealerid: dealerid,
      limitmin: limitmin,
      limitmax: limitmax
    };
    navigate(
      "/previewsellorderform/?data=" + encodeURIComponent(JSON.stringify(obj))
    );
  }, [navigate, offering, biding, price, count, collateral, daoId, dealerid]);

  return (
    <div className="priceandcollateralform">
      <div className="price-and-collateral">Price and Collateral</div>
      <div className="set-the-price-one-parent">
        <div className="set-the-price">Set the price, one</div>
        <div className="set-the-price">{offering}</div>
        <div className="set-the-price">for</div>
        <div className="set-the-price">{biding}</div>
        <div className="set-the-price">:</div>
      </div>
      <TextField
        className="sellatprice"
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        type="number"
        label="Price for biding token"
        placeholder="1.0"
        size="medium"
        margin="none"
        onChange={(e) => setPrice(+e.target.value)}
      />
      <div className="collateral-in-lyr">Amount:</div>
      <TextField
        className="sellatprice"
        sx={{ width: 301 }}
        color="primary"
        variant="outlined"
        type="number"
        label="Amount of the selling token"
        placeholder="10"
        size="medium"
        margin="none"
        onChange={(e) => setCount(+e.target.value)}
      />
      <div className="limitoftrade">
        <TextField
          className="sellatprice"
          sx={{ width: 138 }}
          color="primary"
          variant="outlined"
          type="number"
          label="Limit Min"
          placeholder="1"
          size="medium"
          margin="none"
          onChange={(e) => setLimitmin(+e.target.value)}
        />
        <div className="set-the-price">-</div>
        <TextField
          className="sellatprice"
          sx={{ width: 138 }}
          color="primary"
          variant="outlined"
          type="number"
          label="Limit Max"
          placeholder="10"
          size="medium"
          margin="none"
          onChange={(e) => setLimitmax(+e.target.value)}
        />
      </div>
      <div className="collateral-in-lyr">Collateral (in LYR):</div>
      <div className="collateral-section">
        <TextField
          className="sellatprice"
          sx={{ width: 301 }}
          color="primary"
          variant="outlined"
          type="text"
          label="Provide a guarantee for the trade"
          placeholder="100"
          size="medium"
          margin="none"
          onChange={(e) => setCollateral(+e.target.value)}
        />
        <div className="collateral-worth-label">
          <div className="set-the-price">Total worth in USD:</div>
          <div className="set-the-price">$103</div>
        </div>
      </div>
      <div className="collateral-in-lyr">Create order in DAO:</div>
      <Autocomplete
        sx={{ width: 301 }}
        disablePortal
        options={daos}
        onInputChange={onDaoSearchChange}
        onChange={(event, value) => setDaoId(value?.daoId!)}
        getOptionLabel={(option) => option.name}
        renderInput={(params: any) => (
          <TextField
            {...params}
            color="primary"
            label="Find DAO"
            variant="outlined"
            placeholder=""
            helperText="Select DAO the order will be created in"
            required
          />
        )}
        size="medium"
      />
      <div className="collateral-in-lyr">
        Current dealer is [dealer name]. You will contact buyers through the
        dealer.
      </div>
      <button className="reviewtheorder" onClick={onReviewTheOrderClick}>
        <div className="primary-button3">Review the Order</div>
      </button>
    </div>
  );
};

export default PriceAndCollateralForm;
