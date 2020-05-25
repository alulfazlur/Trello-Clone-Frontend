import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { doLogIn } from "../store/actions/userAction";
import { getBoard } from "../store/actions/boardAction";
class Home extends Component {
  componentDidMount = async () => {
    await this.props.doLogIn();
    this.props.getBoard();
    console.warn("checking props", this.props);
  };

  render() {
    const boardList = this.props.boardList;
    return (
      <React.Fragment>
        {boardList.map((el, index) => (
          <Link to={`/${el.id}`} key={index}>
            {el.title}
          </Link>
        ))}
      </React.Fragment>
    );
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
  getBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
