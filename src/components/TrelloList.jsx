import React, { useState } from "react";
import TrelloCard from "./TrelloCard";
import AddButton from "./AddButton";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Droppable, Draggable } from "react-beautiful-dnd";
import TextArea from "react-textarea-autosize";
import { Card } from "@material-ui/core";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const TrelloList = (props) => {
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
  // const options = [
  //   'Show some love to Material-UI',
  //   'Show all notification content',
  //   'Hide sensitive notification content',
  //   'Hide all notification content',
  // ];
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
      <MenuItem onClick={handleMenuClose} disabled style={{fontSize:"14px",display:"flex" ,justifyContent:"center"}}>List Actions</MenuItem>
      <hr style={{width:"90%", opacity:"15%"}}/>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Add Card...</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Copy List...</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Move List...</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Watch</MenuItem>
      <hr style={{width:"90%", opacity:"15%"}}/>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Sort By...</MenuItem>
      <hr style={{width:"90%", opacity:"15%"}}/>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Move All Cards in This List...</MenuItem>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Archive All Cards in This List...</MenuItem>
      <hr style={{width:"90%", opacity:"15%"}}/>
      <MenuItem onClick={handleMenuClose} style={{fontSize:"14px"}}>Archive This List...</MenuItem>
    </Menu>
  );

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
          <div className="board-lists">
            <div className="title-container" >
              {isEditing ? (
                renderEditInput()
              ) : (
                <div className="list-title" onClick={() => setIsEditing(true)}>{props.title}</div>
              )}
              <IconButton
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              >
                <MoreHorizIcon style={{ fontSize: 15, fontWeight: "bold" }} />
              </IconButton>
            </div>
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="board-lists"
            >
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
                  index={index}
                  renameCard = {props.renameCard}
                  changeInputCard = {props.changeInputCard}
                  propCard = {props.propCard}
                  listTitle={props.title}
                />
              ))}
              {provided.placeholder}
              <AddButton listId={props.listId} />
            </div>
          </div>
        )}
      </Droppable>
      {renderMenu}

    </div>
    //   )}
    // </Draggable>
  );
};

export default TrelloList;
