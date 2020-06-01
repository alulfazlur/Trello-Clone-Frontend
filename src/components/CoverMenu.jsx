import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: "304px",
    minHeight: "290px",
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    left: "934px",
    top: "180.4px",
    overflow: "visible",
  },
}));

const CoverMenu = (props) => {
  const classes = useStyles();

  const availableCover = [
    "#61bd4f",
    "#f2d600",
    "#ff9f1a",
    "#eb5a46",
    "#c377e0",
    "#0079bf",
  ];
  //   green, yellow, orange, red, purple, blue
  return (
    <div className="menu">
      <Paper className={classes.paper}>
        <Grid container>
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
                Cover
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={props.handleMenuClose}>
                <CloseIcon style={{ color: "gray", fontSize: "14px" }} />
              </IconButton>
            </Grid>
            <hr style={{ width: "90%", opacity: "15%" }} />
          </Grid>

          <Grid item xs={12} style={{ padding: "0 0 10px" }}>
            <IconButton
              color="inherit"
              style={{ height: "35px", transition: "none" }}
            >
              <h4>colors</h4>
            </IconButton>
          </Grid>

          <Grid container xs={12} style={{ paddingLeft: "5px" }}>
            {availableCover.map((el, index) => (
              <Grid
                container
                xs={4}
                className="label-list-modal"
                style={{ marginBottom: "10px" }}
              >
                <IconButton
                  key={index}
                  color="inherit"
                  style={{ height: "35px" }}
                  onClick={(id, listId, cover) =>
                    props.changeCardCover(props.cardId, props.listId, el)
                  }
                  onMouseDown={!props.cardCover ? props.handleMenuClose : false}
                >
                  <Grid item xs={10}>
                    <div
                      color="inherit"
                      className="label-list-menu"
                      style={{
                        height: "50px",
                        width: "75px",
                        backgroundColor: `${el}`,
                      }}
                    ></div>
                  </Grid>
                </IconButton>
              </Grid>
            ))}
          </Grid>

          <Grid container xs={12} style={{ padding: "0px 20px" }} className="right-modal-cover-remove">
          <IconButton
              color="inherit"
              style={{ height: "35px", justifyContent: "center" }}
              onClick={(id, listId, cover) =>
                props.changeCardCover(props.cardId, props.listId, "")
              }
              onMouseDown={props.cardCover ? props.handleMenuClose : false}
            >
              <Typography variant="body1" style={{ padding: "0 5px" }}>
              Remove Cover
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default CoverMenu;
