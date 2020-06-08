import axios from "axios";
// const baseUrl = process.env.REACT_APP_PUBLIC_URL
const baseUrl = "https://trello-be.fazlurtech.my.id";

export const doLogIn = (props) => {
    return async (dispatch, getState) => {
      await axios({
        method: "GET",
        url: baseUrl + "/login",
        params: {
          // username: "alul",
          // password: "password",
          username: getState().user.userName,
          password: getState().user.passWord,
        },
      })
        .then(async (response) => {
          if (response.data.hasOwnProperty("token")) {
            dispatch({ type: "SUCCESS_LOGIN", payload: response.data });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("login_status", true);
          }
        })
        .catch(() => {
          alert("Password or Username is not match. Try again!");
        });
    };
  };

  export const doSignup = (props) => {
    return async (dispatch, getState) => {
      await axios({
        method: "POST",
        url: baseUrl + "/user",
        data: {
          username: getState().user.userName,
          password: getState().user.passWord,
          name: getState().user.name,
          email: getState().user.email,
        },
      })
        .then( () => {
            dispatch({ type: "SUCCESS_SIGNUP"});
        })
        .catch(() => {
          alert("Make sure you fill all the data!");
        });
    };
  };

  export const getBio = (props) => {
    return async (dispatch, getState) => {
    const token = localStorage.getItem("token");
    await axios({
        method: "GET",
        url: baseUrl + "/user/me",
      headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (response) => {
            dispatch({ type: "SUCCESS_GET_BIO", payload: response.data });
        })
        .catch((error) => {
          console.log(error);;
        });
    };
  };

  export const changeInputUser = (e) => {
    return {
      type: "CHANGE_INPUT_USER",
      payload: e,
    };
  };

  export const doLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("login_status");
    localStorage.removeItem("status");
    alert("Kamu telah Logout")
    return {
      type: "SUCCESS_LOGOUT",
    };
  };