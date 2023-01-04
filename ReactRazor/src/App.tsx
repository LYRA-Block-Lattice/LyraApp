import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Empty from "./pages/Empty";
import ViewTradesForm from "./pages/ViewTradesForm";
import MintFiatToken from "./pages/MintFiatToken";
import CreateTOTForm from "./pages/CreateTOTForm";
import SellTOTToTOT from "./pages/SellTOTToTOT";
import SellTOTToToken from "./pages/SellTOTToToken";
import SellTokenToTOT from "./pages/SellTokenToTOT";
import SellTokenToToken from "./pages/SellTokenToToken";
import ViewOrdersForm from "./pages/ViewOrdersForm";
import CreateNFTForm from "./pages/CreateNFTForm";
import CreateOrderSuccessForm from "./pages/CreateOrderSuccessForm";
import PreviewSellOrderForm from "./pages/PreviewSellOrderForm";
import CreateTokenForm from "./pages/CreateTokenForm";
import StartToCreateOrder from "./pages/StartToCreateOrder";
import Market from "./pages/Market";
import Redir from "./pages/Redir";
import CreateWallet from "./pages/CreateWallet";
import OpenWallet from "./pages/OpenWallet";
import TransactionHistory from "./pages/TransactionHistory";
import OldV1UI from "./pages/OldV1UI";
import RedirBlazor from "./pages/RedirBlazor";
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
      case "/viewtradesform":
        title = "";
        metaDescription = "";
        break;
      case "/mint-fiat-token":
        title = "";
        metaDescription = "";
        break;
      case "/createtotform":
        title = "";
        metaDescription = "";
        break;
      case "/selltottotot":
        title = "";
        metaDescription = "";
        break;
      case "/selltottotoken":
        title = "";
        metaDescription = "";
        break;
      case "/selltokentotot":
        title = "";
        metaDescription = "";
        break;
      case "/selltokentotoken":
        title = "";
        metaDescription = "";
        break;
      case "/viewordersform":
        title = "";
        metaDescription = "";
        break;
      case "/createnftform":
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
      case "/createtokenform":
        title = "";
        metaDescription = "";
        break;
      case "/starttocreateorder":
        title = "";
        metaDescription = "";
        break;
      case "/market":
        title = "";
        metaDescription = "";
        break;
      case "/redir":
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
      case "/transactionhistory":
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

      <Route path="/viewtradesform" element={<ViewTradesForm />} />

      <Route path="/mint-fiat-token" element={<MintFiatToken />} />

      <Route path="/createtotform" element={<CreateTOTForm />} />

      <Route path="/selltottotot" element={<SellTOTToTOT />} />

      <Route path="/selltottotoken" element={<SellTOTToToken />} />

      <Route path="/selltokentotot" element={<SellTokenToTOT />} />

      <Route path="/selltokentotoken" element={<SellTokenToToken />} />

      <Route path="/viewordersform" element={<ViewOrdersForm />} />

      <Route path="/createnftform" element={<CreateNFTForm />} />

      <Route
        path="/createordersuccessform"
        element={<CreateOrderSuccessForm />}
      />

      <Route path="/previewsellorderform" element={<PreviewSellOrderForm />} />

      <Route path="/createtokenform" element={<CreateTokenForm />} />

      <Route path="/starttocreateorder" element={<StartToCreateOrder />} />

      <Route path="/market" element={<Market />} />

      <Route path="/transactionhistory" element={<TransactionHistory />} />

      <Route path="/redir/:id" element={<RedirBlazor />} />

      <Route path="/create-wallet" element={<CreateWallet />} />

      <Route path="/open-wallet" element={<OpenWallet />} />

      <Route path="/transactionhistory" element={<TransactionHistory />} />

      <Route path="/oldv1ui" element={<OldV1UI />} />
    </Routes>
  );
}
export default App;
