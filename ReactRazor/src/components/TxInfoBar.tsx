import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./TxInfoBar.css";

type TxInfoBarType = {
  buyTVAtSonyStore?: string;
  component?: string;
  component1?: string;
  path?: string;

  /** Style props */
  componentZIndex?: Property.ZIndex;
  componentColor?: Property.Color;
  componentFontWeight?: Property.FontWeight;
};

const TxInfoBar: FunctionComponent<TxInfoBarType> = ({
  componentZIndex,
  buyTVAtSonyStore,
  component,
  component1,
  componentColor,
  componentFontWeight,
  path,
}) => {
  const divStyle: CSS.Properties = useMemo(() => {
    return {
      zIndex: componentZIndex,
    };
  }, [componentZIndex]);

  const bStyle: CSS.Properties = useMemo(() => {
    return {
      color: componentColor,
      fontWeight: componentFontWeight,
    };
  }, [componentColor, componentFontWeight]);

  return (
    <div className="div23" style={divStyle}>
      <div className="buy-tv-at-sony-store">{buyTVAtSonyStore}</div>
      <div className="div24">{component}</div>
      <b className="b" style={bStyle}>
        {component1}
      </b>
      <img className="path-icon3" alt="" src={path} />
    </div>
  );
};

export default TxInfoBar;
