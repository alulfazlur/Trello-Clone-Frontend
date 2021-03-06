import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

// import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
// import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: "304px",
    height: "252px",
    // height: "360px",
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    left: "934px",
    top: "180.4px",
  },
}));

const MoveMenu = (props) => {
  const classes = useStyles();

  const handleClickButtonMove = (e) => {
    props.moveCard(props.cardId);
  };

  const chosenBoard = props.boardList.filter((item) => {
    if (item.id !== props.activeBoard.id) {
      return item;
    } else {
      return false;
    }
  });

  const chosenList = props.chosenBoard.lists.filter((item) => {
    if (item.id !== props.listId) {
      return item;
    } else {
      return false;
    }
  });

  const chosenOrder = props.chosenList.cards.filter((item, index) => {
    if (index !== props.order) {
      return item;
    } else {
      return false;
    }
  });

  return (
    <div className="menu">
      <Paper className={classes.paper}>
        <Grid container className="menu-move">
          <Grid item xs={12} container className="menu-title">
            <Grid item xs={10}>
              <Typography
                gutterBottom
                variant="body2"
                style={{
                  color: "gray",
                  textAlign: "center",
                  paddingLeft: "35px",
                  paddingTop: "15px",
                }}
                disabled
              >
                Move Card
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={props.handleMenuClose}>
                <CloseIcon style={{ color: "gray", fontSize: "14px" }} />
              </IconButton>
            </Grid>
            <hr style={{ width: "90%", opacity: "15%" }} />
          </Grid>

          {/* <Grid
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
          </Grid> */}

          <Grid
            item
            xs={12}
            style={{ padding: "10px 0 10px" }}
            className="no-decoration"
          >
            <IconButton color="inherit" style={{ height: "35px" }}>
              <h4>select destination</h4>
            </IconButton>
          </Grid>

      {/* ===========================================BOARD===================================== */}
          <Grid item xs={12} style={{ padding: "0 10px" }}>
          <FormControl className="menu-form-control">
                <InputLabel
                  htmlFor="board-choose"
                  style={{ padding: "5px 0 0 6px" }}
                >
                  Board
                </InputLabel>
                <NativeSelect
                  defaultValue={props.boardTitle}
                  onChange={props.changeInputBoard}
                  inputProps={{
                    id: "board-choose",
                    name: "chosenBoardId",
                  }}
                  style={{ textDecoration: "none" }}
                  disableUnderline={true}
                >
                  <option aria-label="None" value={props.activeBoard.id} defaultValue>
                    {props.boardTitle}
                  </option>
                  {chosenBoard.map((el, index) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                </NativeSelect>
              </FormControl>
          </Grid>

      {/* ===========================================LIST===================================== */}
          <Grid item xs={12} style={{ padding: "10px 10px" }} container>
            <Grid item xs={8}>
              <FormControl className="menu-form-control">
                <InputLabel
                  htmlFor="order-choose"
                  style={{ padding: "5px 0 0 6px" }}
                >
                  List
                </InputLabel>
                <NativeSelect
                  defaultValue={props.listTitle}
                  onChange={props.chooseListId}
                  inputProps={{
                    id: "order-choose",
                    name: "chosenOrder",
                  }}
                  style={{ textDecoration: "none" }}
                  disableUnderline={true}
                >
                {props.chosenBoard.lists.length !== 0 ? (
                <React.Fragment>
                {props.chosenBoard.id === props.activeBoard.id ? 
                  (
                <React.Fragment>
                    <option aria-label="None" value={props.listId} defaultValue>
                    {props.listTitle}
                  </option>
                  {chosenList.map((el, index) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                    </React.Fragment>
                  ) : (
                    <option aria-label="None" value={props.chosenBoard.lists[0].id} defaultValue>
                    {props.chosenBoard.lists[0].title}
                  </option>
                  )}
                  </React.Fragment>
                  ) : (
                    <option aria-label="None" value="" defaultValue>
                   No Lists
                  </option>
                    )}
                </NativeSelect>
              </FormControl>
            </Grid>
      {/* ===========================================/LIST===================================== */}
      {/* ===========================================ORDER===================================== */}
            <Grid item xs={4} style={{ paddingLeft: "10px" }} >
            <FormControl className="menu-form-control">
                <InputLabel
                  htmlFor="order-choose"
                  style={{ padding: "5px 0 0 6px" }}
                >
                  List
                </InputLabel>
                <NativeSelect
                  defaultValue={props.order}
                  onChange={props.chooseOrder}
                  inputProps={{
                    id: "list-choose",
                    name: "chosenListId",
                  }}
                  style={{ textDecoration: "none" }}
                  disableUnderline={true}
                >
              {props.chosenList.cards.length !== 0 ? (
                <React.Fragment>
                  <option aria-label="None" value={props.order} defaultValue>
                    {parseInt(props.order) + 1}
                  </option>
                  {chosenOrder.map((el, index) => (
                    <option key={el.id} value={el.order}>
                      {el.order + 1}
                    </option>
                  ))}
                  <option aria-label="None" value={props.chosenList.cards.length} defaultValue>
                    {props.chosenList.cards.length + 1}
                  </option>
                  </React.Fragment>
                  ) : (
                    <option aria-label="None" value="0" defaultValue>
                   1
                  </option>
                    )}
                </NativeSelect>
              </FormControl>
            </Grid>
          </Grid>
      {/* ===========================================/ORDER===================================== */}

          <Grid
            item
            xs={5}
            style={{
              padding: "0 10px",
            }}
            className="move-button"
          >
            <IconButton
              color="inherit"
              onClick={handleClickButtonMove}
            >
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Move
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MoveMenu;
