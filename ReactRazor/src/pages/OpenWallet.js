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
require("./OpenWallet.css");
const OpenWallet = () => {
    const [dropdownButtonSimpleTextOAnchorEl, setDropdownButtonSimpleTextOAnchorEl,] = (0, react_1.useState)(null);
    const [dropdownButtonSimpleTextOSelectedIndex, setDropdownButtonSimpleTextOSelectedIndex,] = (0, react_1.useState)(-1);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const dropdownButtonSimpleTextOOpen = Boolean(dropdownButtonSimpleTextOAnchorEl);
    const handleDropdownButtonSimpleTextOClick = (event) => {
        setDropdownButtonSimpleTextOAnchorEl(event.currentTarget);
    };
    const handleDropdownButtonSimpleTextOMenuItemClick = (index) => {
        setDropdownButtonSimpleTextOSelectedIndex(index);
        setDropdownButtonSimpleTextOAnchorEl(null);
    };
    const handleDropdownButtonSimpleTextOClose = () => {
        setDropdownButtonSimpleTextOAnchorEl(null);
    };
    const onSignUpClick = (0, react_1.useCallback)(() => {
        navigate("/create-wallet");
    }, [navigate]);
    return (react_1.default.createElement("div", { className: "open-wallet" },
        react_1.default.createElement("b", { className: "sign-in1" }, "Open Wallet"),
        react_1.default.createElement("img", { className: "illus5-copy-icon", alt: "", src: "_content/ReactRazor/imgs/illus5-copy.svg" }),
        react_1.default.createElement("div", null,
            react_1.default.createElement(material_1.Button, { id: "button-Select Wallet", "aria-controls": "menu-Select Wallet", "aria-haspopup": "true", "aria-expanded": dropdownButtonSimpleTextOOpen ? "true" : undefined, onClick: handleDropdownButtonSimpleTextOClick, color: "primary" }, "Select Wallet"),
            react_1.default.createElement(material_1.Menu, { anchorEl: dropdownButtonSimpleTextOAnchorEl, open: dropdownButtonSimpleTextOOpen, onClose: handleDropdownButtonSimpleTextOClose },
                react_1.default.createElement(material_1.MenuItem, { selected: dropdownButtonSimpleTextOSelectedIndex === 0, onClick: () => handleDropdownButtonSimpleTextOMenuItemClick(0) }, "wallet a"),
                react_1.default.createElement(material_1.MenuItem, { selected: dropdownButtonSimpleTextOSelectedIndex === 1, onClick: () => handleDropdownButtonSimpleTextOMenuItemClick(1) }, "walle b"))),
        react_1.default.createElement(material_1.TextField, { className: "box-22", sx: { width: 330 }, color: "primary", variant: "standard", type: "password", InputProps: {
                endAdornment: (react_1.default.createElement(material_1.InputAdornment, { position: "end" },
                    react_1.default.createElement(material_1.IconButton, { "aria-label": "toggle password visibility" },
                        react_1.default.createElement(material_1.Icon, null, "visibility")))),
            }, label: "Password", placeholder: "Placeholder", size: "medium", margin: "none", required: true }),
        react_1.default.createElement("button", { className: "button-shape-21" },
            react_1.default.createElement("div", { className: "button-shape1" }),
            react_1.default.createElement("div", { className: "label1" }, "Sign In")),
        react_1.default.createElement("div", { className: "frame-div1" },
            react_1.default.createElement("button", { className: "sign-up1", onClick: onSignUpClick }, "Sign Up"),
            react_1.default.createElement("button", { className: "forgot-password-copy-2" }, "Forgot password?"))));
};
exports.default = OpenWallet;
//# sourceMappingURL=OpenWallet.js.map