import React from "react";
import TrelloCard from "./TrelloCard";
import AddButton from "./AddButton";

import { Droppable, Draggable } from "react-beautiful-dnd";

const TrelloList = (props) => {
  // console.warn("props cards",props.cards)
  return (
    <Draggable draggableId={String(props.listID)} index={props.index}>
      {(provided) => (
        <div
          className="list-divider"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={String(props.listId)} type="card">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4>{props.title}</h4>
                {props.cards.map((el, index) => (
                  <TrelloCard
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
      )}
    </Draggable>
  );
};

export default TrelloList;
