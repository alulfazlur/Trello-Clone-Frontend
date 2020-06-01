import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { doLogIn } from "../store/actions/userAction";
import {
  getBoardList,
  addBoard,
  changeInputBoard,
} from "../store/actions/boardAction";

import Header from "../components/Header";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { doLogOut } from "../store/actions/userAction";
class Home extends Component {
  componentDidMount = async () => {
    // await this.props.doLogIn();
    this.props.getBoardList();
    console.warn("checking props", this.props);
  };

  onClickHandle = (params) => {
    this.props.history.push(`/${params}`);
  };

  render() {
    if (!localStorage.getItem("login_status")) {
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: { message: "You must sign in first!" },
          }}
        />
      );
    } else {
      const boardList = this.props.boardList;
      return (
        <div>
          <Header doLogOut={() => this.props.doLogOut()} />
          <div style={{ paddingTop: "100px" }}>
            {boardList.map((el, index) => (
              <div
                key={index}
                style={{
                  textDecoration: "none",
                  justifyContent: "center",
                  display: "flex",
                }}
                className="board-page"
              >
                <IconButton
                  style={{ transition: "none" }}
                  onClick={(params) => this.onClickHandle(el.id)}
                >
                  <Typography variant="body2" style={{ padding: "0 15px" }}>
                    {el.title}
                  </Typography>
                </IconButton>
              </div>
            ))}
            <div style={{ justifyContent: "center", display: "flex" }} className="add-board-div">
              <InputBase
                className="add-board"
                placeholder="New Board Title..."
                autoFocus
                name="newTitle"
                onChange={(e) => this.props.changeInputBoard(e)}
              />
              <IconButton
                style={{ transition: "none" }}
                onClick={() => this.props.addBoard()}
              >
                <Typography variant="body2" style={{ padding: "0 15px" }}>
                  Add New Board
                </Typography>
              </IconButton>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    boardList: state.board.boardList,
  };
};
const mapDispatchToProps = {
  doLogIn,
  getBoardList,
  doLogOut,
  addBoard,
  changeInputBoard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
