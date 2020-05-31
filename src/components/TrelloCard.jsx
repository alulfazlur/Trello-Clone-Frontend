import React, { useState} from "react";
import TextArea from "react-textarea-autosize";
import { Icon, Button, Card } from "@material-ui/core";
import Fade from "@material-ui/core/Fade";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { Draggable } from "react-beautiful-dnd";
// import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Grid from "@material-ui/core/Grid";

// import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
// import { useSpring, animated } from "react-spring/web.cjs";

import CardModal from "./CardModal";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
}));

// const Fade = forwardRef(function Fade(props, ref) {
//   const { in: open, children, onEnter, onExited, ...other } = props;
//   const style = useSpring({
//     from: { opacity: 0 },
//     to: { opacity: open ? 1 : 0 },
//     onStart: () => {
//       if (open && onEnter) {
//         onEnter();
//       }
//     },
//     onRest: () => {
//       if (!open && onExited) {
//         onExited();
//       }
//     },
//   });

//   return (
//     <animated.div ref={ref} style={style} {...other}>
//       {children}
//     </animated.div>
//   );
// });

// Fade.propTypes = {
//   children: PropTypes.element,
//   in: PropTypes.bool.isRequired,
//   onEnter: PropTypes.func,
//   onExited: PropTypes.func,
// };

const TrelloCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = async () => {
    await props.getCardMember(props.cardId);
    await props.getCardLabel(props.cardId);
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
          <Icon className="close-form" style={{fontSize:"20px"}} onMouseDown={(cardId)=>props.deleteCard(props.cardId)}>
            delete
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
    <Draggable draggableId={props.code} index={props.index}>
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
                  <Grid item xs={12} sm container>
                    <Grid item xs={10}>
                      <Typography>{props.text}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <IconButton onMouseDown={() => setIsEditingCard(true)}>
                        <CreateOutlinedIcon
                          style={{ fontSize: 15, fontWeight: "bold" }}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} sm container>
                    {props.members.map((el, index) => (
                        <IconButton color="inherit" style={{ height: "35px" }}>
                          <PersonOutlineIcon style={{ fontSize: "15px" }} />
                          <Typography
                            variant="body1"
                            style={{ padding: "0 5px" }}
                          >
                            {el.memberId}
                          </Typography>
                        </IconButton>
                    ))}
                  </Grid> */}
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
                    cardId={props.cardId}
                    listId={props.listId}
                    text={props.text}
                    order={props.order}
                    description={props.description}
                    members={props.members}
                    label={props.label}
                    listTitle={props.listTitle}
                    boardList={props.boardList}
                    handleClose={handleClose}
                    boardTitle={props.boardTitle}
                        changeInputCard={props.changeInputCard}
                        propCard={props.propCard}
                    changeInputBoard={props.changeInputBoard}
                    chosenBoard={props.chosenBoard}
                    chooseListId={props.chooseListId}
                    chosenList={props.chosenList}
                    chosenOrder={props.chosenOrder}
                    chooseOrder={props.chooseOrder}
                    activeBoard={props.activeBoard}
                    moveCard={props.moveCard}
                    userBio={props.userBio}
                    // handleCardMember={props.handleCardMember}
                    cardMembers={props.cardMembers}
                    addCardMember={props.addCardMember}
                    deleteCardMember={props.deleteCardMember}
                    cardLabels={props.cardLabels}
                    addCardLabel={props.addCardLabel}
                    deleteCardLabel={props.deleteCardLabel}
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
