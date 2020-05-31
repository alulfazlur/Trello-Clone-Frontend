import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    width: "304px",
    minHeight: "200px",
    backgroundColor: "#f4f5f7",
    boxShadow: theme.shadows[5],
    borderRadius: "3px",
    left: "934px",
    top: "180.4px",
  },
}));

const MemberMenu = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    const cardId = props.cardId;
    if (event.target.checked) {
      props.addCardMember(cardId, event.target.value);
    } else {
      props.deleteCardMember(cardId, event.target.value);
    }
  };

  let cardMembers = props.activeBoard.memberIds;
    if (props.propCard.searchMembers && props.propCard.searchMembers.length > 2) {
      cardMembers = cardMembers.filter((item) => {
        if (
          item.username.toLowerCase().match(props.propCard.searchMembers.toLowerCase()) ||
          item.name.toLowerCase().match(props.propCard.searchMembers.toLowerCase())
        ) {
          return item;
        }
        return false;
      });
    }

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
                Members
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
              placeholder="Search members..."
              autoFocus
              name="searchMembers"
              onChange={props.changeInputCard}
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
              <h4>board members</h4>
            </IconButton>
          </Grid>

          {/* ===========================================MEMBERS===================================== */}

          {/* <Grid
            item
            xs={12}
            style={{ padding: "0 10px", marginBottom: "10px" }}
            className="member-list"
          >
            <IconButton color="inherit" style={{ height: "35px" }}>
              <AccountCircle style={{ fontSize: "32px" }} />
              <Typography variant="body1" style={{ padding: "0 5px" }}>
                Full Name (username)
              </Typography>
            </IconButton>
          </Grid> */}

          <Grid
            container
            xs={12}
            style={{ padding: "0 10px", marginBottom: "10px" }}
            className="member-list"
          >
            <IconButton
              color="inherit"
              style={{ height: "35px", paddingTop: "5px" }}
            >
              <Grid item xs={1}>
                <AccountCircle style={{ fontSize: "32px" }} />
              </Grid>
              <Grid item xs={10}>
                <Typography variant="body1" style={{ padding: "0 15px" }}>
                  {props.userBio.name} ({props.userBio.username})
                </Typography>
              </Grid>
              <Grid item xs={1}>
                {" "}
                <Checkbox
                    checked={ props.cardMembers.find((member) => member.username === props.userBio.username) ? true : false}
                  value={props.userBio.username}
                  onClick={handleChange}
                  syle={{ backgroundColor: "inherit" }}
                />
              </Grid>
            </IconButton>
          </Grid>

          {cardMembers.map((el, index) => (
            <Grid
              key={el.id}
              container
              xs={12}
              style={{ padding: "0 10px", marginBottom: "10px" }}
              className="member-list"
            >
              <IconButton
                color="inherit"
                style={{ height: "35px", paddingTop: "5px" }}
                // onClick={(cardId, username) => props.addCardMember(props.cardId, el.username)}
              >
                <Grid item xs={1}>
                  <AccountCircle style={{ fontSize: "32px" }} />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant="body1" style={{ padding: "0 15px" }}>
                    {el.name} ({el.username})
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <Checkbox
                    checked={ props.cardMembers.find((member) => member.username === el.username) ? true : false}
                    value={el.username}
                    onClick={handleChange}
                    syle={{ backgroundColor: "inherit" }}
                  />
                </Grid>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default MemberMenu;
