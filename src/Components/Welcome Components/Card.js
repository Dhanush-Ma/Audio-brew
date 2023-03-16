import React from "react";
import styles from "../../Styles/Card.module.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <>
      <Link to={props.link} state={{ name: props.title }}>
        <div className={styles.CardContainer}>
          <div className={styles.imgContainer}>{props.img}</div>
          <div className={styles.infoContainer}>
            <p className={styles.name}>{props.title}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
