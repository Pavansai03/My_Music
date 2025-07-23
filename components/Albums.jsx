import React from "react";
import "./Albums.css";
import "./Left.css";
import AlbumCard from "./cards/AlbumCard";
import ArtistCard from "./cards/ArtistCard";
import { useState } from "react";
import Left from "./Left";
const Albums = () => {
  // const [clickStatus, setClickStatus] = useState(false);
  //    const handleClick = ()=> {
  //        setClickStatus(!clickStatus)
  //    }
  return (
    <div className="flex">
      {/* <Left clickStatus = {clickStatus} handleClose = {handleClick}/> */}
      <div className="right-body">
        <div className="playlists p10 flex">
          {/* <div className="sidebar">
            <svg
            onClick={() => handleClick()}
            className="mL15"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              role="button"
              aria-label="Toggle navigation menu"
              color="#000000"
              fill="none"
            >
              <defs />
              <path
                fill="#141B34"
                d="M3.25,5 C3.25,4.586 3.586,4.25 4,4.25 L20,4.25 C20.414,4.25 20.75,4.586 20.75,5 C20.75,5.414 20.414,5.75 20,5.75 L4,5.75 C3.586,5.75 3.25,5.414 3.25,5 Z M3.25,12 C3.25,11.586 3.586,11.25 4,11.25 L20,11.25 C20.414,11.25 20.75,11.586 20.75,12 C20.75,12.414 20.414,12.75 20,12.75 L4,12.75 C3.586,12.75 3.25,12.414 3.25,12 Z M4,18.25 L20,18.25 C20.414,18.25 20.75,18.586 20.75,19 C20.75,19.414 20.414,19.75 20,19.75 L4,19.75 C3.586,19.75 3.25,19.414 3.25,19 C3.25,18.586 3.586,18.25 4,18.25 Z"
              />
            </svg>
          </div> */}
          <h2 className="p2 mL15">Popular albums</h2>
          <div className="playlist-order">
            <AlbumCard />
          </div>
        </div>

        <div className="playlist-order p10">
          <h2 className="p2 mL15">Popular artists</h2>
          <ArtistCard />
        </div>
      </div>
    </div>
  );
};

export default Albums;
