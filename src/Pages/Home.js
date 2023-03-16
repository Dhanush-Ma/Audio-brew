import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import styles from "../Styles/Home.module.css";
import { useNavigate } from "react-router-dom";
import Main from "../Components/Main";
import MusicPlayer from "../Components/MusicPlayer";
import OptionsNav from "../Components/OptionsNav";
import { Context } from "../Context/Context";
import UseAuth from "../Utilities/useAuth";
import Profile from "../Components/Profile";
import baseURL from "../Utilities/baseURL";

const Home = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const {
    user,
    setUser,
    code,
    setCode,
    accessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
    setUserPlaylists,
  } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("In effect 1");
    const token = localStorage.getItem("token");
    Axios.get(baseURL + "/me", {
      headers: {
        "x-auth-token": token,
      },
    })
      .then((data) => {
        setUser(data.data);
        setAuthenticated(true);

        setCode(new URLSearchParams(window.location.search).get("code"));
        window.history.pushState({}, null, "/");
        //Get Token from Backend
      })
      .catch((err) => {
        console.log(err);
        setAuthenticated(false);
        if (err.response.status === 401 || err.response.status === 400)
          navigate("/");
      });
  }, [setCode]);

  return (
    <>
      <div className={styles.home}>
        <UseAuth />
        <Main />
        <Profile />
        <OptionsNav />
        <MusicPlayer />
      </div>
    </>
  );
};

export default Home;
