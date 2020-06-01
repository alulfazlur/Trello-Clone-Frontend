import React, { Component } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { doSignup, changeInputUser } from "../store/actions/userAction";
import Header from "../components/Header";

class SignUp extends Component {
  postSignup = async () => {
    await this.props.doSignup();
   this.props.history.push("/signin");
  };

  render() {
    return (
      <React.Fragment>
      <Header />
        <div className="container login-page">
          <div className="form login-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="userName"
                placeholder="Username"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <input
                type="password"
                name="passWord"
                placeholder="Password"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => this.props.changeInputUser(e)}
              />
              <button onClick={() => this.postSignup()}>sign up</button>
              <p style={{color:"#3f51b5", marginTop : "20px"}}>Have an account? <br/> <Link to="/signin" style={ { color: "#3f51b5" }}>SIGN IN</Link></p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
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
  doSignup,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
