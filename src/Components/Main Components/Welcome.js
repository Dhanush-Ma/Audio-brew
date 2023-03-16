import React, { useContext } from "react";
import styles from "../../Styles/Welcome.module.css";
import FeaturedPlaylists from "../Welcome Components/FeaturedPlaylists";
import ArtistMix from "../Welcome Components/ArtistMix";
import { Context } from "../../Context/Context";

const Welcome = () => {
  const { user } = useContext(Context);

  return (
    <div className={styles.welcomeContainer}>
      <h1>
        {new Date().getHours() >= 12 ? "Good Evening" : "Good Morning"} ,{"  "}
        {user.name}
      </h1>
      <ArtistMix />
      <FeaturedPlaylists />
    </div>
  );
};

export default Welcome;

