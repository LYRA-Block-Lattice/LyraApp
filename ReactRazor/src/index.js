"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = require("react-dom/client");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
const react_router_dom_1 = require("react-router-dom");
const material_1 = require("@mui/material");
require("./global.css");
const muiTheme = (0, material_1.createTheme)();
const container = document.getElementById("root");
const root = (0, client_1.createRoot)(container);
root.render(react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
    react_1.default.createElement(material_1.StyledEngineProvider, { injectFirst: true },
        react_1.default.createElement(material_1.ThemeProvider, { theme: muiTheme },
            react_1.default.createElement(material_1.CssBaseline, null),
            react_1.default.createElement(App_1.default, null)))));
(0, reportWebVitals_1.default)();
//# sourceMappingURL=index.js.map