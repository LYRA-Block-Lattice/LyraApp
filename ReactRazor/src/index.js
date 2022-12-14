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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createwallet = exports.openwallet = void 0;
const React = __importStar(require("react"));
const client_1 = require("react-dom/client");
const CreateWallet_1 = __importDefault(require("./CreateWallet"));
const OpenWallet_1 = __importDefault(require("./OpenWallet"));
__exportStar(require("./HelloWorldReact"), exports);
function openwallet(renderElement) {
    const root = (0, client_1.createRoot)(renderElement);
    root.render(React.createElement(OpenWallet_1.default, null));
}
exports.openwallet = openwallet;
function createwallet(renderElement) {
    const root = (0, client_1.createRoot)(renderElement);
    root.render(React.createElement(CreateWallet_1.default, null));
}
exports.createwallet = createwallet;
//# sourceMappingURL=index.js.map