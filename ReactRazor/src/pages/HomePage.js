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
const react_1 = __importStar(require("react"));
const MatterhornPopup_1 = __importDefault(require("../components/MatterhornPopup"));
const PortalPopup_1 = __importDefault(require("../components/PortalPopup"));
require("./HomePage.css");
const HomePage = () => {
    const [isMatterhornPopupOpen, setMatterhornPopupOpen] = (0, react_1.useState)(false);
    const openMatterhornPopup = (0, react_1.useCallback)(() => {
        setMatterhornPopupOpen(true);
    }, []);
    const closeMatterhornPopup = (0, react_1.useCallback)(() => {
        setMatterhornPopupOpen(false);
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "homepage" },
            react_1.default.createElement("div", { className: "bannersection" },
                react_1.default.createElement("button", { className: "illus7", onClick: openMatterhornPopup },
                    react_1.default.createElement("img", { className: "group-icon", alt: "", src: "_content/ReactRazor/imgs/group-3.svg" }),
                    react_1.default.createElement("img", { className: "fill-3-icon", alt: "", src: "_content/ReactRazor/imgs/fill-3.svg" }),
                    react_1.default.createElement("img", { className: "fill-6-icon", alt: "", src: "_content/ReactRazor/imgs/fill-6.svg" }),
                    react_1.default.createElement("img", { className: "fill-1-icon", alt: "", src: "_content/ReactRazor/imgs/fill-1.svg" }),
                    react_1.default.createElement("img", { className: "fill-62-icon", alt: "", src: "_content/ReactRazor/imgs/fill-62.svg" }),
                    react_1.default.createElement("img", { className: "fill-62-copy", alt: "", src: "_content/ReactRazor/imgs/fill-62-copy.svg" }),
                    react_1.default.createElement("img", { className: "group-icon1", alt: "", src: "_content/ReactRazor/imgs/group-23.svg" }),
                    react_1.default.createElement("div", { className: "group-div" },
                        react_1.default.createElement("img", { className: "group-icon2", alt: "", src: "_content/ReactRazor/imgs/group-221.svg" }),
                        react_1.default.createElement("div", { className: "div" }, ` `)),
                    react_1.default.createElement("img", { className: "group-icon3", alt: "", src: "_content/ReactRazor/imgs/group-231.svg" }))),
            react_1.default.createElement("div", { className: "cataloguesection" },
                react_1.default.createElement("b", { className: "catalogue" }, "Catalogue"),
                react_1.default.createElement("div", { className: "frame-div" },
                    react_1.default.createElement("div", { className: "living-room" },
                        react_1.default.createElement("div", { className: "nathan-fertig-249917-unsplash" },
                            react_1.default.createElement("div", { className: "mask" }),
                            react_1.default.createElement("div", { className: "mask1" })),
                        react_1.default.createElement("b", { className: "living-room1" }, `CNY -> USDT`)),
                    react_1.default.createElement("div", { className: "living-room" },
                        react_1.default.createElement("div", { className: "mask" }),
                        react_1.default.createElement("div", { className: "mask3" }),
                        react_1.default.createElement("b", { className: "office1" }, `USDT -> CNY`)),
                    react_1.default.createElement("div", { className: "kitchen" },
                        react_1.default.createElement("div", { className: "nathan-fertig-249917-unsplash" },
                            react_1.default.createElement("div", { className: "mask" }),
                            react_1.default.createElement("div", { className: "mask5" })),
                        react_1.default.createElement("b", { className: "kitchen-dining" }, `CNY -> USD`)),
                    react_1.default.createElement("div", { className: "kitchen" },
                        react_1.default.createElement("div", { className: "nathan-fertig-249917-unsplash" },
                            react_1.default.createElement("div", { className: "mask" }),
                            react_1.default.createElement("div", { className: "mask7" })),
                        react_1.default.createElement("b", { className: "kitchen-dining" }, `USD -> CNY`)),
                    react_1.default.createElement("div", { className: "kitchen" },
                        react_1.default.createElement("div", { className: "mask" }),
                        react_1.default.createElement("div", { className: "mask9" }),
                        react_1.default.createElement("b", { className: "kitchen-dining" }, `CNY -> ETH`)))),
            react_1.default.createElement("div", { className: "dealsection" },
                react_1.default.createElement("div", { className: "rectangle" }),
                react_1.default.createElement("b", { className: "yellow-sofa" }, "Yellow sofa"),
                react_1.default.createElement("div", { className: "div1" }, `$600 `),
                react_1.default.createElement("div", { className: "group-div1" },
                    react_1.default.createElement("div", { className: "div2" }, "$1.200"),
                    react_1.default.createElement("img", { className: "iconglyphstar-copy-2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-2.svg" })),
                react_1.default.createElement("div", { className: "div3" }, "4.8"),
                react_1.default.createElement("div", { className: "div4" }, "(849)"),
                react_1.default.createElement("img", { className: "iconglyphstar", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar.svg" }),
                react_1.default.createElement("div", { className: "end-in-12001" }, "End in 1:20:01"),
                react_1.default.createElement("img", { className: "iconglyphstar-copy", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy.svg" }),
                react_1.default.createElement("div", { className: "group-div2" },
                    react_1.default.createElement("img", { className: "path-5-icon", alt: "", src: "_content/ReactRazor/imgs/path-5.svg" }),
                    react_1.default.createElement("div", { className: "rectangle1" }),
                    react_1.default.createElement("div", { className: "div5" }, "50%")),
                react_1.default.createElement("div", { className: "rectangle2" }),
                react_1.default.createElement("b", { className: "blue-sofa" }, "Blue sofa"),
                react_1.default.createElement("div", { className: "div6" }, `$750 `),
                react_1.default.createElement("div", { className: "group-div3" },
                    react_1.default.createElement("div", { className: "div7" }, "$1.500"),
                    react_1.default.createElement("img", { className: "iconglyphstar-copy-2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-21.svg" })),
                react_1.default.createElement("div", { className: "div8" }, "4.8"),
                react_1.default.createElement("div", { className: "div9" }, "(849)"),
                react_1.default.createElement("img", { className: "iconglyphstar1", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar.svg" }),
                react_1.default.createElement("div", { className: "end-in-120011" }, "End in 1:20:01"),
                react_1.default.createElement("img", { className: "iconglyphstar-copy1", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy.svg" }),
                react_1.default.createElement("div", { className: "group-div4" },
                    react_1.default.createElement("img", { className: "path-5-icon", alt: "", src: "_content/ReactRazor/imgs/path-5.svg" }),
                    react_1.default.createElement("div", { className: "rectangle1" }),
                    react_1.default.createElement("div", { className: "div5" }, "50%")),
                react_1.default.createElement("b", { className: "deal-of-the-day" }, "Deal of the day"),
                react_1.default.createElement("b", { className: "see-all" }, "See all"),
                react_1.default.createElement("img", { className: "frame-icon", alt: "", src: "_content/ReactRazor/imgs/frame.svg" }),
                react_1.default.createElement("img", { className: "frame-icon1", alt: "", src: "_content/ReactRazor/imgs/frame1.svg" })),
            react_1.default.createElement("div", { className: "bestsellersection" },
                react_1.default.createElement("b", { className: "best-seller" }, "Best seller"),
                react_1.default.createElement("div", { className: "rectangle-copy-3" },
                    react_1.default.createElement("div", { className: "rectangle-copy-31" }),
                    react_1.default.createElement("b", { className: "pattern-armchair" }, "Pattern armchair"),
                    react_1.default.createElement("img", { className: "iconglyphbuy-copy-11", alt: "", src: "_content/ReactRazor/imgs/iconglyphbuy-copy-11.svg" }),
                    react_1.default.createElement("div", { className: "group-div5" },
                        react_1.default.createElement("div", { className: "div11" }, "$250"),
                        react_1.default.createElement("img", { className: "iconglyphstar-copy-22", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-22.svg" })),
                    react_1.default.createElement("div", { className: "group-div6" },
                        react_1.default.createElement("div", { className: "div12" }, "4.8"),
                        react_1.default.createElement("div", { className: "div13" }, "(849)"),
                        react_1.default.createElement("img", { className: "iconglyphstar2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar2.svg" }))),
                react_1.default.createElement("div", { className: "rectangle-copy-5" },
                    react_1.default.createElement("div", { className: "rectangle-copy-31" }),
                    react_1.default.createElement("b", { className: "pattern-armchair1" }, "Green chair"),
                    react_1.default.createElement("img", { className: "iconglyphbuy-copy-11", alt: "", src: "_content/ReactRazor/imgs/iconglyphbuy-copy-111.svg" }),
                    react_1.default.createElement("div", { className: "group-div5" },
                        react_1.default.createElement("div", { className: "div14" }, "$120"),
                        react_1.default.createElement("img", { className: "iconglyphstar-copy-22", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-23.svg" })),
                    react_1.default.createElement("div", { className: "group-div6" },
                        react_1.default.createElement("div", { className: "div12" }, "4.8"),
                        react_1.default.createElement("div", { className: "div13" }, "(800)"),
                        react_1.default.createElement("img", { className: "iconglyphstar2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar2.svg" }))),
                react_1.default.createElement("div", { className: "rectangle-copy-4" },
                    react_1.default.createElement("div", { className: "rectangle-copy-31" }),
                    react_1.default.createElement("b", { className: "pattern-armchair1" }, "Green chair"),
                    react_1.default.createElement("img", { className: "iconglyphbuy-copy-11", alt: "", src: "_content/ReactRazor/imgs/iconglyphbuy-copy-111.svg" }),
                    react_1.default.createElement("div", { className: "group-div5" },
                        react_1.default.createElement("div", { className: "div17" }, "$300"),
                        react_1.default.createElement("img", { className: "iconglyphstar-copy-22", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-24.svg" })),
                    react_1.default.createElement("div", { className: "group-div6" },
                        react_1.default.createElement("div", { className: "div12" }, "4.5"),
                        react_1.default.createElement("div", { className: "div13" }, "(765)"),
                        react_1.default.createElement("img", { className: "iconglyphstar2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar4.svg" }))),
                react_1.default.createElement("div", { className: "rectangle-copy-6" },
                    react_1.default.createElement("div", { className: "rectangle-copy-31" }),
                    react_1.default.createElement("b", { className: "pattern-armchair3" }, "Gray chair"),
                    react_1.default.createElement("img", { className: "iconglyphbuy-copy-11", alt: "", src: "_content/ReactRazor/imgs/iconglyphbuy-copy-11.svg" }),
                    react_1.default.createElement("div", { className: "group-div5" },
                        react_1.default.createElement("div", { className: "div11" }, "$160"),
                        react_1.default.createElement("img", { className: "iconglyphstar-copy-22", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar-copy-25.svg" })),
                    react_1.default.createElement("div", { className: "group-div6" },
                        react_1.default.createElement("div", { className: "div12" }, "4.6"),
                        react_1.default.createElement("div", { className: "div22" }, "(745)"),
                        react_1.default.createElement("img", { className: "iconglyphstar2", alt: "", src: "_content/ReactRazor/imgs/iconglyphstar4.svg" }))),
                react_1.default.createElement("img", { className: "frame-icon2", alt: "", src: "_content/ReactRazor/imgs/frame2.svg" }),
                react_1.default.createElement("img", { className: "frame-icon3", alt: "", src: "_content/ReactRazor/imgs/frame3.svg" }),
                react_1.default.createElement("img", { className: "frame-icon4", alt: "", src: "_content/ReactRazor/imgs/frame4.svg" }),
                react_1.default.createElement("img", { className: "frame-icon5", alt: "", src: "_content/ReactRazor/imgs/frame5.svg" }))),
        isMatterhornPopupOpen && (react_1.default.createElement(PortalPopup_1.default, { overlayColor: "rgba(113, 113, 113, 0.3)", placement: "Centered", onOutsideClick: closeMatterhornPopup },
            react_1.default.createElement(MatterhornPopup_1.default, { onClose: closeMatterhornPopup })))));
};
exports.default = HomePage;
//# sourceMappingURL=HomePage.js.map