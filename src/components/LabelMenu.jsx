import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: "304px",
    minHeight: "430px",
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    left: "934px",
    top: "180.4px",
    overflow:"visible"
  },
}));

const LabelMenu = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const cardId = props.cardId;
    if (event.target.checked) {
      props.addCardLabel(cardId, event.target.value);
    } else {
      props.deleteCardLabel(cardId, event.target.value);
    }
  };

  const availableLabel = ["#61bd4f", "#f2d600", "#ff9f1a", "#eb5a46", "#c377e0", "#0079bf"]
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
                Labels
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={props.handleMenuClose}>
                <CloseIcon style={{ color: "gray", fontSize: "14px" }} />
              </IconButton>
            </Grid>
            <hr style={{ width: "90%", opacity: "15%" }} />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ padding: "10px 0 10px 15px" }}
            className="member-search-container"
          >
            <InputBase
              className="member-search"
              placeholder="Search labels..."
              autoFocus
              name="searchMembers"
              // onChange={(e) => this.props.changeInputList(e)}
            />
          </Grid>

          <Grid
            item
            xs={12}
            style={{ padding: "0 0 10px" }}
            className="no-decoration"
          >
            <IconButton
              color="inherit"
              style={{ height: "35px", transition: "none" }}
            >
              <h4>labels</h4>
            </IconButton>
          </Grid>

          <Grid
            container
            xs={12}
            style={{ padding: "0 10px", marginBottom: "10px" }}
            className="label-list-modal"
          >
            {availableLabel.map((el, index) => (
            <IconButton
            key={index}
              color="inherit"
              style={{ height: "35px", paddingTop: "5px" }}
            >
              <Grid item xs={10} 
              style={{ marginBottom: "15px" }}
              >
              <div
                  color="inherit"
                  className="label-list-menu"
                  style={{ height: "35px", backgroundColor: `${el}` }}
                ></div>
              </Grid>
              <Grid item xs={1}>
              </Grid>
              <Grid item xs={1}>
                {" "}
                <Checkbox
                    checked={ props.cardLabels.find((labels) => labels.label === el) ? true : false}
                  value={el}
                  onClick={handleChange}
                  syle={{ backgroundColor: "inherit" }}
                />
              </Grid>
            </IconButton>
          ))}
          </Grid>

        </Grid>
      </Paper>
    </div>
  );
};

export default LabelMenu;
