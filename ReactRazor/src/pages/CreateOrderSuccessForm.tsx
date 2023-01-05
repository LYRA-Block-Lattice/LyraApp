import { FunctionComponent, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./CreateOrderSuccessForm.css";

const CreateOrderSuccessForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});
  const tx = searchParams.get("tx");

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/viewordersform");
  }, [navigate]);

  return (
    <div className="createordersuccessform">
      <div className="success">Success!</div>
      <img className="illus8-icon" alt="" src="_content/ReactRazor/asserts/illus8.svg" />
      <div className="you-order-tx">You order TX Hash is:</div>
      <div className="blvm6g1jjkwuz8ocens7fuuswjqdr3">
        {tx}
      </div>
      <a
        className="view-on-block"
        href="https://nebula.lyra.live/showblock/{tx}"
        target="_blank"
      >
        View on block explorer
      </a>
      <button
        className="prepare-sell-order-button13"
        onClick={onPrepareSellOrderButtonClick}
      >
        <div className="secondary-button6">View my orders</div>
      </button>
    </div>
  );
};

export default CreateOrderSuccessForm;
