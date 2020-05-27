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
  renameList,
} from "../store/actions/listsAction";
import { getActiveBoard } from "../store/actions/boardAction";
import {
  stopLoading,
  reorderCard,
  renameCard,
  changeInputCard,
} from "../store/actions/cardAction";

class Board extends Component {
  componentDidMount = async () => {
    const { boardId } = this.props.match.params;
    this.props.getActiveBoard(boardId);
    this.props.getList(boardId);
    // console.warn("checking props", this.props);
  };

  componentDidUpdate = async () => {
    const boardId = this.props.board.activeBoardId;
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
    const activeBoard = this.props.activeBoard
    return (
      <React.Fragment>
        <Header />
        <div style={{ paddingTop: "50px" }}>
          <BoardHeader boardTitle={activeBoard.title} />
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
                        propList={this.props.propList}
                        propCard={this.props.propCard}
                        renameList={(listId, title) =>
                          this.props.renameList(listId, title)
                        }
                        changeInputList={(e) => this.props.changeInputList(e)}
                        renameCard={(id, listId, text) =>
                          this.props.renameCard(id, listId, text)
                        }
                        changeInputCard={(e) => this.props.changeInputCard(e)}
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
    activeBoard: state.board.activeBoard,
    board: state.board,
    propCard: state.cards,
    propList: state.lists,
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
  renameList,
  changeInputList,
  getActiveBoard,
  stopLoading,
  reorderCard,
  renameCard,
  changeInputCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
