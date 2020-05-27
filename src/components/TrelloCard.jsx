import React, { useState, forwardRef } from "react";
import TextArea from "react-textarea-autosize";
import { Icon, Button, Card } from "@material-ui/core";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { Draggable } from "react-beautiful-dnd";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs";

import CardModal from "./CardModal"

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow:"scroll",
  }
}));

const Fade = forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const TrelloCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [isEditingCard, setIsEditingCard] = useState(false);

  const renderEditInput = () => {
    return (
      <div>
        <Card className="card-form">
          <TextArea
            className="add-form"
            name="newText"
            placeholder={props.text}
            autoFocus
            onBlur={closeEditing}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Card>
        <div className="action-form-group">
          <Button
            className="button-form"
            variant="contained"
            onMouseDown={handleFinishEditing}
          >
            Save
          </Button>
          <Icon className="close-form" onMouseDown={closeEditing}>
            close
          </Icon>
        </div>
      </div>
    );
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  const handleChange = (e) => {
    e.preventDefault();
    props.changeInputCard(e);
  };

  const handleFinishEditing = () => {
    setIsEditingCard(false);
    const text = props.propCard.newText;
    props.renameCard(props.cardId, props.listId, text);
  };
  const closeEditing = () => {
    setIsEditingCard(false);
  };

  const handleKeyPress = (event) => {
    const submit = handleFinishEditing;
    if (event.key === "Enter") {
      submit();
    }
  };

  return (
    <Draggable draggableId={String(props.cardId)} index={props.index}>
      {(provided) => (
        <div
          className="card-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditingCard ? (
            renderEditInput()
          ) : (
            <React.Fragment>
              <Card className="card" onClick={handleOpen}>
                <CardContent>
                  <IconButton onClick={() => setIsEditingCard(true)}>
                    <CreateOutlinedIcon
                      style={{ fontSize: 15, fontWeight: "bold" }}
                    />
                  </IconButton>
                  <Typography>{props.text}</Typography>
                </CardContent>
              </Card>
              <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <CardModal
                  cardId={props.id}
                  listId={props.listId}
                  text={props.text}
                  order={props.order}
                  description={props.description}
                  members={props.members}
                  listTitle={props.listTitle}
                  handleClose={handleClose}
                  />
                </Fade>
              </Modal>
            </React.Fragment>
          )}
        </div>
      )}
    </Draggable>
  );
};

export default TrelloCard;
