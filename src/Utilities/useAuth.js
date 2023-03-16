import { useEffect, useContext } from "react";
import Axios from "axios";
import { Context } from "../Context/Context";
import baseURL from "./baseURL";
export default function useAuth() {
  const {
    setAccessToken,
    refreshToken,
    setRefreshToken,
    expiresIn,
    setExpiresIn,
    code,
  } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("ACCESS_TOKEN")) {
      setAccessToken(localStorage.getItem("ACCESS_TOKEN"));
      setRefreshToken(localStorage.getItem("REFRESH_TOKEN"));
      setExpiresIn(localStorage.getItem("EXPIRES_IN"));
    }
    console.log("in token effect");
    Axios.post(baseURL + "/token", {
      code: code,
    })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);

        localStorage.setItem("ACCESS_TOKEN", res.data.accessToken);
        localStorage.setItem("REFRESH_TOKEN", res.data.refreshToken);
        localStorage.setItem("EXPIRES_IN", res.data.expiresIn);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      Axios.post(baseURL + "/refresh", {
        refreshToken,
      })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return <></>;
}
