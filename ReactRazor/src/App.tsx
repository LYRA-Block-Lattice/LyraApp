import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Empty from "./pages/Empty";
import SellTokenToTOT from "./pages/SellTokenToTOT";
import SellTokenToFiat from "./pages/SellTokenToFiat";
import SellFiatToTOT from "./pages/SellFiatToTOT";
import SellFiatToFiat from "./pages/SellFiatToFiat";
import SellTOTToTOT from "./pages/SellTOTToTOT";
import SellTOTToFiat from "./pages/SellTOTToFiat";
import SellTOTToToken from "./pages/SellTOTToToken";
import SellFiatToToken from "./pages/SellFiatToToken";
import SellTokenToToken from "./pages/SellTokenToToken";
import ViewTradesForm from "./pages/ViewTradesForm";
import ViewOrdersForm from "./pages/ViewOrdersForm";
import CreateOrderSuccessForm from "./pages/CreateOrderSuccessForm";
import PreviewSellOrderForm from "./pages/PreviewSellOrderForm";
import CreateNFTForm from "./pages/CreateNFTForm";
import CreateTokenForm from "./pages/CreateTokenForm";
import StartToCreateOrder from "./pages/StartToCreateOrder";
import TransactionHistory from "./pages/TransactionHistory";
import Redir from "./pages/Redir";
import Market from "./pages/Market";
import CreateWallet from "./pages/CreateWallet";
import OpenWallet from "./pages/OpenWallet";
import CreateTOTForm from "./pages/CreateTOTForm";
import PriceAndCollateralForm from "./pages/PriceAndCollateralForm";
import SelectTokenNameForm from "./pages/SelectTokenNameForm";
import SelectOfferingAndBiding from "./pages/SelectOfferingAndBiding";
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
      case "/selltokentotot":
        title = "";
        metaDescription = "";
        break;
      case "/selltokentofiat":
        title = "";
        metaDescription = "";
        break;
      case "/sellfiattotot":
        title = "";
        metaDescription = "";
        break;
      case "/sellfiattofiat":
        title = "";
        metaDescription = "";
        break;
      case "/selltottotot":
        title = "";
        metaDescription = "";
        break;
      case "/selltottofiat":
        title = "";
        metaDescription = "";
        break;
      case "/selltottotoken":
        title = "";
        metaDescription = "";
        break;
      case "/sellfiattotoken":
        title = "";
        metaDescription = "";
        break;
      case "/selltokentotoken":
        title = "";
        metaDescription = "";
        break;
      case "/viewtradesform":
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
      case "/previewsellorderform":
        title = "";
        metaDescription = "";
        break;
      case "/createnftform":
        title = "";
        metaDescription = "";
        break;
      case "/createtokenform":
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
      case "/createtotform":
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
      case "/selectofferingandbiding":
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

      <Route path="/selltokentotot" element={<SellTokenToTOT />} />

      <Route path="/selltokentofiat" element={<SellTokenToFiat />} />

      <Route path="/sellfiattotot" element={<SellFiatToTOT />} />

      <Route path="/sellfiattofiat" element={<SellFiatToFiat />} />

      <Route path="/selltottotot" element={<SellTOTToTOT />} />

      <Route path="/selltottofiat" element={<SellTOTToFiat />} />

      <Route path="/selltottotoken" element={<SellTOTToToken />} />

      <Route path="/sellfiattotoken" element={<SellFiatToToken />} />

      <Route path="/selltokentotoken" element={<SellTokenToToken />} />

      <Route path="/viewtradesform" element={<ViewTradesForm />} />

      <Route path="/viewordersform" element={<ViewOrdersForm />} />

      <Route
        path="/createordersuccessform"
        element={<CreateOrderSuccessForm />}
      />

      <Route path="/previewsellorderform" element={<PreviewSellOrderForm />} />

      <Route path="/createnftform" element={<CreateNFTForm />} />

      <Route path="/createtokenform" element={<CreateTokenForm />} />

      <Route path="/starttocreateorder" element={<StartToCreateOrder />} />

      <Route path="/transactionhistory" element={<TransactionHistory />} />

      <Route path="/redir" element={<Redir />} />

      <Route path="/market" element={<Market />} />

      <Route path="/create-wallet" element={<CreateWallet />} />

      <Route path="/open-wallet" element={<OpenWallet />} />

      <Route path="/createtotform" element={<CreateTOTForm />} />

      <Route
        path="/priceandcollateralform"
        element={<PriceAndCollateralForm />}
      />

      <Route path="/selecttokennameform" element={<SelectTokenNameForm />} />

      <Route
        path="/selectofferingandbiding"
        element={<SelectOfferingAndBiding />}
      />

      <Route path="/iconparksolidworker" element={<IconParkSolidworker />} />

      <Route path="/oldv1ui" element={<OldV1UI />} />
    </Routes>
  );
}
export default App;
