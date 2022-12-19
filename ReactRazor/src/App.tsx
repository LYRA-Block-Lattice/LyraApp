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
import SelectTokenTypeToCreateOrder from "./pages/SelectTokenTypeToCreateOrder";
import TransactionHistory from "./pages/TransactionHistory";
import Redir from "./pages/Redir";
import Market from "./pages/Market";
import CreateWallet from "./pages/CreateWallet";
import OpenWallet from "./pages/OpenWallet";
import RedirBlazor from "./pages/RedirBlazor";
import { useEffect } from "react";

interface customWindow extends Window {
    lyraSetProxy?: any;
    lyraProxy?: any;
}

declare const window: customWindow;

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
      case "/selecttokenform":
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
      case "/selecttokentypetocreateorder":
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

  window.lyraSetProxy = (dotnetHelper) => {
    window.lyraProxy = dotnetHelper;
  };

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

      <Route path="/selecttokenform" element={<SelectTokenNameForm />} />

      <Route path="/createtokenform" element={<CreateTokenForm />} />

      <Route
        path="/selecttokenfororder"
        element={<SelectOfferingAndBiding />}
      />

      <Route
        path="/selecttokentypetocreateorder"
        element={<SelectTokenTypeToCreateOrder />}
      />

      <Route path="/transactionhistory" element={<TransactionHistory />} />

      <Route path="/redir/:id" element={<RedirBlazor />} />

      <Route path="/create-wallet" element={<CreateWallet />} />

      <Route path="/open-wallet" element={<OpenWallet />} />      
    </Routes>
  );
}
export default App;
