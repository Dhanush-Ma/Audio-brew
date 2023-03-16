import React, { useContext } from "react";
import { Context } from "../../Context/Context";
import styles from "../../Styles/ProfileInfo.module.css";
import ProfileCard from "./ProfileCard";
import { FcLike } from "react-icons/fc";
import { RiPlayList2Fill } from "react-icons/ri";

const Profile = () => {
  const { user, userLikedSongs, userPlaylists } = useContext(Context);
  return (
    <>
      <div className={styles.profileContainer}>
        <h1>Account Overview</h1>
        <div className={styles.profileInfoContainer}>
          <h4 className={styles.title}>Profile</h4>
          <div className={styles.profileInfo}>
            <div className={styles.details}>
              <p>Username</p>
              <p>Email</p>
              <p>Country</p>
              <p>Date Joined</p>
              <p>Preferences</p>
            </div>
            <div className={styles.details}>
              {user.preferences && (
                <>
                  <p>{user.name}</p>
                  <p>{user.email}</p>
                  <p>{user.countryCode}</p>
                  <p>{new Date(user.createdAt).toLocaleDateString("en-GB")}</p>
                  <p style={{ textTransform: "capitalize" }}>
                    {user.preferences.join(",")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.profileLibraryContainer}>
          <h4 className={styles.title}>Your Library</h4>
          <div className={styles.profileLibrary}>
            {userLikedSongs && (
              <ProfileCard
                title="Liked Songs"
                length={userLikedSongs.tracks.length}
                name={user.name}
                link="/personal"
                img={<FcLike />}
              />
            )}
            {userPlaylists &&
              userPlaylists.map((playlist) => {
                return (
                  <ProfileCard
                    key={playlist._id}
                    title={playlist.name}
                    length={playlist.tracks.length}
                    name={user.name}
                    link={`/playlist/${playlist._id}`}
                    img={<RiPlayList2Fill />}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
