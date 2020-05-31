import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { doLogIn, changeInputUser } from "../store/actions/userAction";
import Header from "../components/Header";

class Login extends Component {
  postLogin = async () => {
    await this.props.doLogIn();
    if (localStorage.getItem("login_status")) {
      this.props.history.push("/");
    }
  };

  render() {
    if (localStorage.getItem("login_status")) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: { message: "You must sign in first!" },
          }}
        />
      );
    } else {
    const message = this.props.location.state
      ? this.props.location.state.message
      : "";
    return (
      <React.Fragment>
      <Header />
        <div className="container login-page">
          <div className="form login-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="userName"
                placeholder="username"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <input
                type="password"
                name="passWord"
                placeholder="password"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <button onClick={() => this.postLogin()}>login</button>
              <p style={{ color: "red", marginTop: "10px" }}>{message}</p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
}
const mapStateToProps = (state) => {
  return {
    userName: state.user.userName,
    passWord: state.user.passWord,
    login: state.user.status,
  };
};

const mapDispatchToProps = {
  changeInputUser,
  doLogIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
