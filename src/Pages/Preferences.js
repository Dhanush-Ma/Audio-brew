import React, { useState, useContext, useEffect } from "react";
import styles from "../Styles/Preferences.module.css";
import genres from "../Utilities/genres";
import { BsCheck2Circle } from "react-icons/bs";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../Utilities/baseURL";

const Genre = ({ genre, handleClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  const addPreferences = (genre) => {
    setIsSelected(!isSelected);
    if (isSelected) {
      handleClick((prev) => prev.filter((item) => item != genre));
    } else {
      handleClick((prev) => [...prev, genre]);
    }
  };
  return (
    <div
      className={isSelected ? styles.selectedGenre : styles.genre}
      onClick={() => addPreferences(genre)}
    >
      <p>{genre}</p>
      {isSelected && <BsCheck2Circle className={styles.selectIcon} />}
    </div>
  );
};

const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [country, setCounty] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const navigate = useNavigate();
  console.log(preferences);

  const genreElements = genres.genres.map((genre, index) => (
    <Genre key={index} genre={genre} handleClick={setPreferences} />
  ));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (location) {
      const latitude = location.coords.latitude;
      const longitude = location.coords.longitude;
      fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      )
        .then((res) => res.json())
        .then((data) => {
          setCountryCode(data.countryCode);
          setCounty(data.countryName);
          console.log(data.countryName);
        })
        .catch((err) => console.log(err));
    });
  }, []);

  const submitPreferences = () => {
    console.log("cli");
    const token = localStorage.getItem("token");
    console.log(token);
    Axios({
      method: "put",
      url: baseURL + "/me",
      headers: {
        "x-auth-token": token,
      },
      data: {
        preferences: preferences,
        country: country,
        countryCode: countryCode,
        flag: "genre",
      },
    })
      .then((data) => {
        console.log(data);
        navigate("/preferences/artist");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.preferencesContainer}>
        <h1>
          Choose atleast <span style={{ color: "#1df549" }}>three</span> of your
          favorite genres of music.
        </h1>
        <div className={styles.genreContainer}>{genreElements}</div>
        <button
          disabled={preferences.length >= 3 ? false : true}
          onClick={submitPreferences}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Preferences;
