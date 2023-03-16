import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";
import SongDisplay from "./Utility Components/SongDisplay";
import styles from "../Styles/Search.module.css";
import stylesPlaylist from "../Styles/Playlist.module.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import getDuration from "../Utilities/getDuration";

const ArtistPlaylist = () => {
  const { id } = useParams();
  const location = useLocation();

  const { accessToken } = useContext(Context);
  const [result, setResult] = useState();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    console.log("id", id);
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/artists/${id}/top-tracks?market=IN`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        setTracks(data.data.tracks.map((track) => track.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (tracks.length == 0) return;
    const tracksStrings = tracks.join("%2C");
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/tracks?ids=${tracksStrings}`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        console.log(data.data.tracks);
        setResult(data.data.tracks);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [tracks]);

  console.log(result);

  return (
    <>
      {result && (
        <>
          <div className={stylesPlaylist.playlistInfo}>
            <div className={stylesPlaylist.imgContainer}>
              <RiPlayList2Fill className={stylesPlaylist.playlistIcon} />
            </div>
            <div className={stylesPlaylist.playlistDetails}>
              <p
                className={stylesPlaylist.playlistName}
                style={{ textTransform: "capitalize" }}
              >{`${location.state.name}`}</p>
              <div>
                <p className={stylesPlaylist.playlistTracksDetails}>
                  {`${result.length} songs `} &#183;{" "}
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
        {result && (
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
            {result.map(
              (item, index) =>
                item.id && (
                  <SongDisplay
                    key={item.id}
                    id={item.id}
                    number={index}
                    image={item.album.images[0] ? item.album.images[0].url : ""}
                    title={item.name}
                    artists={item.artists}
                    album={item.album.name}
                    duration={item.duration_ms}
                    flag="search"
                  />
                )
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ArtistPlaylist;
