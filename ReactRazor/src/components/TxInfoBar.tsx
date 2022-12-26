import { FunctionComponent, useMemo } from "react";
import CSS, { Property } from "csstype";
import "./TxInfoBar.css";

type TxInfoBarType = {
  buyTVAtSonyStore?: string;
  component?: string;
  component1?: string;
  path?: string;

  /** Style props */
  componentWidth?: Property.Width;
  componentColor?: Property.Color;
  componentFontWeight?: Property.FontWeight;
  componentTop?: Property.Top;
  componentRight?: Property.Right;
};

const TxInfoBar: FunctionComponent<TxInfoBarType> = ({
  componentWidth,
  buyTVAtSonyStore,
  component,
  component1,
  componentColor,
  componentFontWeight,
  path,
  componentTop,
  componentRight,
}) => {
  const divStyle: CSS.Properties = useMemo(() => {
    return {
      width: componentWidth,
    };
  }, [componentWidth]);

  const bStyle: CSS.Properties = useMemo(() => {
    return {
      color: componentColor,
      fontWeight: componentFontWeight,
    };
  }, [componentColor, componentFontWeight]);

  const div1Style: CSS.Properties = useMemo(() => {
    return {
      top: componentTop,
      right: componentRight,
    };
  }, [componentTop, componentRight]);

  return (
    <div className="div14" style={divStyle}>
      <div className="buy-tv-at-sony-store">{buyTVAtSonyStore}</div>
      <div className="div15">{component}</div>
      <b className="b" style={bStyle}>
        {component1}
      </b>
      <img className="path-icon3" alt="" src={path} />
      <div className="div16" style={div1Style}>
        10 Min ago
      </div>
    </div>
  );
};

export default TxInfoBar;
