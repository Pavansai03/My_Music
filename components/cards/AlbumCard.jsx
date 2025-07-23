import React, { useEffect, useMemo } from "react";
import "../Albums.css";
import { albumList } from "../../src/assets/albumList";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const AlbumCard = () => {
  const [hover, sethover] = useState(null);

  return (
    <div className="songCards flex">
      {albumList.map((item, index) => {
        return (
          <Link
            to={`./${item.id}`}
            key={item.id}
            // onClick={() => handleClick(item)}
            onMouseEnter={() => sethover(index)}
            onMouseLeave={() => sethover(null)}
            className="song cardfx"
          >
            <div
              className={`card-playbtn ${
                hover === index ? "visible" : "invisible"
              }`}
            >
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
            <img
              aria-hidden="false"
              draggable="false"
              loading="lazy"
              src={item.img}
              data-testid="card-image"
              alt=""
              className="mMx2LUixlnN_Fu45JpFB yMQTWVwLJ5bV8VGiaqU3 yOKoknIYYzAE90pe7_SE Yn2Ei5QZn19gria6LjZj"
            />
            <h3>{item.title}</h3>
            <p>{item.singers}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default AlbumCard;
