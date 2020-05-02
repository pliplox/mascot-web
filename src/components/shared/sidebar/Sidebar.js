/*React */
import React, { useState, useEffect } from "react";
/*Component */
import { Sidelist } from "../sidebar";
/*Material UI */
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";

const useStyles = makeStyles((theme) => ({
  titleSidebar: {
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
  },
  containerTitle: {
    height: 56,
    [theme.breakpoints.up("sm")]: {
      height: 64,
    },
    backgroundColor: "#1f285a",
    paddingLeft: 20,
  },
  closeDrawe: {
    marginLeft: theme.spacing(6),
  },
}));
const Sidebar = (props) => {
  const classes = useStyles();

  const { handleDrawerClose, openDrawer } = props;
  const [open, setOpen] = useState(openDrawer);

  useEffect(() => {
    setOpen(openDrawer);
  }, [openDrawer]);

  const handleClose = () => {
    setOpen(!openDrawer);
    handleDrawerClose(false);
  };

  return (
    <Drawer open={open}>
      <div className={classes.containerTitle}>
        <Typography className={classes.titleSidebar} variant="h4" noWrap>
          SkollApp
          <IconButton
            className={classes.closeDrawe}
            edge="end"
            color="inherit"
            aria-label="close drawer"
            onClick={handleClose}
          >
            <MenuOpenIcon />
          </IconButton>
        </Typography>
        <Sidelist handleClose={handleClose} />
      </div>
    </Drawer>
  );
};

export default Sidebar;
