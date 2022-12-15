import React from 'react'
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import OpenWallet from "./pages/OpenWallet";
import CreateWallet from "./pages/CreateWallet";
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
        case "/open-wallet":
        title = "";
        metaDescription = "";
        break;
      case "/create-wallet":
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
      <Route path="/open-wallet" element={<OpenWallet />} />

      <Route path="/create-wallet" element={<CreateWallet />} />
    </Routes>
  );
}
export default App;
