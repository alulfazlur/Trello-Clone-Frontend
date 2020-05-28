import CreditCardIcon from "@material-ui/icons/CreditCard";

import SubjectIcon from "@material-ui/icons/Subject";
import TocIcon from "@material-ui/icons/Toc";
import CloseIcon from "@material-ui/icons/Close";
import AccountCircle from "@material-ui/icons/AccountCircle";

// Add to Card
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import CheckBoxOutlinedIcon from "@material-ui/icons/CheckBoxOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";

// Actions
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";

import Menu from "@material-ui/core/Menu";
import MoveMenu from "./MoveCardMenu";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "768px",
    height: "600px",
    overflow: "scroll",
    flexGrow: 1,
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    padding: "15px 5px",
  },
}));

const CardModal = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMoveMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const moveMenu = "move-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={moveMenu}
      keepMounted
      transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      style={{ padding: "0px" }}
    >
      <MoveMenu
        cardId={props.cardId}
        listId={props.listId}
        text={props.text}
        order={props.order}
        description={props.description}
        members={props.members}
        listTitle={props.listTitle}
        boardList={props.boardList}
        boardTitle={props.boardTitle}
        changeInputBoard={props.changeInputBoard}
        chosenBoard={props.chosenBoard}
        chooseListId={props.chooseListId}
        chosenList={props.chosenList}
        chosenOrder={props.chosenOrder}
        chooseOrder={props.chooseOrder}
        moveCard={props.moveCard}
      />
    </Menu>
  );

  return (
    <div className="card-modal">
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm container>
            <Grid item xs={1} style={{ textAlign: "center" }}>
              <CreditCardIcon style={{ paddingTop: "5px", fontSize: "25px" }} />
            </Grid>
            <Grid item xs={10}>
              <Typography
                gutterBottom
                variant="h6"
                className={classes.title}
                style={{
                  color: "black",
                  fontWeight: "bolder",
                }}
              >
                {props.text}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle2"
                style={{
                  color: "gray",
                }}
              >
                in list{" "}
                <span style={{ textDecoration: "underline" }}>
                  {props.listTitle}
                </span>
              </Typography>
            </Grid>
            <Grid item xs={1} style={{ paddingLeft: "20px" }}>
              <IconButton onClick={props.handleClose}>
                <CloseIcon style={{ color: "black" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm
          container
          spacing={4}
          style={{ paddingLeft: "10px" }}
        >
          {/* Kiri */}
          <Grid item xs={9}>
            <Grid container style={{ paddingTop: "25px" }}>
              <Grid item xs={12} sm container>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <SubjectIcon style={{ fontSize: "25px" }} />
                </Grid>
                <Grid item xs={11}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.title}
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "16px",
                    }}
                  >
                    Description
                  </Typography>
                  <div
                    // onClick={this.openForm}
                    className="add-button-desc"
                  >
                    <span>Add a more detailed description...</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: "25px" }}>
              <Grid item xs={12} sm container>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <TocIcon style={{ fontSize: "25px" }} />
                </Grid>
                <Grid item xs={9}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    className={classes.title}
                    style={{
                      color: "black",
                      fontWeight: "bolder",
                      fontSize: "16px",
                    }}
                  >
                    Activity
                  </Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: "center" }}>
                  <Typography
                    // onClick={this.openForm}
                    className="details-button"
                  >
                    <span className="details-button-text">Show Details</span>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid container style={{ paddingTop: "25px" }}>
              <Grid item xs={12} sm container>
                <Grid item xs={1} style={{ textAlign: "center" }}>
                  <AccountCircle style={{ fontSize: "40px" }} />
                </Grid>
                <Grid item xs={11}>
                  <div
                    // onClick={this.openForm}
                    className="comment-box"
                    placeholder="Write a comment..."
                  >
                    <span className="comment-box-text">Write a comment...</span>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* Kanan */}
          <Grid item xs={3} className="right-modal">
            <h3>add to card</h3>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <PersonOutlineIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Members
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <LabelOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Labels
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <CheckBoxOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Checklist
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <AccessTimeOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Due Date
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <AttachFileIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Attachment
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <VideoLabelIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Cover
              </Typography>
            </IconButton>

            <h3 style={{ paddingTop: "15px" }}>power-ups</h3>
            <IconButton
              color="inherit"
              style={{ height: "35px", justifyContent: "center" }}
            >
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Get Power-Ups
              </Typography>
            </IconButton>

            <h3 style={{ paddingTop: "15px" }}>actions</h3>
            <IconButton
              color="inherit"
              style={{ height: "35px" }}
              aria-controls={moveMenu}
              onClick={handleMoveMenuOpen}
            >
              <ArrowForwardIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Move
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <FileCopyOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Copy
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <DashboardOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Make Template
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <VisibilityOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Watch
              </Typography>
            </IconButton>
            <hr style={{ width: "100%", opacity: "15%", marginTop: "15px" }} />
            <IconButton color="inherit" style={{ height: "35px" }}>
              <ArchiveOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Archive
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <ShareOutlinedIcon style={{ fontSize: "15px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Share
              </Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      {renderMenu}
    </div>
  );
};

export default CardModal;
