import React, { useRef, useEffect } from "react";
import "./utilities.css";
import "./player.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  playSong,
  pauseSong,
  nextSong,
  previousSong,
} from "../src/features/featureSlice";
import { fetchSongs, setCurrentSong } from "../src/features/featureSlice";

const PrevIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <defs></defs>
    <path
      fill="#141B34"
      d="M11.931,6.949 L12.02,6.892 C13.454,5.97 14.589,5.24 15.516,4.793 C16.448,4.342 17.334,4.092 18.209,4.36 C18.725,4.518 19.198,4.794 19.592,5.167 C20.253,5.79 20.509,6.685 20.63,7.743 C20.75,8.797 20.75,10.186 20.75,11.949 L20.75,12.051 C20.75,13.814 20.75,15.203 20.63,16.257 C20.509,17.315 20.253,18.21 19.592,18.833 C19.198,19.206 18.725,19.482 18.209,19.64 C17.334,19.908 16.448,19.658 15.516,19.208 C14.589,18.76 13.454,18.03 12.02,17.108 L12.02,17.108 L11.931,17.051 C10.614,16.205 9.568,15.532 8.825,14.916 C8.068,14.29 7.51,13.633 7.331,12.78 C7.223,12.266 7.223,11.734 7.331,11.22 C7.51,10.367 8.068,9.71 8.825,9.084 C9.568,8.468 10.614,7.795 11.931,6.949 Z M17.77,5.794 C17.453,5.697 17.006,5.738 16.168,6.143 C15.334,6.546 14.275,7.225 12.786,8.183 C11.416,9.064 10.446,9.688 9.781,10.239 C9.12,10.786 8.874,11.17 8.799,11.528 C8.734,11.839 8.734,12.161 8.799,12.472 C8.874,12.83 9.12,13.214 9.781,13.761 C10.446,14.312 11.416,14.936 12.786,15.817 C14.275,16.775 15.334,17.454 16.168,17.857 C17.006,18.262 17.453,18.303 17.77,18.206 C18.062,18.117 18.333,17.959 18.563,17.742 C18.825,17.495 19.029,17.053 19.139,16.087 C19.249,15.128 19.25,13.825 19.25,12 C19.25,10.175 19.249,8.872 19.139,7.913 C19.029,6.947 18.825,6.505 18.563,6.258 C18.333,6.041 18.062,5.883 17.77,5.794 Z M4.75,4 L4.75,20 C4.75,20.414 4.414,20.75 4,20.75 C3.586,20.75 3.25,20.414 3.25,20 L3.25,4 C3.25,3.586 3.586,3.25 4,3.25 C4.414,3.25 4.75,3.586 4.75,4 Z"
    ></path>
  </svg>
);

const PlayIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="pointer transform"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <defs></defs>
    <path
      fill="#141B34"
      d="M12,1.25 C17.937,1.25 22.75,6.063 22.75,12 C22.75,17.937 17.937,22.75 12,22.75 C6.063,22.75 1.25,17.937 1.25,12 C1.25,6.063 6.063,1.25 12,1.25 Z M2.75,12 C2.75,17.109 6.891,21.25 12,21.25 C17.109,21.25 21.25,17.109 21.25,12 C21.25,6.891 17.109,2.75 12,2.75 C6.891,2.75 2.75,6.891 2.75,12 Z M9.956,15.386 C9.5,15.079 9.5,14.319 9.5,12.8 L9.5,11.2 C9.5,9.681 9.5,8.921 9.956,8.614 C10.411,8.307 11.035,8.646 12.281,9.326 L12.281,9.326 L13.75,10.126 C15.25,10.944 16,11.353 16,12 C16,12.647 15.25,13.056 13.75,13.874 L12.281,14.674 L12.281,14.674 C11.035,15.354 10.411,15.693 9.956,15.386 Z"
    ></path>
  </svg>
);

const PauseIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="pointer transform"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.75 12.3228C2.75 7.21275 6.89 3.07275 12 3.07275C17.11 3.07275 21.25 7.21275 21.25 12.3228C21.25 17.4328 17.11 21.5728 12 21.5728C6.89 21.5728 2.75 17.4328 2.75 12.3228ZM12 1.57275C6.06 1.57275 1.25 6.38275 1.25 12.3228C1.25 18.2628 6.06 23.0728 12 23.0728C17.94 23.0728 22.75 18.2628 22.75 12.3228C22.75 6.38275 17.94 1.57275 12 1.57275ZM10.25 9.32275C10.25 8.91275 9.91 8.57275 9.5 8.57275C9.09 8.57275 8.75 8.91275 8.75 9.32275V15.3228C8.75 15.7328 9.09 16.0728 9.5 16.0728C9.91 16.0728 10.25 15.7328 10.25 15.3228V9.32275ZM15.25 9.32275C15.25 8.91275 14.91 8.57275 14.5 8.57275C14.09 8.57275 13.75 8.91275 13.75 9.32275V15.3228C13.75 15.7328 14.09 16.0728 14.5 16.0728C14.91 16.0728 15.25 15.7328 15.25 15.3228V9.32275Z"
      fill="#141B34"
    />
  </svg>
);

const NextIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    className="pointer"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    color="#000000"
    fill="none"
  >
    <defs></defs>
    <path
      fill="#141B34"
      d="M12.069,6.949 C13.386,7.796 14.432,8.468 15.175,9.084 C15.932,9.71 16.49,10.367 16.669,11.22 C16.777,11.734 16.777,12.266 16.669,12.78 C16.49,13.633 15.932,14.29 15.175,14.917 C14.432,15.532 13.386,16.205 12.069,17.051 L11.98,17.108 C10.546,18.03 9.411,18.76 8.484,19.208 C7.552,19.658 6.666,19.908 5.791,19.64 C5.275,19.483 4.802,19.206 4.408,18.833 C3.747,18.21 3.491,17.315 3.37,16.257 C3.25,15.203 3.25,13.814 3.25,12.051 L3.25,11.949 C3.25,10.186 3.25,8.797 3.37,7.743 C3.491,6.686 3.747,5.79 4.408,5.167 C4.802,4.794 5.275,4.518 5.791,4.36 C6.666,4.092 7.552,4.342 8.484,4.793 C9.411,5.24 10.546,5.97 11.98,6.892 Z M6.23,5.794 C5.938,5.884 5.667,6.041 5.437,6.258 C5.175,6.505 4.971,6.947 4.86,7.913 C4.751,8.872 4.75,10.175 4.75,12 C4.75,13.825 4.751,15.128 4.86,16.087 C4.971,17.053 5.175,17.496 5.437,17.742 C5.667,17.959 5.938,18.117 6.23,18.206 C6.547,18.303 6.994,18.262 7.832,17.857 C8.666,17.454 9.725,16.775 11.214,15.817 C12.584,14.937 13.554,14.312 14.219,13.761 C14.88,13.214 15.126,12.83 15.201,12.472 C15.266,12.161 15.266,11.839 15.201,11.528 C15.126,11.17 14.88,10.786 14.219,10.239 C13.554,9.688 12.584,9.064 11.214,8.183 C9.725,7.225 8.666,6.546 7.832,6.143 C6.994,5.738 6.547,5.697 6.23,5.794 Z M20.75,5 L20.75,19 C20.75,19.414 20.414,19.75 20,19.75 C19.586,19.75 19.25,19.414 19.25,19 L19.25,5 C19.25,4.586 19.586,4.25 20,4.25 C20.414,4.25 20.75,4.586 20.75,5 Z"
    ></path>
  </svg>
);

