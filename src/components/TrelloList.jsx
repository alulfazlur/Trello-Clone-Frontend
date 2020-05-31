import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import AddButton from "./AddButton";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextArea from "react-textarea-autosize";
import { Card, Icon } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const TrelloList = (props) => {
  // console.warn("props,cards", props.cards)
  const [isEditing, setIsEditing] = useState(false);

  const renderEditInput = () => {
    return (
      <div>
        <Card className="card-form-title">
          <TextArea
            className="input-form"
            name="newTitle"
            placeholder={props.title}
            autoFocus
            onBlur={closeEditing}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Card>
      </div>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    props.changeInputList(e);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    props.renameList(props.listId, props.propList.newTitle);
  };
  const closeEditing = () => {
    setIsEditing(false);
  };

  const handleKeyPress = (event) => {
    const submit = handleFinishEditing;
    const close = closeEditing;
    if (event.key === "Escape") {
      close();
    }
    if (event.key === "Enter") {
      submit();
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={handleMenuClose}
        disabled
        style={{ fontSize: "14px", display: "flex", justifyContent: "center" }}
      >
        List Actions
      </MenuItem>
      <hr style={{ width: "90%", opacity: "15%" }} />
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Add Card...
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Copy List...
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Move List...
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Watch
      </MenuItem>
      <hr style={{ width: "90%", opacity: "15%" }} />
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Sort By...
      </MenuItem>
      <hr style={{ width: "90%", opacity: "15%" }} />
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Move All Cards in This List...
      </MenuItem>
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Archive All Cards in This List...
      </MenuItem>
      <hr style={{ width: "90%", opacity: "15%" }} />
      <MenuItem onClick={handleMenuClose} style={{ fontSize: "14px" }}>
        Archive This List...
      </MenuItem>
    </Menu>
  );

  return (
    <Draggable draggableId={props.code} index={props.index}>
      {(provided) => (
        <div
          className="list-divider"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={props.code} type="card">
            {(provided) => (
              <div className="board-lists">
                <div className="board-lists">
                  <div className="title-container">
                    {isEditing ? (
                      renderEditInput()
                    ) : (
                      <div
                        className="list-title"
                        onClick={() => setIsEditing(true)}
                      >
                        {props.title}
                      </div>
                    )}
                    <Icon
                      className="close-form"
                      style={{ fontSize: "20px" }}
                      onMouseDown={(listId) => props.deleteList(props.listId)}
                    >
                      delete
                    </Icon>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                    >
                      <MoreHorizIcon
                        style={{ fontSize: 15, fontWeight: "bold" }}
                      />
                    </IconButton>
                  </div>
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {props.cards.map((el, index) => (
                      <TrelloCard
                        className="trello-card"
                        key={el.id}
                        cardId={el.id}
                        listId={props.listId}
                        text={el.text}
                        order={el.order}
                        description={el.description}
                        members={el.members}
                        code={el.code}
                        label={el.label}
                        index={index}
                        renameCard={props.renameCard}
                        changeInputBoard={props.changeInputBoard}
                        changeInputCard={props.changeInputCard}
                        propCard={props.propCard}
                        listTitle={props.title}
                        boardList={props.boardList}
                        boardTitle={props.boardTitle}
                        chosenBoard={props.chosenBoard}
                        chooseListId={props.chooseListId}
                        chosenList={props.chosenList}
                        chosenOrder={props.chosenOrder}
                        chooseOrder={props.chooseOrder}
                        activeBoard={props.activeBoard}
                        moveCard={props.moveCard}
                        userBio={props.userBio}
                        deleteCard={props.deleteCard}
                        // handleCardMember={props.handleCardMember}

                        cardMembers={props.cardMembers}
                        getCardMember={props.getCardMember}
                        addCardMember={props.addCardMember}
                        deleteCardMember={props.deleteCardMember}
                        cardLabels={props.cardLabels}
                        getCardLabel={props.getCardLabel}
                        addCardLabel={props.addCardLabel}
                        deleteCardLabel={props.deleteCardLabel}
                      />
                    ))}
                    {provided.placeholder}
                    <AddButton listId={props.listId} />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
          {renderMenu}
        </div>
      )}
    </Draggable>
  );
};

export default TrelloList;
