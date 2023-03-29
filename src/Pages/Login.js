import React, { useEffect, useState } from "react";
import styles from "../Styles/Register.module.css";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import { NavLink } from "react-router-dom";
import BackgroundFlow from "../Utilities/BackgroundFlow";
import baseURL from "../Utilities/baseURL";
import getAuthorizationCode from "../Utilities/getAuthorizationCode";
import LoadingIndicator from "../Utilities/loadingIndicator";
import logo from "../Assets/logo.png";
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
  const [loading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    axios
      .post(baseURL, formData)
      .then((data) => {
        setErrMsg("");
        setIsLoading(false);
        localStorage.setItem("token", data.data);
        getAuthorizationCode();
      })
      .catch((err) => {
        setIsLoading(false);
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
          <h1>Login to continuie Exploring</h1>
        </div>

        <form onSubmit={handleFormData}>
          {errMsg && (
            <p className={styles.errMsg}>
              <AiFillWarning color="#fff" className={styles.info} />
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
          {loading ? (
            <LoadingIndicator />
          ) : (
            <button className={styles.button} disabled={!validData}>
              LOG IN
            </button>
          )}
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
