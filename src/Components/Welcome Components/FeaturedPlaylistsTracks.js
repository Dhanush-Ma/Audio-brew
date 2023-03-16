import Axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { useParams } from "react-router-dom";
import styles from "../../Styles/Search.module.css";
import stylesPlaylist from "../../Styles/Playlist.module.css";
import getDuration from "../../Utilities/getDuration";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import SongDisplay from "../Utility Components/SongDisplay";

const playPlaylistSongs = () => {};

const FeaturedPlaylistsTracks = () => {
  const { id } = useParams();
  const { user, accessToken } = useContext(Context);
  const [result, setResult] = useState([]);

  useEffect(() => {
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/playlists/${id}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        setResult(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  return (
    <>
      {result.tracks && (
        <>
          <div className={stylesPlaylist.playlistInfo}>
            <div className={stylesPlaylist.imgContainer}>
              <img src={result.images[0].url} alt="poster" />
            </div>
            <div className={stylesPlaylist.playlistDetails}>
              <p className={stylesPlaylist.playlistName}>{result.name}</p>
              <div>
                <p className={stylesPlaylist.playlistTracksDetails}>
                  {`${result.tracks.items.length} songs `} &#183;{" "}
                  {getDuration(
                    result.tracks.items.reduce((acc, cur) => {
                      return acc + cur.track.duration_ms;
                    }, 0)
                  )
                    .split(":")
                    .join(" mins ")}{" "}
                  secs
                </p>
              </div>
            </div>
          </div>
          <div className={stylesPlaylist.icons}>
            <BsFillPlayCircleFill
              className={stylesPlaylist.heartIcon}
              color="#1df549"
              onClick={playPlaylistSongs}
            />
          </div>
        </>
      )}

      <div className={stylesPlaylist.playlistTracks}>
        {result.tracks && (
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
            {result.tracks.items.map((item, index) => (
              <>
                <SongDisplay
                  key={item.track.id}
                  id={item.track.id}
                  number={index}
                  image={
                    item.track.album.images[0]
                      ? item.track.album.images[0].url
                      : ""
                  }
                  title={item.track.name}
                  artists={item.track.artists}
                  album={item.track.album.name}
                  duration={item.track.duration_ms}
                  flag="search"
                />
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FeaturedPlaylistsTracks;