const Player = () => {
  const audioRef = useRef(null);
  const seekRef = useRef(null);
  const volumeRef = useRef(null);
  const dispatch = useDispatch();
  const [currTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seek, setSeek] = useState(false);
  const [seekMouseOver, setSeekMouseOver] = useState(false);
  const [volume, setVolume] = useState(false);
  const [currVolume, setCurretVolume] = useState(0.5);

  const { currentSong, isPlaying, status } = useSelector(
    (state) => state.music
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchSongs());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.error("Audio Play Error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  useEffect(() => {
    if (seek) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [seek]);

  useEffect(() => {
    if (volume) {
      window.addEventListener("mousemove", handleVolumeMouseMove);
      window.addEventListener("mouseup", handleVolumeMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleVolumeMouseMove);
      window.removeEventListener("mouseup", handleVolumeMouseUp);
    };
  }, [volume]);

  function handlePlayPause() {
    if (!currentSong) return;
    if (isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(playSong(currentSong));
    }
  }

  function handleNext() {
    dispatch(nextSong());
  }

  function handlePrev() {
    dispatch(previousSong());
  }

  function secToMSS(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  const handleTimeUpdate = (e) => {
    if (seek === false) setCurrentTime(e.target.currentTime);
  };

  const handleLoadedMetaData = (e) => {
    setDuration(e.target.duration);
  };

  const calculateNewTime = (e) => {
    const seekbar = seekRef.current;
    if (!seekbar || !duration) return 0;

    const rect = seekbar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const totalWidth = seekbar.clientWidth;
    const newTime = (clickPosition / totalWidth) * duration;
    return Math.max(0, Math.min(newTime, duration));
  };

  const calculateNewVolume = (e) => {
    const volumeSeekbar = volumeRef.current;
    const rect = volumeSeekbar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const totalWidth = volumeSeekbar.clientWidth;

    const newVolume = clickPosition / totalWidth;

    return Math.max(0, Math.min(newVolume, 1));
  };

  const handleMouseDown = (e) => {
    setSeek(true);
    const newTime = calculateNewTime(e, seekRef);
    setCurrentTime(newTime);
  };

  const handleMouseMove = (e) => {
    if (seek) {
      const newTime = calculateNewTime(e, seekRef);
      setCurrentTime(newTime);
    }
  };

  const handleMouseUp = (e) => {
    const newTime = calculateNewTime(e, seekRef);
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;
    setSeek(false);
  };

  const handleMouseEnter = (e) => {
    setSeekMouseOver(true);
  };

  const handleMouseOut = (e) => {
    setSeekMouseOver(false);
  };

  const handleVolumeMouseDown = (e) => {
    setVolume(true);
    const newVolume = calculateNewVolume(e);
    audioRef.current.volume = newVolume;
    setCurretVolume(newVolume);
  };

  const handleVolumeMouseMove = (e) => {
    if (volume) {
      const newVolume = calculateNewVolume(e);
      setCurretVolume(newVolume);
      audioRef.current.volume = newVolume;
    }
  };

  const handleVolumeMouseUp = (e) => {
    setVolume(false);
  };

  const progressPercent = (duration > 0) ? (currTime / duration) * 100 : 0;
  const volumeProgressPercent = currVolume * 100;

  return (
    <div>
      <audio
        ref={audioRef}
        src={currentSong?.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetaData}
        onEnded={handleNext}
      />

      <div className="playTools  flex al">
        <div className="songinfo  flex p3 g15">
          <div className="flex mL15 p3">
            <img src={currentSong?.img} alt={currentSong?.artist} />
          </div>

          <div className="footer_text flex-c jc m2">
            <h5>{currentSong?.title || "No Song Selected"}</h5>
            <p>{currentSong?.artist || "..."}</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            color="#000000"
            fill="none"
          >
            <defs></defs>
            <path
              fill="#141B34"
              d="M12,1.25 C17.937,1.25 22.75,6.063 22.75,12 C22.75,17.937 17.937,22.75 12,22.75 C6.063,22.75 1.25,17.937 1.25,12 C1.25,6.063 6.063,1.25 12,1.25 Z M2.75,12 C2.75,17.109 6.891,21.25 12,21.25 C17.109,21.25 21.25,17.109 21.25,12 C21.25,6.891 17.109,2.75 12,2.75 C6.891,2.75 2.75,6.891 2.75,12 Z M12.75,8 L12.75,11.25 L16,11.25 C16.414,11.25 16.75,11.586 16.75,12 C16.75,12.414 16.414,12.75 16,12.75 L12.75,12.75 L12.75,16 C12.75,16.414 12.414,16.75 12,16.75 C11.586,16.75 11.25,16.414 11.25,16 L11.25,12.75 L8,12.75 C7.586,12.75 7.25,12.414 7.25,12 C7.25,11.586 7.586,11.25 8,11.25 L11.25,11.25 L11.25,8 C11.25,7.586 11.586,7.25 12,7.25 C12.414,7.25 12.75,7.586 12.75,8 Z"
            ></path>
          </svg>
        </div>

        <div className="btns  p10">
          <div className="btnContainer flex jc">
            <div className="invert al flex jc g20">
              <div className="toggle transform">
                <svg
                  className="pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#000000"
                  fill="none"
                >
                  <defs></defs>
                  <path
                    fill="#141B34"
                    d="M4.581,6.75 L3,6.75 C2.586,6.75 2.25,6.414 2.25,6 C2.25,5.586 2.586,5.25 3,5.25 L4.619,5.25 C5.551,5.25 6.305,5.25 6.927,5.313 C7.575,5.379 8.134,5.517 8.663,5.825 C9.19,6.131 9.598,6.554 10,7.093 C10.39,7.616 10.806,8.294 11.325,9.14 L11.325,9.14 L14.333,14.045 C14.875,14.929 15.256,15.549 15.6,16.01 C15.936,16.461 16.201,16.712 16.488,16.878 C16.922,17.131 17.455,17.238 18.086,17.269 C18.495,17.289 18.872,17.277 19.267,17.266 L19.269,17.265 C19.522,17.258 19.783,17.25 20.065,17.25 L20.111,17.25 C20.354,17.25 20.617,17.25 20.826,17.282 C21.038,17.315 21.499,17.426 21.687,17.918 C21.864,18.382 21.631,18.768 21.514,18.938 C21.392,19.114 21.211,19.311 21.035,19.501 L21.007,19.532 L20.11,20.508 C19.829,20.813 19.355,20.832 19.05,20.552 C18.745,20.272 18.725,19.797 19.006,19.492 L19.683,18.756 C19.597,18.758 19.507,18.76 19.416,18.763 L19.41,18.763 C18.965,18.775 18.464,18.789 18.013,18.767 C17.276,18.731 16.466,18.601 15.734,18.175 C15.207,17.869 14.799,17.446 14.397,16.907 C14.007,16.384 13.592,15.706 13.073,14.86 L10.064,9.954 C9.523,9.071 9.142,8.451 8.798,7.99 C8.462,7.539 8.196,7.288 7.909,7.122 C7.625,6.956 7.295,6.858 6.776,6.805 C6.239,6.751 5.56,6.75 4.581,6.75 Z M14.677,9.394 C14.46,9.747 13.998,9.856 13.645,9.638 C13.293,9.42 13.183,8.958 13.401,8.606 C14.226,7.27 14.821,6.356 15.734,5.825 C16.466,5.399 17.276,5.269 18.013,5.233 C18.466,5.211 18.969,5.225 19.415,5.237 L19.416,5.237 C19.507,5.24 19.597,5.242 19.683,5.244 L19.006,4.508 C18.725,4.203 18.745,3.728 19.05,3.448 C19.355,3.168 19.829,3.187 20.11,3.492 L21.007,4.468 L21.035,4.499 C21.211,4.689 21.392,4.887 21.514,5.063 C21.631,5.232 21.864,5.618 21.687,6.082 C21.499,6.574 21.038,6.686 20.826,6.718 C20.617,6.75 20.353,6.75 20.109,6.75 L20.108,6.75 L20.065,6.75 C19.783,6.75 19.522,6.742 19.269,6.735 C18.873,6.723 18.496,6.711 18.086,6.731 C17.455,6.762 16.922,6.869 16.488,7.122 C15.96,7.429 15.55,7.981 14.677,9.394 Z M4.581,17.25 C5.56,17.25 6.239,17.249 6.776,17.195 C7.295,17.142 7.625,17.044 7.909,16.878 C8.438,16.571 8.847,16.019 9.72,14.606 C9.938,14.253 10.4,14.144 10.752,14.362 C11.105,14.58 11.214,15.042 10.996,15.394 C10.171,16.73 9.576,17.644 8.663,18.175 C8.134,18.483 7.575,18.621 6.927,18.687 C6.305,18.75 5.551,18.75 4.619,18.75 L3,18.75 C2.586,18.75 2.25,18.414 2.25,18 C2.25,17.586 2.586,17.25 3,17.25 Z"
                  ></path>
                </svg>
              </div>

              <div className="backward transform">
                <PrevIcon onClick={handlePrev} />
              </div>

              <div className="mainControls">
                {isPlaying ? (
                  <PauseIcon onClick={handlePlayPause} />
                ) : (
                  <PlayIcon onClick={handlePlayPause} />
                )}
              </div>

              <div className="forward transform">
                <NextIcon onClick={handleNext} />
              </div>
            </div>
          </div>

          <div className="seekbarContainer flex jc al">
            <div className="songProgress m5 p10">
              <p>{secToMSS(currTime)}</p>
            </div>
            <div
              ref={seekRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseOut}
              onMouseDown={handleMouseDown}
              className="seekbarline flex pointer al"
            >
              <div className="seekbar">
                <div
                  style={{ width: `${progressPercent}%` }}
                  className={`seekbarProgress ${seek ? "seeking" : ""}  ${
                    seekMouseOver ? "seekOver" : ""
                  }`}
                ></div>
              </div>
              <div
                style={{ left: `${progressPercent}%` }}
                className={`circle ${seek ? "circleClick-fx" : ""} ${
                  seekMouseOver ? "circle-fx" : ""
                }`}
              ></div>
            </div>
            <div className="endTime m5 p10">{secToMSS(duration)}</div>
          </div>
        </div>

        <div className="volumeTools flex-c jc al">
          {/* <ul className="footer-volumsBtns border g10 m5 flex"> */}
            {/* <li>
              <svg
                className="invert"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <defs></defs>
                <path
                  fill="#141B34"
                  d="M12,16.75 C8.824,16.75 6.25,14.176 6.25,11 L6.25,7 C6.25,3.824 8.824,1.25 12,1.25 C15.176,1.25 17.75,3.824 17.75,7 L17.75,11 C17.75,14.176 15.176,16.75 12,16.75 Z M12,2.75 C9.653,2.75 7.75,4.653 7.75,7 L7.75,11 C7.75,13.347 9.653,15.25 12,15.25 C14.091,15.25 15.83,13.74 16.184,11.75 L14,11.75 C13.586,11.75 13.25,11.414 13.25,11 C13.25,10.586 13.586,10.25 14,10.25 L16.25,10.25 L16.25,7.75 L14,7.75 C13.586,7.75 13.25,7.414 13.25,7 C13.25,6.586 13.586,6.25 14,6.25 L16.184,6.25 C15.83,4.26 14.091,2.75 12,2.75 Z M4.75,11 C4.75,15.004 7.996,18.25 12,18.25 C16.004,18.25 19.25,15.004 19.25,11 C19.25,10.586 19.586,10.25 20,10.25 C20.414,10.25 20.75,10.586 20.75,11 C20.75,15.58 17.231,19.338 12.75,19.718 L12.75,21.25 L15,21.25 C15.414,21.25 15.75,21.586 15.75,22 C15.75,22.414 15.414,22.75 15,22.75 L9,22.75 C8.586,22.75 8.25,22.414 8.25,22 C8.25,21.586 8.586,21.25 9,21.25 L11.25,21.25 L11.25,19.718 C6.769,19.338 3.25,15.58 3.25,11 C3.25,10.586 3.586,10.25 4,10.25 C4.414,10.25 4.75,10.586 4.75,11 Z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                className="invert"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <defs></defs>
                <path
                  fill="#141B34"
                  d="M5.75,18.75 L5.75,18.75 C4.675,18.75 4.025,18.75 3.513,18.237 C3,17.724 3,17.075 3,16 L3,16 C3,14.925 3,14.275 3.513,13.763 C4.026,13.25 4.675,13.25 5.75,13.25 L17.75,13.25 C18.825,13.25 19.475,13.25 19.987,13.763 C20.5,14.276 20.5,14.925 20.5,16 L20.5,16 C20.5,17.075 20.5,17.725 19.987,18.237 C19.474,18.75 18.825,18.75 17.75,18.75 L5.75,18.75 Z M5.75,14.75 C5.249,14.75 4.681,14.75 4.573,14.823 C4.5,14.93 4.5,15.498 4.5,16 C4.5,16.502 4.5,17.069 4.574,17.177 C4.682,17.25 5.249,17.25 5.75,17.25 L17.75,17.25 C18.251,17.25 18.819,17.25 18.927,17.176 C19,17.069 19,16.501 19,16 C19,15.499 19,14.931 18.926,14.823 C18.819,14.75 18.251,14.75 17.75,14.75 Z M3.75,6.75 C3.336,6.75 3,6.414 3,6 C3,5.586 3.336,5.25 3.75,5.25 L19.75,5.25 C20.164,5.25 20.5,5.586 20.5,6 C20.5,6.414 20.164,6.75 19.75,6.75 Z M19.75,10.75 L3.75,10.75 C3.336,10.75 3,10.414 3,10 C3,9.586 3.336,9.25 3.75,9.25 L19.75,9.25 C20.164,9.25 20.5,9.586 20.5,10 C20.5,10.414 20.164,10.75 19.75,10.75 Z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                className="invert"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <defs></defs>
                <path
                  fill="#141B34"
                  d="M19.986,4.014 C22.338,6.366 22.338,10.179 19.986,12.53 L17.377,15.14 C17.084,15.433 16.609,15.433 16.316,15.14 C16.023,14.847 16.023,14.372 16.316,14.079 L18.926,11.47 C20.691,9.704 20.691,6.84 18.926,5.074 C17.16,3.309 14.296,3.309 12.53,5.074 L9.921,7.684 C9.628,7.977 9.153,7.977 8.86,7.684 C8.567,7.391 8.567,6.916 8.86,6.623 L11.47,4.014 C13.821,1.662 17.634,1.662 19.986,4.014 Z M7.684,9.921 L5.074,12.53 C3.309,14.296 3.309,17.16 5.074,18.926 C6.84,20.691 9.704,20.691 11.47,18.926 L14.079,16.316 C14.372,16.023 14.847,16.023 15.14,16.316 C15.433,16.609 15.433,17.084 15.14,17.377 L12.53,19.986 C10.179,22.338 6.366,22.338 4.014,19.986 C1.662,17.634 1.662,13.821 4.014,11.47 L6.623,8.86 C6.916,8.567 7.391,8.567 7.684,8.86 C7.977,9.153 7.977,9.628 7.684,9.921 Z M15.03,10.03 L10.03,15.03 C9.737,15.323 9.263,15.323 8.97,15.03 C8.677,14.737 8.677,14.263 8.97,13.97 L13.97,8.97 C14.263,8.677 14.737,8.677 15.03,8.97 C15.323,9.263 15.323,9.737 15.03,10.03 Z"
                ></path>
              </svg>
            </li>

            <li>
              <svg
                className="invert"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
              >
                <defs></defs>
                <path
                  fill="#141B34"
                  d="M12.05,1.25 L12.05,1.25 C13.887,1.25 15.333,1.25 16.475,1.387 C17.643,1.527 18.59,1.82 19.375,2.478 C19.609,2.675 19.825,2.891 20.022,3.125 C20.68,3.909 20.973,4.857 21.113,6.025 C21.25,7.167 21.25,8.613 21.25,10.45 L21.25,13.55 C21.25,15.387 21.25,16.833 21.113,17.975 C20.973,19.143 20.68,20.09 20.022,20.875 C19.825,21.109 19.609,21.325 19.375,21.522 C18.59,22.18 17.643,22.473 16.475,22.613 C15.333,22.75 13.887,22.75 12.05,22.75 L11.95,22.75 C10.113,22.75 8.667,22.75 7.525,22.613 C6.357,22.473 5.41,22.18 4.625,21.522 C4.391,21.325 4.175,21.109 3.978,20.875 C3.32,20.09 3.027,19.143 2.887,17.975 C2.75,16.833 2.75,15.387 2.75,13.55 L2.75,10.45 C2.75,8.613 2.75,7.167 2.887,6.025 C3.027,4.857 3.32,3.909 3.978,3.125 C4.175,2.891 4.391,2.675 4.625,2.478 C5.41,1.82 6.357,1.527 7.525,1.387 C8.667,1.25 10.113,1.25 11.95,1.25 L12.05,1.25 Z M7.704,2.876 C6.68,2.999 6.06,3.233 5.59,3.627 C5.422,3.768 5.268,3.922 5.127,4.09 C4.733,4.56 4.499,5.18 4.376,6.204 C4.251,7.246 4.25,8.602 4.25,10.5 L4.25,13.5 C4.25,15.398 4.251,16.754 4.376,17.796 C4.499,18.82 4.733,19.44 5.127,19.91 C5.268,20.078 5.422,20.232 5.59,20.373 C6.06,20.767 6.68,21.001 7.704,21.124 C8.746,21.249 10.102,21.25 12,21.25 C13.898,21.25 15.255,21.249 16.296,21.124 C17.32,21.001 17.94,20.767 18.41,20.373 C18.578,20.232 18.732,20.078 18.873,19.91 C19.267,19.44 19.501,18.82 19.624,17.796 C19.749,16.754 19.75,15.398 19.75,13.5 L19.75,10.5 C19.75,8.602 19.749,7.246 19.624,6.204 C19.501,5.18 19.267,4.56 18.873,4.09 C18.732,3.922 18.578,3.768 18.41,3.627 C17.94,3.233 17.32,2.999 16.296,2.876 C15.255,2.751 13.898,2.75 12,2.75 C10.102,2.75 8.746,2.751 7.704,2.876 Z M7.75,15 C7.75,12.653 9.653,10.75 12,10.75 C14.347,10.75 16.25,12.653 16.25,15 C16.25,17.347 14.347,19.25 12,19.25 C9.653,19.25 7.75,17.347 7.75,15 Z M12,12.25 C10.481,12.25 9.25,13.481 9.25,15 C9.25,16.519 10.481,17.75 12,17.75 C13.519,17.75 14.75,16.519 14.75,15 C14.75,13.481 13.519,12.25 12,12.25 Z M12,4.75 C13.243,4.75 14.25,5.757 14.25,7 C14.25,8.243 13.243,9.25 12,9.25 C10.757,9.25 9.75,8.243 9.75,7 C9.75,5.757 10.757,4.75 12,4.75 Z M11.25,7 C11.25,7.414 11.586,7.75 12,7.75 C12.414,7.75 12.75,7.414 12.75,7 C12.75,6.586 12.414,6.25 12,6.25 C11.586,6.25 11.25,6.586 11.25,7 Z"
                ></path>
              </svg>
            </li>
          </ul> */}
          <div className="volumeSeekbarContainer flex jc al">
            <div
              ref={volumeRef}
              onMouseDown={handleVolumeMouseDown}
              className="volumeSeekbar  flex al"
            >
              <div className={`volumeSeekbarline  flex al`}>
                <div
                  style={{ width: `${volumeProgressPercent}%` }}
                  className="volumeProgress"
                ></div>
              </div>
              <div
                style={{ left: `${volumeProgressPercent}%` }}
                className="volumeCircle"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
