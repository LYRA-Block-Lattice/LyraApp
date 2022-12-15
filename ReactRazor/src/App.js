"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const CreateWallet_1 = __importDefault(require("./pages/CreateWallet"));
const OpenWallet_1 = __importDefault(require("./pages/OpenWallet"));
const react_1 = __importStar(require("react"));
function App() {
    const action = (0, react_router_dom_1.useNavigationType)();
    const location = (0, react_router_dom_1.useLocation)();
    const pathname = location.pathname;
    (0, react_1.useEffect)(() => {
        if (action !== "POP") {
            window.scrollTo(0, 0);
        }
    }, [action]);
    (0, react_1.useEffect)(() => {
        let title = "";
        let metaDescription = "";
        switch (pathname) {
            case "/":
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
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(HomePage_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/create-wallet", element: react_1.default.createElement(CreateWallet_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/open-wallet", element: react_1.default.createElement(OpenWallet_1.default, null) })));
}
exports.default = App;
//# sourceMappingURL=App.js.map