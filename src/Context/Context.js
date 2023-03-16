import React, { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userLikedSongs, setUserLikedSongs] = useState([]);

  const [currentSongID, setCurrentSongID] = useState("");
  const [currentSongDetails, setCurrentSongDetails] = useState();
  const [code, setCode] = useState("")
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  const [mountModal, setMountModal] = useState({ flag: false, content: "" });

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        code,
        setCode,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        expiresIn,
        setExpiresIn,
        currentSongID,
        setCurrentSongID,
        currentSongDetails,
        setCurrentSongDetails,
        userPlaylists,
        setUserPlaylists,
        mountModal,
        setMountModal,
        userLikedSongs,
        setUserLikedSongs,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
