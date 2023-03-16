import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../Context/Context";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import SongDisplay from "../Utility Components/SongDisplay";
import styles from "../../Styles/Search.module.css";
import stylesPlaylist from "../../Styles/Playlist.module.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { BsFillPlayCircleFill } from "react-icons/bs";
import getDuration from "../../Utilities/getDuration";

const LikedSongs = () => {
  const {
    user,
    userLikedSongs,
    setUserLikedSongs,
    accessToken,
    setMountModal,
  } = useContext(Context);
  console.log(userLikedSongs);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const requests = userLikedSongs.tracks.map((track) =>
        fetch(`https://api.spotify.com/v1/tracks/${track}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
      );
      const responses = await Promise.all(requests);
      const results = await Promise.all(
        responses.map((response) => response.json())
      );
      setResult(results);
    };

    userLikedSongs && fetchData();
  }, [userLikedSongs]);
  const playLikedSongs = () => {};

  return (
    <>
      {userLikedSongs && (
        <>
          <div className={stylesPlaylist.playlistInfo}>
            <div className={stylesPlaylist.imgContainer}>
              <FcLike className={stylesPlaylist.playlistIcon} />
            </div>
            <div className={stylesPlaylist.playlistDetails}>
              <p className={stylesPlaylist.playlistName}>Liked Songs</p>
              <div>
                <p className={stylesPlaylist.playlistTracksDetails}>
                  {`${userLikedSongs.tracks.length} songs `} &#183;{" "}
                  {getDuration(
                    result.reduce((acc, cur) => {
                      return acc + cur.duration_ms;
                    }, 0)
                  )
                    .split(":")
                    .join(" mins ")}{" "}
                  secs
                </p>
              </div>
            </div>
          </div>
          <div className={stylesPlaylist.icons}></div>
        </>
      )}

      <div className={stylesPlaylist.playlistTracks}>
        {result.length > 0 ? (
          <div className={styles.result}>
            <div className={styles.headingInfo}>
              <div className={styles.numberContainer}>
                <p className={styles.trackNoHeading}>#</p>
              </div>
              <p className={styles.trackTitleHeading}>TITLE</p>
              <p className={styles.trackAlbum}>ALBUM</p>
              <div className={styles.durationContainer}>
                <p className={styles.trackDuration}>
                  <AiOutlineClockCircle />
                </p>
              </div>
            </div>
            {result.map((item, index) => (
              <SongDisplay
                key={item.id}
                id={item.id}
                number={index}
                image={item.album.images[0].url}
                title={item.name}
                artists={item.artists}
                album={item.album.name}
                duration={item.duration_ms}
                flag="likedSongs"
              />
            ))}
          </div>
        ) : (
          <p className={stylesPlaylist.userInfo}>
            Your Personal list is empty!
            <Link to="/search" className={stylesPlaylist.link}>
              {" "}
              Add Some!
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default LikedSongs;
