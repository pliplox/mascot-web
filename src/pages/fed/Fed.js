import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core/";
import { TableFed } from "../../components/fed/";
import { useAuth } from "../../context/AuthContext";
import ButtonRedirec from "../../components/shared/UI/buttons/ButtonRedirec";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
  },
  link: {
    textDecoration: "none",
    textTransform: "none",
    color: "white",
  },
  btnContainer: {
    textAlign: "center",
  },
}));

const Fed = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const [redirect, setRedirect] = useState({});

  const userGroupL = user.groups.length;
  const userPetsL = user.pets.length;

  useEffect(() => {
    let obj = { path: "", text: "", msg: "", isVisible: false };
    if (userGroupL === 0) {
      console.log("useEffect Fed Grupo");
      obj = {
        path: "/grupos",
        text: "Ir a grupos",
        msg:
          "Ups!... No tienes o no perteneces a un grupo familiar. Ve a crear uno!",
        isVisible: true,
      };
      setRedirect(obj);
    } else if (userPetsL === 0) {
      console.log("useEffect Fed Pets");
      obj = {
        path: "/mascotas",
        text: "Ir a mascotas",
        msg: "Ups!... Debes tener a una mascota a quien alimentar.",
        isVisible: true,
      };
      setRedirect(obj);
    }
    setRedirect(obj);
  }, [userGroupL, userPetsL]);

  return (
    <Container className={classes.root}>
      <Grid className={classes.title} item xs={12}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h2">Alimentacion</Typography>
        </Paper>
      </Grid>

      {redirect.isVisible && (
        <ButtonRedirec
          severity="warning"
          size="small"
          path={redirect.path}
          text={redirect.text}
          msg={redirect.msg}
        />
      )}

      <Grid container spacing={4}>
        <Grid container item xs={12} sm={12} md={6}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h5">AM</Typography>
            </Paper>
          </Grid>
          <TableFed workingday="am" />
        </Grid>
        <Grid container item xs={12} sm={12} md={6}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <Typography variant="h5">PM</Typography>
            </Paper>
          </Grid>
          <TableFed workingday="pm" hidden={["lg", "xl", "md"]} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Fed;
