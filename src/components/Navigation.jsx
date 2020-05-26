import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Dashboard from "@material-ui/icons/Dashboard";
import { Link } from "react-router-dom";

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
};

const menuConfig = [
  {
    url: "/",
    icon: <Dashboard />,
    label: "Home"
  }
  // {
  //   url: "/dashboard",
  //   icon: <InboxIcon />,
  //   label: "Dashboard"
  // }
];

function Navigation({ classes, toggleNavigation, navState }) {
  return (
    <Drawer open={navState} onClose={toggleNavigation}>
      <div
        tabIndex={0}
        role="button"
        onClick={toggleNavigation}
        onKeyDown={toggleNavigation}
      >
        {menuConfig.map((item, i) => {
          return (
            <Link to={item.url} className={classes.link} key={i}>
              <ListItem button key={i}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            </Link>
          );
        })}
      </div>
    </Drawer>
  );
}
export default withStyles(styles)(Navigation);