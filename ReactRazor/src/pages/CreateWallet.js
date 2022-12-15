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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
require("./CreateWallet.css");
const CreateWallet = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const onSignInClick = (0, react_1.useCallback)(() => {
        navigate("/open-wallet");
    }, [navigate]);
    return (react_1.default.createElement("div", { className: "create-wallet" },
        react_1.default.createElement("b", { className: "sign-up" }, "Create Wallet"),
        react_1.default.createElement(material_1.TextField, { className: "box-2-copy", sx: { width: 343 }, color: "primary", variant: "standard", type: "text", label: "Wallet Name", placeholder: "Placeholder", size: "medium", margin: "none", required: true }),
        react_1.default.createElement(material_1.TextField, { className: "box-2-copy", sx: { width: 343 }, color: "primary", variant: "standard", type: "password", InputProps: {
                endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_1.default.createElement(material_1.IconButton, { "aria-label": "toggle password visibility" },
                        react_1.default.createElement(material_1.Icon, null, "visibility")))),
            }, label: "Password", placeholder: "Placeholder", size: "medium", margin: "none", required: true }),
        react_1.default.createElement(material_1.TextField, { className: "box-2-copy", sx: { width: 343 }, color: "primary", variant: "standard", type: "password", InputProps: {
                endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_1.default.createElement(material_1.IconButton, { "aria-label": "toggle password visibility" },
                        react_1.default.createElement(material_1.Icon, null, "visibility")))),
            }, label: "Confirm password", placeholder: "Placeholder", size: "medium", margin: "none", required: true }),
        react_1.default.createElement(material_1.FormControlLabel, { label: "Label", labelPlacement: "end", control: react_1.default.createElement(material_1.Checkbox, { color: "primary", size: "medium" }) }),
        react_1.default.createElement(material_1.TextField, { className: "box-2-copy", sx: { width: 343 }, color: "primary", variant: "standard", type: "text", label: "Private Key", placeholder: "Placeholder", size: "medium", margin: "none" }),
        react_1.default.createElement("button", { className: "button-shape-2" },
            react_1.default.createElement("div", { className: "button-shape" }),
            react_1.default.createElement("div", { className: "label" }, "Sign Up")),
        react_1.default.createElement("button", { className: "sign-in", onClick: onSignInClick }, "Sign In")));
};
exports.default = CreateWallet;
//# sourceMappingURL=CreateWallet.js.map