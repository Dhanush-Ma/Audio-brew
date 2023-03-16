import React from "react";
import styles from "../Styles/BackgroundFlow.module.css";
import { MdOutlineLiveTv, MdEqualizer } from "react-icons/md";
import { CiStreamOn } from "react-icons/ci";
import { AiFillAudio } from "react-icons/ai";
import { GoDeviceCameraVideo } from "react-icons/go";
import { GiLoveSong, GiAudioCassette, GiSoundOn } from "react-icons/gi";
import { SiMusicbrainz } from "react-icons/si";
import { BsSpeakerFill } from "react-icons/bs";

const BackgroundFlow = () => {
  return (
    <>
      <div className={styles.context}></div>
      <div className={styles.area}>
        <ul className={styles.circles}>
          <MdOutlineLiveTv className={styles.icons} />
          <CiStreamOn className={styles.icons} />
          <AiFillAudio className={styles.icons} />
          <GoDeviceCameraVideo className={styles.icons} />
          <GiLoveSong className={styles.icons} />
          <SiMusicbrainz className={styles.icons} />
          <BsSpeakerFill className={styles.icons} />
          <GiAudioCassette className={styles.icons} />
          <MdEqualizer className={styles.icons} />
          <GiSoundOn className={styles.icons} />
        </ul>
      </div>
    </>
  );
};

export default BackgroundFlow;
