import React, { useState } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import StarBorder from "@material-ui/icons/StarBorder";
import SettingsIcon from "@material-ui/icons/Settings";
import PetsIcon from "@material-ui/icons/Pets";
import GroupIcon from "@material-ui/icons/Group";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  nested: {
    paddingLeft: theme.spacing(5),
  },
}));

const Sidelist = (props) => {
  const [open, setOpen] = useState(false);
  const { handleClose } = props;
  const classes = useStyles();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleCloseDrawer = () => {
    handleClose(false);
  };

  return (
    <div className={classes.list}>
      <List>
        <ListItem button onClick={handleCloseDrawer}>
          <ListItemIcon>
            <PetsIcon />
          </ListItemIcon>
          <ListItemText primary="Alimentar" />
        </ListItem>
        <ListItem button onClick={handleCloseDrawer}>
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Grupo" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Configuracion" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              onClick={handleCloseDrawer}
              className={classes.nested}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="TimeZone" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidelist;
