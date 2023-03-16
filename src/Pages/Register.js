import React, { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../Assets/logo.png";
import BackgroundFlow from "../Utilities/BackgroundFlow";
import baseURL from "../Utilities/baseURL";

const Register = () => {
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [validData, setValidData] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { username, email, password } = formData;

  useEffect(() => {
    if (username && password && EMAIL_REGEX.test(email)) {
      setValidData(true);
    } else {
      setValidData(false);
    }
  }, [username, email, password]);

  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFormData = (e) => {
    e.preventDefault();

    axios
      .post(baseURL + "/register", formData)
      .then((data) => {
        setErrMsg("");
        console.log(data);
        localStorage.setItem("token", data.data);
        navigate("/preferences/genre");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          setErrMsg(err.response.data);
        } else if (err.response.status === 500 || 404) {
          setErrMsg("Registration Failed");
        }
      });
  };

  return (
    <>
      <BackgroundFlow />
      <div className={styles.register_container}>
        <div className={styles.logo}>
          <img src={logo} alt="Audio Brew"></img>
        </div>

        <form onSubmit={handleFormData}>
          {errMsg && (
            <p className={styles.errMsg}>
              <FaInfoCircle className={styles.info} />
              {` ${errMsg}`}
            </p>
          )}
          <div className={styles.inputBox}>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required={true}
              autoComplete="off"
            />
            <label className={styles.label} htmlFor="email">
              Full Name
            </label>
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              required={true}
              name="email"
              value={email}
              onChange={onChange}
              autoComplete="off"
            />
            <label className={styles.label} htmlFor="email">
              Email
            </label>
          </div>
          <div className={styles.inputBox}>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required={true}
            />
            <label className={styles.label} htmlFor="email">
              Password
            </label>
          </div>
          <input type="submit" value="SIGN UP" disabled={!validData} />
        </form>
        <p>
          Already have an account?{" "}
          <NavLink className={styles.link} to="/">
            Login
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default Register;
