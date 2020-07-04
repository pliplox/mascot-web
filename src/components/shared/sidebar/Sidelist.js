import React, { useState } from "react";

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  makeStyles,
  Divider,
} from "@material-ui/core/";
import {
  ExpandLess,
  ExpandMore,
  Group,
  StarBorder,
  Pets,
  Settings,
} from "@material-ui/icons/";

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
            <Pets />
          </ListItemIcon>
          <ListItemText primary="Alimentar" />
        </ListItem>
        <ListItem button onClick={handleCloseDrawer}>
          <ListItemIcon>
            <Group />
          </ListItemIcon>
          <ListItemText primary="Grupo" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Settings />
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
