import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Menu from "@material-ui/core/Menu";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: "304px",
    height: "350px",
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    left: "934px",
    top: "180.4px",
  },
}));

const MoveMenu = (props) => {
  console.warn("propsCardId", props.cardId)
  const classes = useStyles();

  const [openBoard, setOpenBoard] = React.useState(false);
  const [openList, setOpenList] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const boardRef = React.useRef(null);
  const listRef = React.useRef(null);
  const orderRef = React.useRef(null);

  const handleToggleBoard = () => {
    setOpenBoard((prevOpenBoard) => !prevOpenBoard);
  };
  const handleToggleList = () => {
    setOpenList((prevOpenList) => !prevOpenList);
  };
  const handleToggleOrder = () => {
    setOpenOrder((prevOpenOrder) => !prevOpenOrder);
  };
  const handleClickBoard = (event) => {
    props.changeInputBoard(event);
    setOpenBoard(false);
  };
  const handleClickList = (event) => {
    props.chooseListId(event);
    setOpenList(false);
  };
  const handleClickOrder = (event) => {
    props.chooseOrder(event);
    setOpenOrder(false);
  };

  const handleClickButtonMove = () => {
    props.moveCard(props.cardId);
  };
  const handleClose = (event) => {
    if (boardRef.current && boardRef.current.contains(event.target)) {
      return;
    }
    if (listRef.current && listRef.current.contains(event.target)) {
      return;
    }
    if (orderRef.current && orderRef.current.contains(event.target)) {
      return;
    }

    setOpenBoard(false);
    setOpenList(false);
    setOpenOrder(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenBoard(false);
      setOpenList(false);
      setOpenOrder(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpenBoard = React.useRef(openBoard);
  const prevOpenList = React.useRef(openList);
  const prevOpenOrder = React.useRef(openOrder);
  React.useEffect(() => {
    if (prevOpenBoard.current === true && openBoard === false) {
      boardRef.current.focus();
    }
    if (prevOpenList.current === true && openList === false) {
      listRef.current.focus();
    }
    if (prevOpenOrder.current === true && openOrder === false) {
      orderRef.current.focus();
    }

    prevOpenBoard.current = openBoard;
    prevOpenList.current = openList;
    prevOpenOrder.current = openOrder;
  }, [openBoard, openList, openOrder]);

  return (
    <div className="move-menu">
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} container className="move-menu-title">
            <Grid item xs={10}>
              <Typography
                gutterBottom
                variant="body2"
                style={{
                  color: "gray",
                  textAlign: "center",
                  paddingLeft: "30px",
                  paddingTop: "10px",
                }}
                disabled
              >
                Move Card
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={props.handleClose}>
                <CloseIcon style={{ color: "gray", fontSize: "14px" }} />
              </IconButton>
            </Grid>
            <hr style={{ width: "100%", opacity: "15%" }} />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ padding: "0 10px" }}
            className="no-decoration"
          >
            <IconButton color="inherit" style={{ height: "35px" }}>
              <StarBorderOutlinedIcon style={{ fontSize: "15px" }} />
              <h4>suggested</h4>
            </IconButton>
          </Grid>

          <Grid item xs={12} style={{ padding: "0 10px" }}>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <ArrowForwardIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Doing
              </Typography>
            </IconButton>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              padding: "0 10px",
              marginBottom: "10px",
              textAlign: "center",
            }}
            className="no-decoration"
          >
            <span
              style={{
                textDecoration: "underline",
                fontSize: "12px",
                color: "gray",
              }}
            >
              Feedback
            </span>
          </Grid>

          <Grid
            item
            xs={12}
            style={{ padding: "0 10px" }}
            className="no-decoration"
          >
            <IconButton color="inherit" style={{ height: "35px" }}>
              <h4>select destination</h4>
            </IconButton>
          </Grid>

          <Grid item xs={12} style={{ padding: "0 10px" }}>
            <IconButton
              name="choseBoard"
              color="inherit"
              style={{ height: "50px" }}
              ref={boardRef}
              aria-controls={openBoard ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggleBoard}
            >
              <Typography variant="body1">
                <span style={{ fontSize: "12px", color: "gray" }}>Board</span>{" "}
                <br />
                Board
              </Typography>
            </IconButton>
          </Grid>

          <Grid item xs={12} style={{ padding: "0 10px" }} container>
            <Grid item xs={8}>
              <IconButton
                name="choseList"
                color="inherit"
                style={{ height: "50px" }}
                ref={listRef}
                aria-controls={openList ? "menu-list-grow-list" : undefined}
                aria-haspopup="true"
                onClick={handleToggleList}
              >
                <Typography variant="body1">
                  <span style={{ fontSize: "12px", color: "gray" }}>List</span>{" "}
                  <br />
                  List
                  {/* {props.listTitle} */}
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={4} style={{ paddingLeft: "5px" }}>
              <IconButton
                color="inherit"
                style={{ height: "50px" }}
                name="choseOrder"
                ref={orderRef}
                aria-controls={openOrder ? "menu-list-grow-order" : undefined}
                aria-haspopup="true"
                onClick={handleToggleOrder}
              >
                <Typography variant="body1">
                  <span style={{ fontSize: "12px", color: "gray" }}>
                    Position
                  </span>{" "}
                  <br />
                  {/* {props.order} */}
                  Order
                </Typography>
              </IconButton>
            </Grid>
          </Grid>

          <Grid
            item
            xs={5}
            style={{
              padding: "0 10px",
              marginTop: "10px",
            }}
            className="move-button"
          >
            <IconButton color="inherit" style={{ height: "35px" }} onClick={handleClickButtonMove}>
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Move
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      {/* ===========================================ORDER===================================== */}

      <Menu
        open={openOrder}
        anchorEl={orderRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={openOrder}
              id="menu-list-grow-list"
              onKeyDown={handleListKeyDown}
            >
              {props.chosenList.cards.length !== 0 ? (
                <React.Fragment>
                  {props.chosenList.cards.map((el, index) => (
                    <MenuItem
                      name="chosenOrder"
                      key={el.id}
                      onClick={handleClickOrder}
                      value={index}
                      style={{
                        width: "284px",
                        backgroundColor: "#0e0e0e",
                        color: "white",
                      }}
                    >
                      {index + 1}
                    </MenuItem>
                  ))}
                </React.Fragment>
              ) : (
                <MenuItem
                  name="chosenOrder"
                  onClick={handleClickOrder}
                  style={{
                    width: "284px",
                    backgroundColor: "#0e0e0e",
                    color: "white",
                  }}
                >
                  1
                </MenuItem>
              )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Menu>
      {/* ===========================================LIST===================================== */}
      <Menu
        open={openList}
        anchorEl={listRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={openList}
              id="menu-list-grow-list"
              onKeyDown={handleListKeyDown}
            >
              {props.chosenBoard.lists !== [] ? (
                <React.Fragment>
                  {props.chosenBoard.lists.map((el, index) => (
                    <MenuItem
                      name="chosenListId"
                      key={el.id}
                      onClick={handleClickList}
                      value={el.id}
                      style={{
                        width: "284px",
                        backgroundColor: "#0e0e0e",
                        color: "white",
                      }}
                    >
                      {el.title}
                    </MenuItem>
                  ))}
                </React.Fragment>
              ) : (
                <MenuItem
                  name="chosenBoardId"
                  onClick={handleClickList}
                  style={{
                    width: "284px",
                    backgroundColor: "#0e0e0e",
                    color: "white",
                  }}
                >
                  No List
                </MenuItem>
              )}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Menu>

      {/* ===========================================BOARD===================================== */}
      <Menu
        open={openBoard}
        anchorEl={boardRef.current}
        role={undefined}
        transition
        disablePortal
      >
        <Paper>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList
              autoFocusItem={openBoard}
              id="menu-list-grow"
              onKeyDown={handleListKeyDown}
            >
              {props.boardList.map((el, index) => (
                <MenuItem
                  name="chosenListId"
                  key={el.id}
                  onClick={handleClickBoard}
                  value={el.id}
                  style={{
                    width: "284px",
                    backgroundColor: "#0e0e0e",
                    color: "white",
                  }}
                >
                  {el.title}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Menu>
    </div>
  );
};

export default MoveMenu;
