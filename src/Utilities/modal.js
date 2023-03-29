import React, { useState, useEffect, useContext } from "react";
import { Context } from "../Context/Context";
import styles from "../Styles/Modal.module.css";
import { CSSTransition } from "react-transition-group";

function Modal(props) {
  const [showModal, setShowModal] = useState(true);
  const { setMountModal } = useContext(Context);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(false);
      setMountModal({ flag: false, content: "" });
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (showModal) {
    return (
      <div className={styles.mainModalConatiner}>
        <div className={styles.modal}>
          <p>{props.content}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Modal;
