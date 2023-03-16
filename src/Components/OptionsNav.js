import React, { useContext, useEffect } from "react";
import styles from "../Styles/OptionsNav.module.css";
import useWindowDimensions from "../Utilities/useWindowDimensions";
import { Context } from "../Context/Context";
import { AiOutlineHome } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { GoDiffAdded } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { Scrollbars } from "react-custom-scrollbars-2";
import { NavLink } from "react-router-dom";
import Axios from "axios";
import { Link } from "react-router-dom";
import baseURL from "../Utilities/baseURL";

const OptionNav = () => {
  const { userPlaylists, setUserPlaylists, user, setUserLikedSongs } =
    useContext(Context);
  const { height } = useWindowDimensions();

  useEffect(() => {
    Axios({
      method: "get",
      url: baseURL + "/playlists",
      params: {
        id: user._id,
      },
    })
      .then((data) => {
        setUserPlaylists(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    Axios({
      method: "get",
      url: baseURL + "/likedSongs",
      params: {
        id: user._id,
      },
    })
      .then((data) => {
        setUserLikedSongs(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, setUserPlaylists,setUserLikedSongs]);

  let renderCustomHorizontalThumb = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `red`,
      width: "4px",
      right: "-2px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  let renderCustomHorizontalTrack = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: `green`,
      width: "14px",
      right: "-2px",
      height: "100%",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };
  return (
    <div className={styles.main} style={{ height: height - 290 }}>
      <div className={styles.optionsList}>
        <div className={styles.options}>
          <NavLink to="me">
            <div className={styles.option}>
              <AiOutlineHome size={29} />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="search">
            <div className={styles.option}>
              <BiSearch size={29} />
              <p>Search</p>
            </div>
          </NavLink>
        </div>

        <div className={styles.options}>
          <NavLink to="playlist">
            <div className={styles.option}>
              <GoDiffAdded size={29} />
              <p>Create Playlist</p>
            </div>
          </NavLink>
          <NavLink to="personal">
            <div className={styles.option}>
              <FcLike size={29} color="red" />
              <p>Liked Songs</p>
            </div>
          </NavLink>
        </div>
      </div>
      <Scrollbars
        // This will activate auto hide
        autoHide
        // Hide delay in ms
        autoHideTimeout={1000}
        // Duration for hide animation in ms.
        autoHideDuration={200}
        renderThumbVertical={renderCustomHorizontalThumb}
        renderTrackHorizontal={renderCustomHorizontalTrack}
      >
        <div className={styles.userPlaylists}>
          {userPlaylists &&
            userPlaylists.map((playlist) => {
              return (
                <Link
                  to={`playlist/${playlist._id}`}
                  key={playlist._id}
                  id={playlist._id}
                >
                  {playlist.name}
                </Link>
              );
            })}
        </div>
      </Scrollbars>
    </div>
  );
};

export default OptionNav;
