import React, { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import BackgroundFlow from "../Utilities/BackgroundFlow";
import baseURL from "../Utilities/baseURL";

import logo from "../Assets/logo.png"
const Register = () => {
  const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [validData, setValidData] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { email, password } = formData;
  const navigate = useNavigate();

  //Authorization Code
  function getAuthorizationCode() {
    const AUTH_URL =
      "https://accounts.spotify.com/authorize?client_id=42f83ce8dd584b0c992bad52d9c08b02&response_type=code&redirect_uri=http://localhost:3000/me&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

    window.location = AUTH_URL;

    const code = new URLSearchParams(window.location.search).get("code");
    console.log(code);
    // return code;
  }

  useEffect(() => {
    if (password && EMAIL_REGEX.test(email)) {
      setValidData(true);
    } else {
      setValidData(false);
    }
  }, [email, password]);

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
      .post(baseURL, formData)
      .then((data) => {
        setErrMsg("");
        // console.log(data.data);
        localStorage.setItem("token", data.data);
        getAuthorizationCode();

        // navigate("/me");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          setErrMsg(err.response.data);
        } else if (err.response.status === 401) {
          setErrMsg(err.response.data);
        } else if (err.response.status === 500 || 404) {
          setErrMsg("Login Failed");
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
              id="email"
              type="text"
              placeholder=""
              name="email"
              value={email}
              onChange={onChange}
              required={true}
            />
            <label className={styles.label} htmlFor="email">
              Email
            </label>
          </div>
          <div className={styles.inputBox}>
            <input
              id="password"
              type="password"
              placeholder=""
              name="password"
              value={password}
              onChange={onChange}
              required={true}
            />
            <label className={styles.label} htmlFor="password">
              Password
            </label>
          </div>
          <input type="submit" value="SIGN UP" disabled={!validData} />
        </form>
        <p>
          Don't have an account? No Worries{" "}
          <NavLink className={styles.link} to="/register">
            Get One
          </NavLink>
        </p>
      </div>
    </>
  );
};

export default Register;
