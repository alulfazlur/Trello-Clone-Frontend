import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
  reorderList,
  stopLoadingList,
  chooseListId,
  getChosenList,
  deleteList
} from "../store/actions/listsAction";
import {
  getActiveBoard,
  setActiveBoard,
  getBoardList,
  changeInputBoard,
  getChosenBoard,
  stopLoadingBoard
} from "../store/actions/boardAction";
import {
  stopLoading,
  reorderCard,
  renameCard,
  changeInputCard,
  moveCard,
  chooseOrder,
  // handleCardMember
  addCardMember,
  deleteCardMember,
  getCardMember,
  addCardLabel,
  deleteCardLabel,
  getCardLabel,
  deleteCard
} from "../store/actions/cardAction";
import {
  getBio, doLogOut
} from "../store/actions/userAction";
class Board extends Component {
  componentDidMount = async () => {
    const { boardId } = this.props.match.params;
    this.props.getBio();
    this.props.getList(boardId);
    this.props.getActiveBoard(boardId);
    this.props.setActiveBoard(boardId);
    this.props.getBoardList();
    this.props.getChosenBoard();
    this.props.getChosenList()

    // console.warn("checking props", this.props);
  };

  componentDidUpdate = async () => {
    const { boardId } = this.props.match.params;
    if (this.props.isLoadingList) {
      this.props.getList(boardId);
    this.props.getChosenList()
    }
    if (this.props.isLoadingCard) {
      await this.props.getList(boardId);
      this.props.stopLoading();
    }
    if (this.props.isLoadingBoard) {
      this.props.getBoardList();
      this.props.getChosenBoard();
      await this.props.stopLoadingBoard();
    }
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (type === "card") {
      this.props.reorderCard(
        draggableId,
        destination.droppableId,
        destination.index
      );
    }
    if (type === "list") {
      this.props.reorderList(
        draggableId,
        parseInt(destination.droppableId),
        destination.index
      );
    }
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
    const activeBoard = this.props.activeBoard;

    // if (this.props.isLoadingBoard || this.props.isLoadingList || this.props.isLoadingCard) {
    // return (
    //   <div style={{backgroundColor: "#5aac44", minHeight: "100vh"}}>
    //   <Header background={"rgba(0,0,0,.15)"}
    //     doLogOut={() => this.props.doLogOut()}
    //   />
    //   <div style={{ paddingTop: "50px" }}>
    //     <BoardHeader boardTitle={activeBoard.title} />
    //   </div>
    //   </div>
    // )
    // } else {
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
    return (
      <div style={{backgroundColor: "#5aac44", minHeight: "100vh"}}>
        <Header background={"rgba(0,0,0,.15)"}
          doLogOut={() => this.props.doLogOut()}
        />
        <div style={{ paddingTop: "50px" }}>
          <BoardHeader boardTitle={activeBoard.title} />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <div style={{ marginTop: "50px" }}>
            <Droppable
              droppableId={String(activeBoard.id)}
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
                        code={el.code}
                        propList={this.props.propList}
                        propCard={this.props.propCard}
                        renameList={(listId, title) =>
                          this.props.renameList(listId, title)
                        }
                        changeInputList={(e) => this.props.changeInputList(e)}
                        renameCard={(id, listId, text) =>
                          this.props.renameCard(id, listId, text)
                        }
                        moveCard={(id) =>
                          this.props.moveCard(id)
                        }
                        changeInputCard={(e) => this.props.changeInputCard(e)}
                        boardList={this.props.boardList}
                        activeBoard={this.props.activeBoard}
                        boardTitle={this.props.activeBoard.title}
                        changeInputBoard={(e) => this.props.changeInputBoard(e)}
                        chosenBoard={this.props.chosenBoard}
                        chooseListId={(e) => this.props.chooseListId(e)}
                        chooseOrder={(e) => this.props.chooseOrder(e)}
                        chosenList={this.props.chosenList}
                        chosenOrder={this.props.chosenOrder}
                        userBio={this.props.userBio}
                        deleteCard={(id) => this.props.deleteCard(id)}
                        deleteList={(id) => this.props.deleteList(id)}

                        // handleCardMember={(cardId, e) => this.props.handleCardMember(cardId, e)}
                        cardMembers={this.props.cardMembers}
                        getCardMember={(cardId) => this.props.getCardMember(cardId)}
                        addCardMember={(cardId, username) => this.props.addCardMember(cardId, username)}
                        deleteCardMember={(cardId, username) => this.props.deleteCardMember(cardId, username)}
                        
                        cardLabels={this.props.cardLabels}
                        getCardLabel={(cardId) => this.props.getCardLabel(cardId)}
                        addCardLabel={(cardId, label) => this.props.addCardLabel(cardId, label)}
                        deleteCardLabel={(cardId, label) => this.props.deleteCardLabel(cardId, label)}
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
      </div>
    );
  }
}
}
const mapStateToProps = (state) => {
  return {
    activeBoard: state.board.activeBoard,
    chosenBoard: state.board.chosenBoard,
    chosenList : state.lists.chosenList,
    chosenOrder : state.cards.chosenOrder,
    boardList: state.board.boardList,
    board: state.board,
    propCard: state.cards,
    propList: state.lists,
    lists: state.lists.allList,
    cards: state.cards.cardList,
    form: state.lists.formOpen,
    isLoadingBoard: state.board.isLoading,
    isLoadingList: state.lists.isLoading,
    isLoadingCard: state.cards.isLoading,
    cardMembers : state.cards.cardMembers,
    cardLabels : state.cards.cardLabels,
    userBio : state.user
  };
};
const mapDispatchToProps = {
  getList,
  sortOnDrag,
  createList,
  renameList,
  changeInputList,
  getActiveBoard,
  setActiveBoard,
  stopLoading,
  reorderCard,
  renameCard,
  changeInputCard,
  reorderList,
  stopLoadingList,
  getBoardList,
  changeInputBoard,
  getChosenBoard,
  stopLoadingBoard,
  chooseListId,
  getChosenList,
  moveCard,
  chooseOrder,
  // handleCardMember
  addCardMember,
  deleteCardMember,
  getCardMember,
  addCardLabel,
  deleteCardLabel,
  getCardLabel,
  getBio,
  doLogOut,
  deleteCard,
  deleteList
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
