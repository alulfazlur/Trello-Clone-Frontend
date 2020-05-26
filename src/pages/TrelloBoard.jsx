import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";
import Header from "../components/Header";
import BoardHeader from "../components/SecondHeader";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TrelloList from "../components/TrelloList";
import AddButton from "../components/AddButton";

import {
  sortOnDrag,
  getList,
  createList,
  changeInputList,
} from "../store/actions/listsAction";
import { setActiveBoard } from "../store/actions/boardAction";
import {
  stopLoading,
  reorderCard,
  renameCard,
} from "../store/actions/cardAction";

class Board extends Component {
  componentDidMount = async () => {
    const { boardId } = this.props.match.params;
    await this.props.getList(boardId);
    this.props.setActiveBoard(boardId);
    // console.warn("checking props", this.props);
  };

  componentDidUpdate = async () => {
    const boardId = this.props.board.activerBoardId;
    if (this.props.isLoadingList || this.props.isLoadingCard) {
      await this.props.stopLoading();
      this.props.getList(boardId);
    }
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    this.props.reorderCard(
      draggableId,
      destination.droppableId,
      destination.index
    );
    this.props.sortOnDrag(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    );
  };

  render() {
    const lists = this.props.lists;
    return (
      <React.Fragment>
        <Header />
        <div style={{ paddingTop: "50px" }}>
          <BoardHeader />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ marginTop: "50px" }}>
            <Droppable
              droppableId="all-lists"
              direction="horizontal"
              type="list"
            >
              {(provided) => (
                <div
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {lists.map((el, index) => {
                    return (
                      <TrelloList
                        key={el.id}
                        index={index}
                        listId={el.id}
                        title={el.title}
                        cards={el.cards}
                      />
                    );
                  })}
                  {provided.placeholder}
                  <AddButton list {...this.props} />
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    board: state.board,
    lists: state.lists.allList,
    cards: state.cards.cardList,
    form: state.lists.formOpen,
    isLoadingList: state.lists.isLoading,
    isLoadingCard: state.cards.isLoading,
  };
};
const mapDispatchToProps = {
  getList,
  sortOnDrag,
  createList,
  changeInputList,
  setActiveBoard,
  stopLoading,
  reorderCard,
  renameCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
