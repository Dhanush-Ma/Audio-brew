import React, { useContext, useState } from "react";
import styles from "../../Styles/Search.module.css";
import { Context } from "../../Context/Context";
import getDuration from "../../Utilities/getDuration";
import { BsThreeDots } from "react-icons/bs";
import Axios from "axios";
import baseURL from "../../Utilities/baseURL";

const SongDisplay = (props) => {
  const {
    currentSongID,
    setCurrentSongID,
    userPlaylists,
    setUserPlaylists,
    userLikedSongs,
    setUserLikedSongs,
    user,
    setMountModal,
  } = useContext(Context);
  const [showDropdown, setShowDropdown] = useState(false);
  const [playlistDropdown, setPlaylistDropdown] = useState(false);
  const addToPlaylist = (playlistID, trackID) => {
    setShowDropdown((prev) => !prev);
    setPlaylistDropdown((prev) => !prev);

    Axios({
      method: "put",
      url: baseURL + "/playlists",
      data: {
        id: user._id,
        playlistID: playlistID,
        trackID: trackID,
        flag: "add",
      },
    })
      .then((data) => {
        setUserPlaylists(data.data);
        setMountModal({ flag: true, content: "Track added to Playlist" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromPlaylist = (playlistID, trackID) => {
    setShowDropdown((prev) => !prev);

    Axios({
      method: "put",
      url: baseURL + "/playlists",
      data: {
        id: user._id,
        playlistID: playlistID,
        trackID: trackID,
        flag: "remove",
      },
    })
      .then((data) => {
        setUserPlaylists(data.data);
        setMountModal({ flag: true, content: "Track removed from Playlist" });

        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeFromLikedSongs = (trackID) => {
    setShowDropdown((prev) => !prev);

    Axios({
      method: "PUT",
      url: baseURL + "/likedSongs",
      data: {
        id: user._id,
        trackID: trackID,
        flag: "remove",
      },
    })
      .then((data) => {
        setUserLikedSongs(data.data);
        setMountModal({
          flag: true,
          content: "Track removed from Personal list",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addToLikedSongs = (trackID) => {
    setShowDropdown((prev) => !prev);

    Axios({
      method: "PUT",
      url: baseURL + "/likedSongs",
      data: {
        id: user._id,
        trackID: trackID,
        flag: "add",
      },
    })
      .then((data) => {
        setUserLikedSongs(data.data);
        setMountModal({
          flag: true,
          content: "Track added to Personal list",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        className={styles.track}
        id={props.id}
        onClick={() => setCurrentSongID(props.id)}
      >
        <div className={styles.numberContainer}>
          {currentSongID === props.id ? (
            <div className={styles.iconsvg}>
              <div className={styles.stroke}></div>
              <div className={styles.stroke}></div>
              <div className={styles.stroke}></div>
              <div className={styles.stroke}></div>
              <div className={styles.stroke}></div>
            </div>
          ) : (
            <p className={styles.trackNo}>{props.number + 1}</p>
          )}
        </div>
        <div className={styles.trackTitleContainer}>
          <img
            src={props.image}
            alt="track poster"
            className={styles.trackImg}
          />
          <div className={styles.trackInfoContainer}>
            <p className={styles.trackTitle}>{props.title}</p>
            <p className={styles.trackArtists}>
              {props.artists.map((artist) => artist.name).join(",")}
            </p>
          </div>
        </div>
        <p className={styles.trackAlbum}>{props.album}</p>
        <div className={styles.durationContainer}>
          <p className={styles.trackDuration}>{getDuration(props.duration)}</p>
          <BsThreeDots
            className={styles.menuIcon}
            onClick={() => setShowDropdown((prev) => !prev)}
          />
          {props.flag === "search" && showDropdown && (
            <div className={styles.dropdown}>
              <ul className={styles.playlistElements}>
                {userPlaylists.length > 0 && (
                  <li onClick={() => setPlaylistDropdown((prev) => !prev)}>
                    Add to playlist
                  </li>
                )}
                {userLikedSongs.tracks.find(
                  (track) => track == currentSongID
                ) ? (
                  <li onClick={() => removeFromLikedSongs(props.id)}>
                    Remove from list
                  </li>
                ) : (
                  <li onClick={() => addToLikedSongs(props.id)}>
                    Add to Liked Songs
                  </li>
                )}
              </ul>
            </div>
          )}
          {props.flag === "search" && showDropdown && playlistDropdown && (
            <div className={styles.playlistDropdown}>
              <ul className={styles.playlistElements}>
                {userPlaylists.map((playlist) => {
                  return (
                    <li
                      key={playlist._id}
                      onClick={() => addToPlaylist(playlist._id, props.id)}
                    >
                      {playlist.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {props.flag === "playlist" && showDropdown && (
            <div className={styles.dropdown}>
              <ul className={styles.playlistElements}>
                <li
                  onClick={() => removeFromPlaylist(props.playlist, props.id)}
                >
                  Remove from playlist
                </li>
              </ul>
            </div>
          )}
          {props.flag === "likedSongs" && showDropdown && (
            <div className={styles.dropdown}>
              <ul className={styles.playlistElements}>
                <li onClick={() => removeFromLikedSongs(props.id)}>
                  Remove from list
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SongDisplay;
