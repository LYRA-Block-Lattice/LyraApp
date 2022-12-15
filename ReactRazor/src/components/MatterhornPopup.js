"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./MatterhornPopup.css");
const MatterhornPopup = ({ onClose, }) => {
    return (react_1.default.createElement("div", { className: "matterhorn-popup" },
        react_1.default.createElement("video", { className: "video", controls: true, autoPlay: true, muted: true },
            react_1.default.createElement("source", { src: "https://lyra.live/assets/img/lyra.mp4" }))));
};
exports.default = MatterhornPopup;
//# sourceMappingURL=MatterhornPopup.js.map