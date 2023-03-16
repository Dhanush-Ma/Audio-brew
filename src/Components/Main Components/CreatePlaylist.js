import React, { useState, useContext } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import styles from "../../Styles/CreatePlaylist.module.css";
import { useNavigate } from "react-router-dom";
import { RiPlayList2Fill } from "react-icons/ri";
import baseURL from "../../Utilities/baseURL";

const CreatePlaylist = () => {
  const { userPlaylists, setUserPlaylists, user, setMountModal } =
    useContext(Context);
  const [name, setName] = useState(`My Playlist #${userPlaylists.length + 1}`);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const addPlaylist = async () => {
    axios({
      method: "POST",
      url: baseURL + "/playlists",
      data: {
        id: user._id,
        playlistName: name,
      },
    })
      .then((data) => {
        setUserPlaylists([...userPlaylists, data.data]);
        console.log(data.data);
        navigate(`${data.data._id}`);
        setMountModal({
          flag: true,
          content: "Playlist added to your library ",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.selectImageContainer}>
          <div className={styles.inputContanier}>
            <label for="file">Upload your playlist picture</label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={(e) => {
                setFile(URL.createObjectURL(e.target.files[0]));
              }}
              accept="image/png, image/gif, image/jpeg"
            />
          </div>
          <div className={styles.imgContainer}>
            {file ? (
              <img className={styles.playlistImg} src={file} alt="icon" />
            ) : (
              <RiPlayList2Fill className={styles.playlistIcon} />
            )}
          </div>
        </div>
        <div>
          <input
            className={styles.playlistName}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <p>Public Playlist &#183; {user.name}</p>
        </div>
      </div>
      <button className={styles.button} onClick={addPlaylist}>
        Create Playlist
      </button>
    </>
  );
};

export default CreatePlaylist;
