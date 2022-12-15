"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portal = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const react_dom_1 = require("react-dom");
require("./PortalPopup.css");
const PortalPopup = ({ children, overlayColor, placement = "Centered", onOutsideClick, zIndex = 100, left = 0, right = 0, top = 0, bottom = 0, relativeLayerRef, }) => {
    const relContainerRef = (0, react_2.useRef)(null);
    const [relativeStyle, setRelativeStyle] = (0, react_2.useState)({});
    const popupStyle = (0, react_2.useMemo)(() => {
        const style = {};
        style.zIndex = zIndex;
        if (overlayColor) {
            style.backgroundColor = overlayColor;
        }
        if (!relativeLayerRef?.current) {
            switch (placement) {
                case "Centered":
                    style.alignItems = "center";
                    style.justifyContent = "center";
                    break;
                case "Top left":
                    style.alignItems = "flex-start";
                    break;
                case "Top center":
                    style.alignItems = "center";
                    break;
                case "Top right":
                    style.alignItems = "flex-end";
                    break;
                case "Bottom left":
                    style.alignItems = "flex-start";
                    style.justifyContent = "flex-end";
                    break;
                case "Bottom center":
                    style.alignItems = "center";
                    style.justifyContent = "flex-end";
                    break;
                case "Bottom right":
                    style.alignItems = "flex-end";
                    style.justifyContent = "flex-end";
                    break;
            }
        }
        return style;
    }, [placement, overlayColor, zIndex, relativeLayerRef?.current]);
    const setPosition = (0, react_2.useCallback)(() => {
        const relativeItem = relativeLayerRef?.current?.getBoundingClientRect();
        const containerItem = relContainerRef?.current?.getBoundingClientRect();
        const style = {};
        if (relativeItem && containerItem) {
            const { x: relativeX, y: relativeY, width: relativeW, height: relativeH, } = relativeItem;
            const { width: containerW, height: containerH } = containerItem;
            style.position = "absolute";
            switch (placement) {
                case "Top left":
                    style.top = relativeY - containerH - top;
                    style.left = relativeX + left;
                    break;
                case "Top right":
                    style.top = relativeY - containerH - top;
                    style.left = relativeX + relativeW - containerW - right;
                    break;
                case "Bottom left":
                    style.top = relativeY + relativeH + bottom;
                    style.left = relativeX + left;
                    break;
                case "Bottom right":
                    style.top = relativeY + relativeH + bottom;
                    style.left = relativeX + relativeW - containerW - right;
                    break;
            }
            setRelativeStyle(style);
        }
        else {
            style.maxWidth = "90%";
            style.maxHeight = "90%";
            setRelativeStyle(style);
        }
    }, [
        left,
        right,
        top,
        bottom,
        placement,
        relativeLayerRef?.current,
        relContainerRef?.current,
    ]);
    (0, react_2.useEffect)(() => {
        setPosition();
        window.addEventListener("resize", setPosition);
        window.addEventListener("scroll", setPosition, true);
        return () => {
            window.removeEventListener("resize", setPosition);
            window.removeEventListener("scroll", setPosition, true);
        };
    }, [setPosition]);
    const onOverlayClick = (0, react_2.useCallback)((e) => {
        if (onOutsideClick &&
            e.target.classList.contains("portalPopupOverlay")) {
            onOutsideClick();
        }
        e.stopPropagation();
    }, [onOutsideClick]);
    return (react_1.default.createElement(exports.Portal, null,
        react_1.default.createElement("div", { className: "portalPopupOverlay", style: popupStyle, onClick: onOverlayClick },
            react_1.default.createElement("div", { ref: relContainerRef, style: relativeStyle }, children))));
};
const Portal = ({ children, containerId = "portals", }) => {
    let portalsDiv = document.getElementById(containerId);
    if (!portalsDiv) {
        portalsDiv = document.createElement("div");
        portalsDiv.setAttribute("id", containerId);
        document.body.appendChild(portalsDiv);
    }
    return (0, react_dom_1.createPortal)(children, portalsDiv);
};
exports.Portal = Portal;
exports.default = PortalPopup;
//# sourceMappingURL=PortalPopup.js.map