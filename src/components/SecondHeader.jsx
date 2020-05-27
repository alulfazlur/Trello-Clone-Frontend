import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import Typography from "@material-ui/core/Typography";

import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import PublicOutlinedIcon from "@material-ui/icons/PublicOutlined";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
// import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 18),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: "5px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const BoardHeader = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };
  
  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreAnchorEl(event.currentTarget);
  // };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        style={{
          boxShadow: "none",
          position: "fixed",
          top: "50px",
          backgroundColor: "transparent",
          paddingLeft: "20px",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            style={{
              color: "white",
              fontWeight: "bolder",
              marginRight: "20px",
            }}
          >
            {props.boardTitle}
          </Typography>
          <IconButton color="inherit">
            <StarBorderOutlinedIcon />
          </IconButton>
          <span className="divider"></span>
          <IconButton color="inherit" style={{ height: "35px" }}>
            <Typography
              variant="body1"
              className={classes.title}
              style={{ padding: "0 5px" }}
            >
              Personal
            </Typography>
          </IconButton>
          <span className="divider"></span>
          <IconButton color="inherit" style={{ height: "35px" }}>
            <PublicOutlinedIcon style={{ fontSize: "15px" }} />
            <Typography
              variant="body1"
              className={classes.title}
              style={{ padding: "0 5px" }}
            >
              Public
            </Typography>
          </IconButton>
          <span className="divider"></span>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <IconButton color="inherit" style={{ height: "35px" }}>
            <Typography
              variant="body1"
              className={classes.title}
              style={{ padding: "0 5px" }}
            >
              Invite
            </Typography>
          </IconButton>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <FreeBreakfastIcon style={{ fontSize: "15px" }} />
              <Typography
                variant="body1"
                className={classes.title}
                style={{ padding: "0 5px" }}
              >
                Butler
              </Typography>
            </IconButton>
            <IconButton color="inherit" style={{ height: "35px" }}>
              <MoreHorizIcon style={{ fontSize: "15px" }} />
              <Typography
                variant="body1"
                className={classes.title}
                style={{ padding: "0 5px" }}
              >
                Show Menu
              </Typography>
            </IconButton>
          </div>
          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
};
export default BoardHeader;
