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
              <img className="group-icon" alt="" src="../asserts/group-3.svg" />
              <img className="fill-3-icon" alt="" src="../asserts/fill-3.svg" />
              <img className="fill-6-icon" alt="" src="../asserts/fill-6.svg" />
              <img className="fill-1-icon" alt="" src="../asserts/fill-1.svg" />
              <img
                className="fill-62-icon"
                alt=""
                src="../asserts/fill-62.svg"
              />
              <img
                className="fill-62-copy"
                alt=""
                src="../asserts/fill-62-copy.svg"
              />
              <img
                className="group-icon1"
                alt=""
                src="../asserts/group-23.svg"
              />
              <div className="group-div">
                <img
                  className="group-icon2"
                  alt=""
                  src="../asserts/group-221.svg"
                />
                <div className="div">{` `}</div>
              </div>
              <img
                className="group-icon3"
                alt=""
                src="../asserts/group-231.svg"
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
              src="../asserts/iconglyphstar-copy-2.svg"
            />
          </div>
          <div className="div3">4.8</div>
          <div className="div4">(849)</div>
          <img
            className="iconglyphstar"
            alt=""
            src="../asserts/iconglyphstar.svg"
          />
          <div className="end-in-12001">End in 1:20:01</div>
          <img
            className="iconglyphstar-copy"
            alt=""
            src="../asserts/iconglyphstar-copy.svg"
          />
          <div className="group-div2">
            <img className="path-5-icon" alt="" src="../asserts/path-5.svg" />
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
              src="../asserts/iconglyphstar-copy-21.svg"
            />
          </div>
          <div className="div8">4.8</div>
          <div className="div9">(849)</div>
          <img
            className="iconglyphstar1"
            alt=""
            src="../asserts/iconglyphstar.svg"
          />
          <div className="end-in-120011">End in 1:20:01</div>
          <img
            className="iconglyphstar-copy1"
            alt=""
            src="../asserts/iconglyphstar-copy.svg"
          />
          <div className="group-div4">
            <img className="path-5-icon" alt="" src="../asserts/path-5.svg" />
            <div className="rectangle1" />
            <div className="div5">50%</div>
          </div>
          <b className="deal-of-the-day">Deal of the day</b>
          <b className="see-all">See all</b>
          <img className="frame-icon" alt="" src="../asserts/frame.svg" />
          <img className="frame-icon1" alt="" src="../asserts/frame1.svg" />
        </div>
        <div className="bestsellersection">
          <div className="auto-added-frame">
            <b className="catalogue">Best seller</b>
          </div>
          <div className="frame-div2">
            <div className="card-e-commerce-1">
              <div className="rectangle-copy-3" />
              <b className="pattern-armchair">Pattern armchair</b>
              <img
                className="iconglyphbuy-copy-11"
                alt=""
                src="../asserts/iconglyphbuy-copy-11.svg"
              />
              <div className="group-div5">
                <div className="div11">$250</div>
                <img
                  className="iconglyphstar-copy-22"
                  alt=""
                  src="../asserts/iconglyphstar-copy-22.svg"
                />
              </div>
              <div className="group-div6">
                <div className="div12">4.8</div>
                <div className="div13">(849)</div>
                <img
                  className="iconglyphstar2"
                  alt=""
                  src="../asserts/iconglyphstar2.svg"
                />
              </div>
              <img className="frame-icon2" alt="" src="../asserts/frame2.svg" />
            </div>
          </div>
          <div className="card-e-commerce-11">
            <div className="rectangle-copy-3" />
            <b className="pattern-armchair1">Pattern armchair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="../asserts/iconglyphbuy-copy-111.svg"
            />
            <div className="group-div5">
              <div className="div14">$250</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="../asserts/iconglyphstar-copy-23.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div15">4.8</div>
              <div className="div16">(849)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="../asserts/iconglyphstar3.svg"
              />
            </div>
            <img className="frame-icon2" alt="" src="../asserts/frame3.svg" />
          </div>
          <div className="card-e-commerce-2">
            <div className="rectangle-copy-32" />
            <b className="pattern-armchair1">Pattern armchair</b>
            <img
              className="iconglyphbuy-copy-11"
              alt=""
              src="../asserts/iconglyphbuy-copy-112.svg"
            />
            <div className="group-div5">
              <div className="div14">$250</div>
              <img
                className="iconglyphstar-copy-22"
                alt=""
                src="../asserts/iconglyphstar-copy-24.svg"
              />
            </div>
            <div className="group-div6">
              <div className="div15">4.8</div>
              <div className="div16">(849)</div>
              <img
                className="iconglyphstar2"
                alt=""
                src="../asserts/iconglyphstar4.svg"
              />
            </div>
            <img className="frame-icon2" alt="" src="../asserts/frame4.svg" />
          </div>
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
