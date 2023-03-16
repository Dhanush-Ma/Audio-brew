import React, { useContext } from "react";
import styles from "../Styles/Main.module.css";
import Profile from "../Components/Profile";
import useWindowDimensions from "../Utilities/useWindowDimensions";
import { Context } from "../Context/Context";
import { Outlet } from "react-router-dom";
import Modal from "../Utilities/modal";
const Main = () => {
  const { height, width } = useWindowDimensions();
  const { mountModal } = useContext(Context);
  return (
    <div
      className={styles.main}
      style={{ width: width - 200, height: height - 90 }}
    >
      <Profile />
      {mountModal && mountModal.flag && <Modal content={mountModal.content} />}

      <Outlet />
    </div>
  );
};

export default Main;
