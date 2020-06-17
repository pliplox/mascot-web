import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//Container
import Container from "@material-ui/core/Container";
//Grid
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { TableFed } from "./";

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
    marginBottom: 10,
  },
}));

const Fed = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xl" className={classes.root}>
      <Grid className={classes.title} item xs={12}>
        <Paper elevation={2} className={classes.paper}>
          <h1>Alimentacion</h1>
        </Paper>
      </Grid>
      <Grid container spacing={4}>
        <Grid container item xs={12} sm={12} md={6}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <h4>AM</h4>
            </Paper>
          </Grid>
          <TableFed workingday="am" /> {/*params: Jornada (am) */}
        </Grid>
        <Grid container item xs={12} sm={12} md={6}>
          <Grid item xs={12}>
            <Paper elevation={0} className={classes.paper}>
              <h4>PM</h4>
            </Paper>
          </Grid>
          <TableFed workingday="pm" hidden={["lg", "xl", "md"]} />
          {/*params: Jornada (pm) */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Fed;
