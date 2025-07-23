import React from "react";
import "../Albums.css";
import { useState } from "react";
import { artistList } from "../../src/assets/artistList";
import { Link } from "react-router-dom";

const ArtistCard = () => {
  const [hover, sethover] = useState(null);

  return (
    <div>
      <div className="radio flex">
        {artistList.map((item, index) => {
          return (
            <Link
            to={`/${item.id}`}
            key={item.id}
            onMouseEnter={()=>sethover(index)}
            onMouseLeave={()=>sethover(null)}
            className="artist border cardfx">
              <div className={`card-playbtn ${hover === index ?"visible":"invisible"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="32"
                  height="32"
                  fill="black"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              <div className="artist-img">
                <img
                  className="bg-shadow"
                  draggable="false"
                  loading="lazy"
                  src= {item.img}
                  data-testid="card-image"
                  alt="artist"
                />
              </div>
              <h3>{item.artistName}</h3>
              <p>Artist</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ArtistCard;
