import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateOrderSuccessForm.css";

const CreateOrderSuccessForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onViewMyOrdersButtonClick = useCallback(() => {
    navigate("/market");
  }, [navigate]);

  return (
    <div className="createordersuccessform">
      <div className="success">Success!</div>
      <img className="illus8-icon" alt="" src="_content/ReactRazor/asserts/illus8.svg" />
      <div className="you-order-tx-hash-is">You order TX Hash is:</div>
      <a
        className="view-on-block-explorer"
        href="https://nebula.lyra.live/showblock/FuF7e1ZaBdmqB6cc5PfxitShUnR5WWNKcm59ofYPCXua"
        target="_blank"
      >
        View on block explorer
      </a>
      <div className="blvm6g1jjkwuz8ocens7fuuswjqdr3">
        BLVm6g1JJkWUZ8oCenS7FuusWJQdR3deCwtRk6U7Rt8L
      </div>
      <button
        className="view-my-orders-button"
        onClick={onViewMyOrdersButtonClick}
      >
        <div className="rectangle-div" />
        <div className="view-my-orders">View my orders</div>
      </button>
    </div>
  );
};

export default CreateOrderSuccessForm;
