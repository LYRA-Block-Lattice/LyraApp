import { FunctionComponent, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./SignTradeSecretForm.css";

const SignTradeSecretForm: FunctionComponent = () => {
  const navigate = useNavigate();

  const onPrepareSellOrderButtonClick = useCallback(() => {
    navigate("/createtotform");
  }, [navigate]);

  return (
    <div className="signtradesecretform">
      <div className="sign-trade-secret">Sign Trade Secret</div>
      <div className="to-protect-privacy-lyra-block">
        To protect privacy, Lyra blockchain never record trade secret. What the
        blockchain needed is a digital signature of the trade secret.
      </div>
      <textarea
        className="tot-description"
        placeholder={`Please pay to my bank account number:

Bank of America
1234 1234 1234 1234`}
      />
      <button
        className="prepare-sell-order-button2"
        onClick={onPrepareSellOrderButtonClick}
      >
        <div className="utility-button1">Sign and return</div>
      </button>
    </div>
  );
};

export default SignTradeSecretForm;
