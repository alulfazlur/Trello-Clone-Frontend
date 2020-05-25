import axios from "axios";
const baseUrl = process.env.REACT_APP_PUBLIC_URL

export const doLogIn = (props) => {
    return async (dispatch, getState) => {
      await axios({
        method: "GET",
        url: baseUrl + "/login",
        params: {
          username: "alul",
          password: "password",
        //   username: getState().user.userName,
        //   password: getState().user.passWord,
        },
      })
        .then(async (response) => {
          if (response.data.hasOwnProperty("token")) {
            dispatch({ type: "SUCCESS_LOGIN", payload: response.data });
            localStorage.setItem("token", response.data.token);
            // localStorage.setItem("login_status", true);
          }
        })
        .catch(() => {
          alert("Password atau Username anda salah. Coba lagi :) ");
        });
    };
  };