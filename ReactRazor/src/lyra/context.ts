import { createContext } from "react";

const lyraCtx = {
  network: process.env.REACT_APP_NETWORK_ID,
  wss: undefined
};

export const LyraContext = createContext(lyraCtx);

export default LyraContext;
