import React, { Fragment, useState, useEffect } from "react";
//Material
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Switch,
  Hidden,
  CircularProgress,
} from "@material-ui/core";
//SnackBar
import { useSnackbar } from "notistack";
//Component
import { EditButton, EditTextField } from "./";
//Sample Data
import tableMock from "./table";
import userTest from "./data";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 10000,
  },
  inputHour: {
    width: 40,
  },
}));

const Tablefed = (props) => {
  const date = new Date();
  const d = date.getDay();
  const h = `${date.getHours()}:${date.getMinutes()}`;
  const [day, setDay] = useState(d);
  const [hour, setHour] = useState(h);
  const [tablero, setTablero] = useState(tableMock);
  const [open, setOpen] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { workingday, hidden } = props;
  const classes = useStyles();

  useEffect(() => {
    if (isEdit) {
      //TODO: manual registration.
    } else {
      tableMock.forEach((element) => {
        const today = tableMock.find((x) => x.id === element.id);
        const { id } = today;

        if (day === id) {
          today.disabledAm = false;
        }
      });
    }
    setTimeout(() => {
      setOpen(false);
    }, 350);
  }, [day, disabled, isEdit]);

  const handleFed = (event) => {
    const { name, id, checked } = event.currentTarget;
    const datenew = new Date();

    if (name === "am") {
      if (checked) {
        fed(datenew, id);
        enqueueSnackbar(
          "Registro agregado",
          { variant: "success" },
          { anchorOrigin: { vertical: "bottom", horizontal: "center" } }
        );
      }
    } else {
      if (checked) {
        fed(datenew, id);
        enqueueSnackbar(
          "Registro agregado",
          { variant: "success" },
          { anchorOrigin: { vertical: "bottom", horizontal: "center" } }
        );
      }
    }
  };

  const handleEdit = (event) => {
    const { id, name } = event.currentTarget;
    edit(id, name);
  };

  const fed = (datenew, id) => {
    setHour(`${datenew.getHours()}:${datenew.getMinutes()}`);
    tableMock.forEach((element) => {
      const today = tableMock.find((x) => x.id === element.id);

      const usersRandoms =
        userTest[Math.floor(Math.random() * userTest.length)];

      if (parseInt(id) === today.id) {
        today.disabledAm = true;
        today.placeHolderAm = hour;
        today.nameAm = usersRandoms;
        setDisabled(true);
      }
    });
  };

  const edit = (id, name) => {
    if (name === "edit") {
      tablero.forEach((element) => {
        const today = tableMock.find((x) => x.id === element.id);
        if (parseInt(id) === today.id) {
          today.edit = true; // icon
          today.disabledAm = true; // switch
        }
      });
      setIsEdit(true);
    } else {
      tablero.forEach((element) => {
        const today = tableMock.find((x) => x.id === element.id);
        if (parseInt(id) === today.id) {
          today.edit = false; // icon
          today.disabledAm = true; // switch
        }
      });
      enqueueSnackbar(
        "Registro editado",
        { variant: "success" },
        { anchorOrigin: { vertical: "bottom", horizontal: "center" } }
      );
      setIsEdit(false);
    }
  };

  return (
    <Fragment>
      {open ? (
        <div className={classes.root}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {tablero.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    <Hidden only={hidden}>{row.day}</Hidden>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Switch
                      edge="start"
                      size="small"
                      name={workingday}
                      disabled={row.disabledAm}
                      onChange={handleFed}
                      id={row.id.toString()}
                      color="primary"
                    ></Switch>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditTextField
                      edit={row.edit}
                      id={row.id.toString()}
                      label={row.placeHolderAm}
                      name="hour"
                      className={classes.inputHour}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditTextField
                      edit={row.edit}
                      id={row.id.toString()}
                      name="user"
                      label={row.nameAm}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditButton
                      id={row.id.toString()}
                      edit={row.edit}
                      handleEdit={handleEdit}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
};

export default Tablefed;
