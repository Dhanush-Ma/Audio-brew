import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import Axios from "axios";
import SongDisplay from "./Utility Components/SongDisplay";
import styles from "../Styles/Search.module.css";
import stylesPlaylist from "../Styles/Playlist.module.css";
import { AiOutlineClockCircle, AiFillDelete } from "react-icons/ai";
import { RiPlayList2Fill } from "react-icons/ri";
import getDuration from "../Utilities/getDuration";
import baseURL from "../Utilities/baseURL";

const Playlist = () => {
  const { id } = useParams();
  const { userPlaylists, setUserPlaylists, user, accessToken, setMountModal } =
    useContext(Context);
  console.log(userPlaylists);
  const [result, setResult] = useState([]);
  const navigate = useNavigate();

  const currentPlaylist = userPlaylists.find((playlist) => playlist._id === id);

  const deletePlaylist = () => {
    Axios({
      method: "delete",
      url: baseURL + "/playlists",
      data: {
        id: user._id,
        playlistID: currentPlaylist._id,
      },
    })
      .then((data) => {
        setUserPlaylists(data.data);
        setMountModal({ flag: true, content: "Playlist deleted" });
        navigate("/me");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const requests = currentPlaylist.tracks.map((track) =>
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

    currentPlaylist && fetchData();
  }, [currentPlaylist, accessToken]);

  return (
    <>
      {currentPlaylist && (
        <>
          <div className={stylesPlaylist.playlistInfo}>
            <div className={stylesPlaylist.imgContainer}>
              <RiPlayList2Fill className={stylesPlaylist.playlistIcon} />
            </div>
            <div className={stylesPlaylist.playlistDetails}>
              <p className={stylesPlaylist.playlistName}>
                {currentPlaylist.name}
              </p>
              <div className={stylesPlaylist.playListBox}>
                <div>
                  <p className={stylesPlaylist.playlistDate}>
                    {`Date created: 
             ${new Date(currentPlaylist.createdAt).toLocaleDateString(
               "en-GB"
             )}`}
                  </p>

                  <p className={stylesPlaylist.playlistTracksDetails}>
                    {`${currentPlaylist.tracks.length} songs `} &#183;{" "}
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
                <div className={stylesPlaylist.icons}>
                  <AiFillDelete color="#d11a2a" onClick={deletePlaylist} />
                </div>
              </div>
            </div>
          </div>
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
                flag="playlist"
                playlist={currentPlaylist._id}
              />
            ))}
          </div>
        ) : (
          <p className={stylesPlaylist.userInfo}>
            Your Playlist is empty!
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

export default Playlist;
