import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { doLogIn } from "../store/actions/userAction";
import { getBoardList } from "../store/actions/boardAction";

import Header from "../components/Header";

import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {
 doLogOut
} from "../store/actions/userAction";
class Home extends Component {
  componentDidMount = async () => {
    // await this.props.doLogIn();
    this.props.getBoardList();
    console.warn("checking props", this.props);
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
      <div >
        <Header
          doLogOut={() => this.props.doLogOut()}
         />
        <div style={{ paddingTop: "100px" }}>
          {boardList.map((el, index) => (
            <Link to={`/${el.id}`} key={index} style={{textDecoration: "none",justifyContent: "center", display:"flex"}} className="board-page">
                <IconButton style={{ transition: "none" }}>
                  <Typography variant="body2" style={{ padding: "0 15px" }}>
                    {el.title}
                  </Typography>
                </IconButton>
            </Link>
          ))}
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
  doLogOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
