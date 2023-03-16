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
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames={styles.modal}
        unmountOnExit
      >
        <div className={styles.modal}>
          <p>{props.content}</p>
        </div>
      </CSSTransition>
    );
  } else {
    return null;
  }
}

export default Modal;
