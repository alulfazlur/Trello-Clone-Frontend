import React from "react";
import TrelloCard from "./TrelloCard";
import AddButton from "./AddButton";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Droppable, Draggable } from "react-beautiful-dnd";

const TrelloList = (props) => {
  return (
    // <Draggable draggableId={String(props.listId)} index={props.index}>
    //   {(provided) => (
    <div
      className="list-divider"
      //       {...provided.draggableProps}
      //       {...provided.dragHandleProps}
      //       ref={provided.innerRef}
    >
      <Droppable droppableId={String(props.listId)} type="card">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="board-lists"
          >
            <div className="title-container">
              <div className="list-title">{props.title}</div>
              <IconButton>
                <MoreHorizIcon style={{ fontSize: 15, fontWeight: "bold" }} />
              </IconButton>
            </div>
            {props.cards.map((el, index) => (
              <TrelloCard
                className="trello-card"
                key={el.id}
                text={el.text}
                cardId={el.id}
                index={index}
                listId={props.listId}
              />
            ))}
            {provided.placeholder}
            <AddButton listId={props.listId} />
          </div>
        )}
      </Droppable>
    </div>
    //   )}
    // </Draggable>
  );
};

export default TrelloList;
