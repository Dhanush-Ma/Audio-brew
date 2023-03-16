import Axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { useParams } from "react-router-dom";
import Card from "./Card";
import styles from "../../Styles/FeaturedPlaylistsInfo.module.css";

const FeaturedPlaylistsInfo = () => {
  const { id } = useParams();
  const { user, accessToken } = useContext(Context);
  const [result, setResult] = useState([]);
  useEffect(() => {
    Axios({
      method: "get",
      url: `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((data) => {
        setResult(data.data.playlists.items);
        console.log(data.data.playlists.items);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);
  return (
    <div className={styles.container}>
      {result &&
        result.map((item) => {
          return (
            <Card
              key={item.id}
              title={item.name}
              link={`/AudioBrew/featured/tracks/${item.id}`}
              img={<img src={item.images[0].url} alt="poster" />}
            />
          );
        })}
    </div>
  );
};

export default FeaturedPlaylistsInfo;
