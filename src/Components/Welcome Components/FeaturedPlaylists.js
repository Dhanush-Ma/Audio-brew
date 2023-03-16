import Axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Context/Context";
import styles from "../../Styles/FeaturedPlaylists.module.css";
import Card from "./Card";

const FeaturedPlaylists = () => {
  const { user, accessToken, code } = useContext(Context);
  const [result, setResult] = useState();

  useEffect(() => {
    if (!accessToken) return;
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/browse/categories?country=${user.countryCode}&limit=50`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        setResult(data.data.categories.items);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, [accessToken, code]);

  return (
    <div className={styles.featuredPlaylistsContainer}>
      <h4>Featured Playlists</h4>
      <div className={styles.cardContainer}>
        {result &&
          result.map((item) => {
            return (
              <Card
                key={item.id}
                title={item.name}
                link={`/AudioBrew/featured/${item.id}`}
                img={<img src={item.icons[0].url} alt="poster" />}
              />
            );
          })}
      </div>
    </div>
  );
};

export default FeaturedPlaylists;
