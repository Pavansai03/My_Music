import React from "react";
import "./Left.css";
import "./utilities.css";
import { Link } from "react-router-dom";

const Left = ({clickStatus, handleClose}) => {
  return (
    <div>
      <div className={`left ${(clickStatus)?"left-L":""}`}>
        <div className={`home bg-grey rounded`} onClick={handleClose}>
          <div className="logo flex al p5 g5">
            <div className="flex al g5">
              <h2>My music</h2>
            </div>
            <div className={`sidebarClose`}>
              <svg
              onClick={handleClose}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <defs />
                <path
                  fill="#141B34"
                  d="M3.25,5 C3.25,4.586 3.586,4.25 4,4.25 L20,4.25 C20.414,4.25 20.75,4.586 20.75,5 C20.75,5.414 20.414,5.75 20,5.75 L4,5.75 C3.586,5.75 3.25,5.414 3.25,5 Z M3.25,12 C3.25,11.586 3.586,11.25 4,11.25 L20,11.25 C20.414,11.25 20.75,11.586 20.75,12 C20.75,12.414 20.414,12.75 20,12.75 L4,12.75 C3.586,12.75 3.25,12.414 3.25,12 Z M4,18.25 L20,18.25 C20.414,18.25 20.75,18.586 20.75,19 C20.75,19.414 20.414,19.75 20,19.75 L4,19.75 C3.586,19.75 3.25,19.414 3.25,19 C3.25,18.586 3.586,18.25 4,18.25 Z"
                />
              </svg>
            </div>
          </div>
          <ul>
            <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
              <li className="flex al g5 m10 text">
                <img className="invert" src="./svgs/home.svg" alt="home" />
                Home
              </li>
            </Link>
            <li className="flex al g5 m10 text">
              <img className="invert" src="./svgs/search.svg" alt="search" />
              Search
            </li>
          </ul>
        </div>

        <div className="library rounded m2 p2">
          <div className="library-header flex al p3">
            <h3>Your Library</h3>
            <img className="invert plus p5" src="./svgs/plus.svg" alt="plus" />
          </div>
        </div>

        <div className="left-footer m2  rounded">
          <div className="left-footer-box  flex g2">
            <div className="text">
              <a className="text" href="#">
                Legal
              </a>
            </div>
            <div className="text">
              <a className="text" href="#">
                Safety & Privacy Center
              </a>
            </div>
            <div className="text">
              <a className="text" href="#">
                Privacy Policy
              </a>
            </div>
            <div className="text">
              <a className="text" href="#">
                Cookies
              </a>
            </div>
            <div className="text">
              <a className="text" href="#">
                About Ads
              </a>
            </div>
            <div className="text">
              <a className="text" href="#">
                Accessibility
              </a>
            </div>
          </div>

          <div className="lang p10 m5">
            <button className="lang-btn bg-black flex al g5 rounded-btn p10">
              <img
                className="invert"
                src="./svgs/language.svg"
                alt="language"
              />
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
