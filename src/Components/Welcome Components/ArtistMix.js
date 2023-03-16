import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import styles from "../../Styles/ArtistMix.module.css";
import Card from "./Card";

const ArtistMix = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <div className={styles.genreMixContainer}>
      <h4>Your Artist Mix</h4>
      <div className={styles.cardContainer}>
        {user.artistsPreferences &&
          user.artistsPreferences.map((pref) => {
            return (
              <Card
                key={pref.id}
                title={`${pref.name.split(" ")[0]} Mix`}
                link={`/AudioBrew/artist/${pref.id}`}
                img={<img src={pref.url} alt="poster" />}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ArtistMix;
