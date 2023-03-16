import React, { useState, useEffect } from "react";
import genralStyles from "../Styles/Preferences.module.css";
import styles from "../Styles/ArtistsPreferences.module.css";

import artists from "../Utilities/artists";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../Utilities/baseURL"
const Artist = ({ artist, handleClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const addPreferences = (id, name, url) => {
    setIsSelected(!isSelected);
    if (isSelected) {
      handleClick((prev) => prev.filter((item) => item.id != id));
    } else {
      handleClick((prev) => [...prev, { id, name, url }]);
    }
  };

  return (
    <div
      className={isSelected ? styles.selectedArtist : styles.artist}
      onClick={() =>
        addPreferences(artist.id, artist.name, artist.images[0].url)
      }
    >
      <div className={styles.imgContainer}>
        <img src={artist.images[0].url} alt={`Picture of ${artist.name} `} />
      </div>
      <p>{artist.name}</p>
    </div>
  );
};

const ArtistsPreferences = () => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  console.log(preferences);

  function compareByPopularity(a, b) {
    if (a.popularity < b.popularity) {
      return 1;
    }
    if (a.popularity > b.popularity) {
      return -1;
    }
    return 0;
  }

  const artistsArray = artists.artists;
  let filterArray = artistsArray.filter(
    (value, index, self) =>
      index === self.findIndex((a) => a.name === value.name)
  );
  filterArray = filterArray.sort(compareByPopularity);

  const artistElements = filterArray.map((artist, index) => (
    <Artist key={index} artist={artist} handleClick={setPreferences} />
  ));

  const submitPreferences = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    Axios({
      method: "put",
      url: baseURL + "/me",
      headers: {
        "x-auth-token": token,
      },
      data: {
        artistsPreferences: preferences,
        flag: "artist",
      },
    })
      .then((data) => {
        console.log(data);
        navigate("/me");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={genralStyles.container}>
      <div className={genralStyles.preferencesContainer}>
        <h1>
          Choose atleast <span style={{ color: "#1df549" }}>three</span> of your
          favorite artists.
        </h1>
        <div className={styles.artistContainer}>{artistElements}</div>
        <button
          disabled={preferences.length >= 3 ? false : true}
          onClick={submitPreferences}
        >
          CREATE ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default ArtistsPreferences;
