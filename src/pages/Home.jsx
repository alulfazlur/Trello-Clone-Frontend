import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { doLogIn } from "../store/actions/userAction";
import { getBoardList } from "../store/actions/boardAction";

import Header from "../components/Header";
class Home extends Component {
  componentDidMount = async () => {
    await this.props.doLogIn();
    this.props.getBoardList();
    console.warn("checking props", this.props);
  };

  render() {
    const boardList = this.props.boardList;
    return (
      <React.Fragment>
        <Header />
          <div 
    style={{paddingTop:"100px"}}
          >
            {boardList.map((el, index) => (
              <Link to={`/${el.id}`} key={index} 
              >
                {el.title}
              </Link>
            ))}
          </div>
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
  getBoardList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
