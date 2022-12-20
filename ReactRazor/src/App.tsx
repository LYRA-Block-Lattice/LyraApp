import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Empty from "./pages/Empty";
import ViewOrdersForm from "./pages/ViewOrdersForm";
import CreateOrderSuccessForm from "./pages/CreateOrderSuccessForm";
import SignTradeSecretForm from "./pages/SignTradeSecretForm";
import PreviewSellOrderForm from "./pages/PreviewSellOrderForm";
import CreateTOTForm from "./pages/CreateTOTForm";
import CreateNFTForm from "./pages/CreateNFTForm";
import PriceAndCollateralForm from "./pages/PriceAndCollateralForm";
import SelectTokenNameForm from "./pages/SelectTokenNameForm";
import CreateTokenForm from "./pages/CreateTokenForm";
import SelectOfferingAndBiding from "./pages/SelectOfferingAndBiding";
import StartToCreateOrder from "./pages/StartToCreateOrder";
import TransactionHistory from "./pages/TransactionHistory";
import Redir from "./pages/Redir";
import Market from "./pages/Market";
import CreateWallet from "./pages/CreateWallet";
import OpenWallet from "./pages/OpenWallet";
import IconParkSolidworker from "./pages/IconParkSolidworker";
import OldV1UI from "./pages/OldV1UI";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/viewordersform":
        title = "";
        metaDescription = "";
        break;
      case "/createordersuccessform":
        title = "";
        metaDescription = "";
        break;
      case "/signtradesecretform":
        title = "";
        metaDescription = "";
        break;
      case "/previewsellorderform":
        title = "";
        metaDescription = "";
        break;
      case "/createtotform":
        title = "";
        metaDescription = "";
        break;
      case "/createnftform":
        title = "";
        metaDescription = "";
        break;
      case "/priceandcollateralform":
        title = "";
        metaDescription = "";
        break;
      case "/selecttokennameform":
        title = "";
        metaDescription = "";
        break;
      case "/createtokenform":
        title = "";
        metaDescription = "";
        break;
      case "/selecttokenfororder":
        title = "";
        metaDescription = "";
        break;
      case "/starttocreateorder":
        title = "";
        metaDescription = "";
        break;
      case "/transactionhistory":
        title = "";
        metaDescription = "";
        break;
      case "/redir":
        title = "";
        metaDescription = "";
        break;
      case "/market":
        title = "";
        metaDescription = "";
        break;
      case "/create-wallet":
        title = "";
        metaDescription = "";
        break;
      case "/open-wallet":
        title = "";
        metaDescription = "";
        break;
      case "/iconparksolidworker":
        title = "";
        metaDescription = "";
        break;
      case "/oldv1ui":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Empty />} />

      <Route path="/viewordersform" element={<ViewOrdersForm />} />

      <Route
        path="/createordersuccessform"
        element={<CreateOrderSuccessForm />}
      />

      <Route path="/signtradesecretform" element={<SignTradeSecretForm />} />

      <Route path="/previewsellorderform" element={<PreviewSellOrderForm />} />

      <Route path="/createtotform" element={<CreateTOTForm />} />

      <Route path="/createnftform" element={<CreateNFTForm />} />

      <Route
        path="/priceandcollateralform"
        element={<PriceAndCollateralForm />}
      />

      <Route path="/selecttokennameform" element={<SelectTokenNameForm />} />

      <Route path="/createtokenform" element={<CreateTokenForm />} />

      <Route
        path="/selecttokenfororder"
        element={<SelectOfferingAndBiding />}
      />

      <Route path="/starttocreateorder" element={<StartToCreateOrder />} />

      <Route path="/transactionhistory" element={<TransactionHistory />} />

      <Route path="/redir" element={<Redir />} />

      <Route path="/market" element={<Market />} />

      <Route path="/create-wallet" element={<CreateWallet />} />

      <Route path="/open-wallet" element={<OpenWallet />} />

      <Route path="/iconparksolidworker" element={<IconParkSolidworker />} />

      <Route path="/oldv1ui" element={<OldV1UI />} />
    </Routes>
  );
}
export default App;
