"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const OpenWallet_1 = __importDefault(require("./pages/OpenWallet"));
const CreateWallet_1 = __importDefault(require("./pages/CreateWallet"));
const react_2 = require("react");
function App() {
    const action = (0, react_router_dom_1.useNavigationType)();
    const location = (0, react_router_dom_1.useLocation)();
    const pathname = location.pathname;
    (0, react_2.useEffect)(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action]);
    (0, react_2.useEffect)(() => {
        let title = "";
        let metaDescription = "";
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
            const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
            if (metaDescriptionTag) {
                metaDescriptionTag.content = metaDescription;
            }
        }
    }, [pathname]);
    return (react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/open-wallet", element: react_1.default.createElement(OpenWallet_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/create-wallet", element: react_1.default.createElement(CreateWallet_1.default, null) })));
}
exports.default = App;
//# sourceMappingURL=App.js.map