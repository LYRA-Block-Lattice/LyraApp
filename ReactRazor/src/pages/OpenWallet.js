"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
require("./OpenWallet.css");
const OpenWallet = () => {
    const [dropdownButtonSimpleTextOAnchorEl, setDropdownButtonSimpleTextOAnchorEl,] = (0, react_2.useState)(null);
    const [dropdownButtonSimpleTextOSelectedIndex, setDropdownButtonSimpleTextOSelectedIndex,] = (0, react_2.useState)(-1);
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
    const onSignUpClick = (0, react_2.useCallback)(() => {
        navigate("/create-wallet");
    }, [navigate]);
    const onOpenWallet = (0, react_2.useCallback)(() => {
        alert("call me!");
    }, []);
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
        react_1.default.createElement("button", { className: "button-shape-21", onClick: onOpenWallet },
            react_1.default.createElement("div", { className: "button-shape1" }),
            react_1.default.createElement("div", { className: "label1" }, "Sign In")),
        react_1.default.createElement("div", { className: "frame-div" },
            react_1.default.createElement("button", { className: "sign-up1", onClick: onSignUpClick }, "Sign Up"),
            react_1.default.createElement("button", { className: "forgot-password-copy-2" }, "Forgot password?"))));
};
exports.default = OpenWallet;
//# sourceMappingURL=OpenWallet.js.map