"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
require("./CreateWallet.css");
const CreateWallet = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const onSignInClick = (0, react_2.useCallback)(() => {
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