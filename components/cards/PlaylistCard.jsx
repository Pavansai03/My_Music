import React from "react";
import "../playlist.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { pauseSong, playSong } from "../../src/features/featureSlice";

 const musicSvg = (
     <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="currentColor"
    fill="none"
  >
    <path
      fill="currentColor"
      d="M10.5,22.75 C8.708,22.75 7.25,21.292 7.25,19.5 C7.25,17.708 8.708,16.25 10.5,16.25 C11.144,16.25 11.745,16.438 12.25,16.763 L12.25,11 C12.25,9.973 12.25,9.354 12.682,8.859 C13.112,8.367 13.741,8.28 14.884,8.124 L14.887,8.123 C17.019,7.832 19.059,7.052 20.958,5.803 L20.96,5.802 C21.315,5.569 21.754,5.281 22.253,5.552 C22.75,5.817 22.75,6.342 22.75,6.764 L22.75,9.98 C22.75,9.993 22.75,10.007 22.75,10.02 L22.75,17.927 C22.75,17.936 22.75,17.944 22.75,17.952 C22.75,17.968 22.75,17.984 22.75,18 C22.75,19.516 21.516,20.75 20,20.75 C18.484,20.75 17.25,19.516 17.25,18 C17.25,16.484 18.484,15.25 20,15.25 C20.45,15.25 20.875,15.359 21.25,15.551 L21.25,11.384 C19.744,12.301 17.179,13.567 13.75,13.732 L13.75,19.503 C13.748,21.294 12.291,22.75 10.5,22.75 Z M4.5,12.75 C2.708,12.75 1.25,11.292 1.25,9.5 C1.25,7.708 2.708,6.25 4.5,6.25 C5.144,6.25 5.745,6.438 6.25,6.762 L6.25,2 C6.25,1.669 6.466,1.378 6.783,1.282 C7.099,1.186 7.441,1.309 7.624,1.584 C7.733,1.747 7.811,1.946 7.901,2.175 L7.906,2.187 L7.906,2.188 C8.207,2.957 8.619,4.009 10.123,4.26 C10.532,4.328 10.808,4.715 10.74,5.123 C10.672,5.532 10.286,5.808 9.877,5.74 C8.924,5.581 8.244,5.195 7.75,4.735 L7.75,9.5 C7.75,11.292 6.292,12.75 4.5,12.75 Z M13.75,12.23 C17.484,12.029 20.1,10.373 21.25,9.601 L21.25,7.393 C19.314,8.571 17.246,9.316 15.096,9.609 C14.531,9.686 13.953,9.765 13.809,9.852 C13.75,9.975 13.75,10.496 13.75,11.001 Z M10.5,17.75 C9.535,17.75 8.75,18.535 8.75,19.5 C8.75,20.465 9.535,21.25 10.5,21.25 C11.465,21.25 12.25,20.465 12.25,19.5 C12.25,18.535 11.465,17.75 10.5,17.75 Z M4.5,7.75 C3.535,7.75 2.75,8.535 2.75,9.5 C2.75,10.465 3.535,11.25 4.5,11.25 C5.465,11.25 6.25,10.465 6.25,9.5 C6.25,8.535 5.465,7.75 4.5,7.75 Z M18.75,18 C18.75,18.689 19.311,19.25 20,19.25 C20.689,19.25 21.25,18.689 21.25,18 C21.25,17.311 20.689,16.75 20,16.75 C19.311,16.75 18.75,17.311 18.75,18 Z"
    />
  </svg>
 )
    
 
const PlaylistCard = ({songs}) => {

     const dispatch = useDispatch();
    const { isPlaying, currentSong } = useSelector((state) => state.music);

    const handleClick = (song) => {
        if (currentSong && currentSong.id === song.id && isPlaying) {
            dispatch(pauseSong());
        } else {
            dispatch(playSong(song));
        }
    };

  return (
    <div>
      {songs.map((item, index) => {
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`allSongs ${
              currentSong && currentSong.id === item.id ? "active-song" : ""
            }`}
          >
            <div className="allSongsCard flex">
              <div className="songNum flex al">
                {currentSong && currentSong.id === item.id && isPlaying ? musicSvg : item.id}
              </div>

              <div className="songName flex g5">
                <div className=" flex al m_special">
                  <img
                    aria-hidden="false"
                    draggable="false"
                    loading="lazy"
                    src={item.img}
                    data-testid="card-image"
                    alt=""
                    className="mMx2LUixlnN_Fu45JpFB yMQTWVwLJ5bV8VGiaqU3 MxmW8QkHqHWtuhO589PV Yn2Ei5QZn19gria6LjZj"
                  />
                </div>
                <div className="songCard-title flex-c jc">
                  <h5>{item.title}</h5>
                  <p>{item.artist}</p>
                </div>
              </div>

              <div className="albumName flex al">{item.album}</div>

              <div className="dateAdded flex al">1 hours ago</div>

              <div className="songDuration flex al">{item.len}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlaylistCard;
