import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  List,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Paper,
  Divider,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {
  ExpandLess,
  ExpandMore,
  AddCircleOutlineOutlined,
  DeleteOutline,
} from "@material-ui/icons";
import NewGroupModal from "../../components/familyGroup/NewGroupModal";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    textAlign: "center",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
    color: theme.palette.text.secondary,
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  avatar: {
    width: 25,
    height: 25,
  },
  head: {
    marginBottom: theme.spacing(5),
  },
  acction: {
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
}));

const Group = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleAddNewGroup = () => {
    setOpenModal(!openModal);
  };

  const handleCloseNewGroup = (param) => {
    setOpenModal(param);
  };
  return (
    <Container>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h2" noWrap>
          Grupo
        </Typography>
      </Paper>
      <Paper className={classes.root}>
        <List component="div" aria-labelledby="nested-list-subheader">
          <ListItem className={classes.head}>
            <Typography
              variant="h5"
              className={classes.titleMyGroups}
              color="primary"
              noWrap
            >
              Mis Grupos
            </Typography>
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={handleAddNewGroup}>
                <AddCircleOutlineOutlined color="primary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <Avatar
                alt="Imagen ejemplo Grupo"
                src="https://images.squarespace-cdn.com/content/v1/5a6f6b879f8dce21e144cab7/1538154078189-IMNTJ0A19DUDXXDZPWS2/ke17ZwdGBToddI8pDm48kOa-G079lAeXntrOV5VW4v8UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8GRo6ASst2s6pLvNAu_PZdLssGnJEvj_EGoFCnhWmwtVXTwwMqlPFJ6NqQ2fhwJ_NQmaqkdkMwnQD7VeLKGWoLk/Screenshot+2018-09-28+11.57.21.png"
              />
            </ListItemIcon>
            <ListItemText primary="Grupo 1" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Avatar
                    className={classes.avatar}
                    alt="Imagen ejemplo miembro del grupo"
                    src="https://image.freepik.com/free-vector/man-profile-cartoon_18591-58484.jpg"
                  />
                </ListItemIcon>
                <ListItemText primary="Miembro 1" />
                <ListItemSecondaryAction>
                  <Checkbox edge="end" />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Collapse>

          <Divider />
          <List component="div" className={classes.acction}>
            <ListItem>
              <ListItemSecondaryAction>
                <IconButton edge="end">
                  <DeleteOutline />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </List>
      </Paper>

      <NewGroupModal
        handleCloseNewGroup={handleCloseNewGroup}
        openModal={openModal}
      />
    </Container>
  );
};

export default Group;
