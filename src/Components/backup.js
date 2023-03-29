import React, { useContext, useEffect, useState } from "react";
import styles from "../Styles/MusicPlayer.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { BsPauseCircle } from "react-icons/bs";
import { BsPlayCircle } from "react-icons/bs";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { Context } from "../Context/Context";
import axios from "axios";
import getDuration from "../Utilities/getDuration";
import baseURL from "../Utilities/baseURL";
const MusicPlayer = () => {
  const {
    currentSongID,
    accessToken,
    setCurrentSongDetails,
    currentSongDetails,
    userLikedSongs,
    setUserLikedSongs,
    user,
    setMountModal,
  } = useContext(Context);
  const [deviceID, setDeviceID] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [trackTimer, setTrackTimer] = useState(0);

  useEffect(() => {
    let timer = "";
    if (isPlaying) {
      timer = setInterval(() => {
        console.log(trackTimer, currentSongDetails.duration_ms);

        if (trackTimer >= currentSongDetails.duration_ms - 1000) {
          console.log("here");
          clearInterval(timer);
          setTrackTimer(0);
          setIsPlaying(false);
        } else {
          runTrackTimer();
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, trackTimer]);

  useEffect(() => {
    if (currentSongID) {
      console.log(currentSongID);
      axios
        .get(`https://api.spotify.com/v1/tracks/${currentSongID}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          setCurrentSongDetails(res.data);
          setTrackTimer(0);
          pauseTrack();
        })
        .catch((err) => console.log(err));
    }
  }, [currentSongID, userLikedSongs]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Audio Brew",
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 1,
      });

      player.addListener("ready", ({ device_id }) => {
        setDeviceID(device_id);
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.connect();

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }
        console.log(state);
      });
    };
  }, [currentSongID, userLikedSongs]);

  const runTrackTimer = () => {
    setTrackTimer((prev) => {
      return prev + 1 * 1000;
    });
  };

  const changeVolume = async (parameter) => {
    try {
      console.log(parameter);
      const response = await fetch(
        `https://api.spotify.com/v1/me/player/volume?volume_percent=${parameter}&device_id=${deviceID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      setMountModal({
        flag: true,
        content:
          "Sorry Premium Account is required to play Songs on Audio Brew!",
      });
    }
  };

  const changeTrackSeek = async (parameter) => {
    try {
      console.log(parameter);
      await fetch(
        `https://api.spotify.com/v1/me/player/seek?position_ms=${parameter}&device_id=${deviceID}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const playTrack = async () => {
    try {
      console.log(deviceID);
      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`,
        {
          uris: [`spotify:track:${currentSongID}`],
          position_ms: trackTimer,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
          },
        }
      );
      setIsPlaying(true);
    } catch (error) {
      console.log("here", error.response.data.error.reason);
      setMountModal({
        flag: true,
        content:
          "Sorry Spotify Premium Account is required to play Songs on Audio Brew!",
      });
    }
  };

  const pauseTrack = async () => {
    setIsPlaying(false);
    await axios.put(
      `https://api.spotify.com/v1/me/player/pause?device_id=${deviceID}`,
      {
        uris: [`spotify:track:${currentSongID}`],
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );
  };

  const addToLikedSongs = () => {
    axios({
      method: "PUT",
      url: baseURL + "/likedSongs",
      data: {
        id: user._id,
        trackID: currentSongID,
        flag: "add",
      },
    })
      .then((data) => {
        setUserLikedSongs(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromLikedSongs = () => {
    axios({
      method: "PUT",
      url: baseURL + "/likedSongs",
      data: {
        id: user._id,
        trackID: currentSongID,
        flag: "remove",
      },
    })
      .then((data) => {
        setUserLikedSongs(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadFromServer = () => {
    const query = `${currentSongDetails.name} From ${currentSongDetails.album.name} Lyrical`;
    console.log(query);
    axios({
      method: "GET",
      url: `https://www.googleapis.com/youtube/v3/search?q=${query}&key=AIzaSyDxedHAKpLPWGCDwajbxQQMAWaRvae0m8c`,
    })
      .then((data) => {
        const ID = data.data.items[0].id.videoId;
        const URL = `https://youtu.be/${ID}`;
        console.log(URL);
        console.log(currentSongDetails.name);

        window.location.href =
          baseURL + `/download?URL=${URL}&TITLE=${currentSongDetails.name}`;
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className={styles.main}>
      {currentSongDetails && (
        <>
          <div className={styles.trackImgContainer}>
            <img
              src={currentSongDetails.album.images[1].url}
              alt="track poster"
              className={styles.trackImg}
            />
          </div>
          <div className={styles.player}>
            <div className={styles.divContainer}>
              <div className={styles.trackInfo}>
                <div className={styles.trackInfoContainer}>
                  <h6 className={styles.trackName}>
                    {currentSongDetails.name}
                  </h6>
                  <p className={styles.trackArtist}>
                    {currentSongDetails.artists
                      .map((artist) => artist.name)
                      .join(",")}
                  </p>
                </div>
                {userLikedSongs &&
                userLikedSongs.tracks.find((song) => song === currentSongID) ? (
                  <AiFillHeart
                    className={`${styles.heartIcon}}`}
                    color="#1df594"
                    onClick={removeFromLikedSongs}
                  />
                ) : (
                  <AiOutlineHeart
                    className={`${styles.heartIcon}}`}
                    onClick={addToLikedSongs}
                  />
                )}
              </div>
            </div>
            <div className={styles.trackControls}>
              <div className={styles.trackContolOptions}>
                {/* <BiShuffle className={styles.icons} />
            <BiSkipPrevious className={styles.icons} /> */}
                {isPlaying ? (
                  <BsPauseCircle
                    className={`${styles.pauseorplay} ${styles.icons}`}
                    onClick={pauseTrack}
                  />
                ) : (
                  <BsPlayCircle
                    className={`${styles.pauseorplay} ${styles.icons}`}
                    onClick={playTrack}
                  />
                )}
              </div>
              <div className={styles.trackSlider}>
                <p>{getDuration(trackTimer)}</p>
                <input
                  className={styles.slider1}
                  type="range"
                  min={0}
                  max={currentSongDetails.duration_ms}
                  step={1000}
                  value={trackTimer}
                  onChange={(event) => {
                    setTrackTimer(event.target.valueAsNumber);
                    changeTrackSeek(event.target.valueAsNumber);
                  }}
                />
                <p>{getDuration(currentSongDetails.duration_ms)}</p>
              </div>
            </div>
            <div className={styles.trackVolume}>
              <FaCloudDownloadAlt
                className={styles.downloadIcon}
                onClick={downloadFromServer}
              />

              {volume !== 0 ? (
                <HiSpeakerWave
                  className={styles.icons}
                  onClick={() => {
                    setVolume(0);
                  }}
                />
              ) : (
                <HiSpeakerXMark
                  className={styles.icons}
                  onClick={() => {
                    setVolume(100);
                  }}
                />
              )}
              <input
                className={styles.trackVolumeSlider}
                type="range"
                min={0}
                max={100}
                step={1}
                value={volume}
                onChange={(event) => {
                  setVolume(event.target.valueAsNumber);
                  changeVolume(event.target.valueAsNumber);
                }}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPlayer;
