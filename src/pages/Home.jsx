import React, { Component } from "react";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router-dom";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import TrelloList from "../components/TrelloList";
import AddButton from "../components/AddButton";

import { sortOnDrag } from "../store/actions/listsAction";

class Home extends Component {
  componentDidMount = () => {
    console.warn("checking props", this.props);
  };

  onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
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
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <h2>My Board</h2>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((el, index) => {
                const list = lists[el.id];
                {/* if (list) { */}
                  {/* const listCards = list.cards.map(cardID => cards[cardID]); */}
                return (
                  <TrelloList
                    key={el.id}
                    index={index}
                    listId={el.id}
                    title={el.title}
                    cards={el.cards}
                  />
                );
              {/* } */}
              })
              }{provided.placeholder}
              <AddButton list />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    lists: state.lists,
    form: state.lists.formOpen,
  };
};
const mapDispatchToProps = {
  sortOnDrag,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
