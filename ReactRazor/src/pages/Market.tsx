import { FunctionComponent, useState, useCallback } from "react";
import MatterhornPopup from "../components/MatterhornPopup";
import PortalPopup from "../components/PortalPopup";
import "./Market.css";

const Market: FunctionComponent = () => {
  const [isMatterhornPopupOpen, setMatterhornPopupOpen] = useState(false);

  const openMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(true);
  }, []);

  const closeMatterhornPopup = useCallback(() => {
    setMatterhornPopupOpen(false);
  }, []);

  return (
    <>
      <div className="market">
        <div className="bannersection">
          <div className="frame-div">
            <button className="illus7" onClick={openMatterhornPopup}>
              <img className="group-icon" alt="" src="_content/ReactRazor/asserts/group-3.svg" />
              <img className="fill-3-icon" alt="" src="_content/ReactRazor/asserts/fill-3.svg" />
              <img className="fill-6-icon" alt="" src="_content/ReactRazor/asserts/fill-6.svg" />
              <img className="fill-1-icon" alt="" src="_content/ReactRazor/asserts/fill-1.svg" />
              <img
                className="fill-62-icon"
                alt=""
                src="_content/ReactRazor/asserts/fill-62.svg"
              />
              <img
                className="fill-62-copy"
                alt=""
                src="_content/ReactRazor/asserts/fill-62-copy.svg"
              />
              <img
                className="group-icon1"
                alt=""
                src="_content/ReactRazor/asserts/group-23.svg"
              />
              <div className="group-div">
                <img
                  className="group-icon2"
                  alt=""
                  src="_content/ReactRazor/asserts/group-221.svg"
                />
                <div className="div">{` `}</div>
              </div>
              <img
                className="group-icon3"
                alt=""
                src="_content/ReactRazor/asserts/group-231.svg"
              />
            </button>
          </div>
        </div>
        <div className="cataloguesection">
          <b className="catalogue">Catalogue</b>
          <div className="frame-div1">
            <div className="living-room">
              <div className="nathan-fertig-249917-unsplash">
                <div className="mask" />
                <div className="mask1" />
              </div>
              <b className="living-room1">{`CNY -> USDT`}</b>
            </div>
            <div className="living-room">
              <div className="mask" />
              <div className="mask3" />
              <b className="office1">{`USDT -> CNY`}</b>
            </div>
            <div className="kitchen">
              <div className="nathan-fertig-249917-unsplash">
                <div className="mask" />
                <div className="mask5" />
              </div>
              <b className="kitchen-dining">{`CNY -> USD`}</b>
            </div>
            <div className="kitchen">
              <div className="nathan-fertig-249917-unsplash">
                <div className="mask" />
                <div className="mask7" />
              </div>
              <b className="kitchen-dining">{`USD -> CNY`}</b>
            </div>
            <div className="kitchen">
              <div className="mask" />
              <div className="mask9" />
              <b className="kitchen-dining">{`CNY -> ETH`}</b>
            </div>
          </div>
        </div>
        <div className="dealsection">
          <div className="rectangle" />
          <b className="yellow-sofa">Yellow sofa</b>
          <div className="div1">{`$600 `}</div>
          <div className="group-div1">
            <div className="div2">$1.200</div>
            <img
              className="iconglyphstar-copy-2"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphstar-copy-2.svg"
            />
          </div>
          <div className="div3">4.8</div>
          <div className="div4">(849)</div>
          <img
            className="iconglyphstar"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar.svg"
          />
          <div className="end-in-12001">End in 1:20:01</div>
          <img
            className="iconglyphstar-copy"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy.svg"
          />
          <div className="group-div2">
            <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-5.svg" />
            <div className="rectangle1" />
            <div className="div5">50%</div>
          </div>
          <div className="rectangle2" />
          <b className="blue-sofa">Blue sofa</b>
          <div className="div6">{`$750 `}</div>
          <div className="group-div3">
            <div className="div7">$1.500</div>
            <img
              className="iconglyphstar-copy-2"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphstar-copy-21.svg"
            />
          </div>
          <div className="div8">4.8</div>
          <div className="div9">(849)</div>
          <img
            className="iconglyphstar1"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar.svg"
          />
          <div className="end-in-120011">End in 1:20:01</div>
          <img
            className="iconglyphstar-copy1"
            alt=""
            src="_content/ReactRazor/asserts/iconglyphstar-copy.svg"
          />
          <div className="group-div4">
            <img className="path-5-icon" alt="" src="_content/ReactRazor/asserts/path-5.svg" />
            <div className="rectangle1" />
            <div className="div5">50%</div>
          </div>
          <b className="deal-of-the-day">Deal of the day</b>
          <b className="see-all">See all</b>
          <img className="frame-icon" alt="" src="_content/ReactRazor/asserts/frame.svg" />
          <img className="frame-icon1" alt="" src="_content/ReactRazor/asserts/frame1.svg" />
        </div>
        <div className="bestsellersection">
          <b className="best-seller">Best seller</b>
          <div className="rectangle-copy-3">
            <div className="rectangle-copy-31" />
            <b className="pattern-armchair">Pattern armchair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphbuy-copy-11.svg"
            />
            <div className="group-div5">
              <div className="div11">$250</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar-copy-22.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div12">4.8</div>
              <div className="div13">(849)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar2.svg"
              />
            </div>
          </div>
          <div className="rectangle-copy-5">
            <div className="rectangle-copy-31" />
            <b className="pattern-armchair1">Green chair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphbuy-copy-111.svg"
            />
            <div className="group-div5">
              <div className="div14">$120</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar-copy-23.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div12">4.8</div>
              <div className="div13">(800)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar2.svg"
              />
            </div>
          </div>
          <div className="rectangle-copy-4">
            <div className="rectangle-copy-31" />
            <b className="pattern-armchair1">Green chair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphbuy-copy-111.svg"
            />
            <div className="group-div5">
              <div className="div17">$300</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar-copy-24.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div12">4.5</div>
              <div className="div13">(765)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar4.svg"
              />
            </div>
          </div>
          <div className="rectangle-copy-6">
            <div className="rectangle-copy-31" />
            <b className="pattern-armchair3">Gray chair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="_content/ReactRazor/asserts/iconglyphbuy-copy-11.svg"
            />
            <div className="group-div5">
              <div className="div11">$160</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar-copy-25.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div12">4.6</div>
              <div className="div22">(745)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="_content/ReactRazor/asserts/iconglyphstar4.svg"
              />
            </div>
          </div>
          <img className="frame-icon2" alt="" src="_content/ReactRazor/asserts/frame2.svg" />
          <img className="frame-icon3" alt="" src="_content/ReactRazor/asserts/frame3.svg" />
          <img className="frame-icon4" alt="" src="_content/ReactRazor/asserts/frame2.svg" />
          <img className="frame-icon5" alt="" src="_content/ReactRazor/asserts/frame3.svg" />
        </div>
      </div>
      {isMatterhornPopupOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeMatterhornPopup}
        >
          <MatterhornPopup onClose={closeMatterhornPopup} />
        </PortalPopup>
      )}
    </>
  );
};

export default Market;
