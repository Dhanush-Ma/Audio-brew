import React from "react";
import styles from "../../Styles/ProfileCard.module.css";
import { Link } from "react-router-dom";

const ProfileCard = (props) => {
  return (
    <>
      <Link to={props.link}>
        <div className={styles.profileCardContainer}>
          <div className={styles.imgContainer}>
            {props.img}
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.name}>{props.title}</p>
            <p className={styles.songs}>{`${props.length} songs`}</p>
            <p className={styles.userInfo}>{`By ${props.name}`}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ProfileCard;
