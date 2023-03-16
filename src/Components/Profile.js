import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import styles from "../Styles/Profile.module.css";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";

const Profile = () => {
  const { user } = useContext(Context);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const navigate = useNavigate();
  function logout() {
    localStorage.clear()
    navigate("/home");
  }

  return (
    <>
      <div className={styles.profileDetails}>
        <FaUserAlt />
        <p>{user.name && user.name.split(" ")[0]}</p>
        {!showDropdownMenu ? (
          <AiOutlineCaretDown
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowDropdownMenu(true);
            }}
          />
        ) : (
          <AiOutlineCaretUp
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowDropdownMenu(false);
            }}
          />
        )}
      </div>
      {showDropdownMenu && (
        <div className={styles.dropdownOpions}>
          <Link
            to="profile"
            style={{ color: "#fff" }}
            onClick={() => {
              setShowDropdownMenu(false);
            }}
          >
            <p>Profile</p>
          </Link>
          <Link to="/" onClick={logout} style={{ color: "#fff" }}>
            <p>Logout</p>
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
