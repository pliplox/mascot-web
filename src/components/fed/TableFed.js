import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
//SnackBar
import { useSnackbar } from "notistack";
//TABLE
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
//Switch
import Switch from "@material-ui/core/Switch";
//Hidden
import Hidden from "@material-ui/core/Hidden";
//Loading
import CircularProgress from "@material-ui/core/CircularProgress";
//Personalizados
import { EditButton, EditTextField } from "./";

//DATOS EJEMPLO
import tableroMock from "./table";
import usuariosTest from "./data";

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
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { workingday, hidden } = props;
  const [tablero, setTablero] = useState(tableroMock);
  const [open, setOpen] = useState(true);

  const date = new Date();
  const d = date.getDay();
  const h = `${date.getHours()}:${date.getMinutes()}`;

  const [hour, setHour] = useState(h);
  const [day, setDay] = useState(d);

  const [disabled, setDisabled] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (isEdit) {
      //TODO: Campturar registro ingresado a mano.
    } else {
      tableroMock.forEach((element) => {
        const today = tableroMock.find((x) => x.id === element.id);
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
      }
    }
  };

  const handleEdit = (event) => {
    const { id, name } = event.currentTarget;
    edit(id, name);
  };

  const fed = (datenew, id) => {
    setHour(`${datenew.getHours()}:${datenew.getMinutes()}`);
    tableroMock.forEach((element) => {
      const today = tableroMock.find((x) => x.id === element.id);

      const usersRandoms =
        usuariosTest[Math.floor(Math.random() * usuariosTest.length)];

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
        const today = tableroMock.find((x) => x.id === element.id);
        if (parseInt(id) === today.id) {
          today.edit = true; // icono
          today.disabledAm = true; // switch
          today.readOnly = false; // text
        }
      });
      setIsEdit(true);
    } else {
      tablero.forEach((element) => {
        const today = tableroMock.find((x) => x.id === element.id);
        if (parseInt(id) === today.id) {
          today.edit = false; // icono
          today.disabledAm = true; // switch
          today.readOnly = true; // text
        }
      });
      enqueueSnackbar(
        "Registro editado",
        { variant: "success" },
        { anchorOrigin: { vertical: "bottom", horizontal: "center" } }
      );

      /*       setTimeout(() => {
        closeSnackbar(key);
      }, 1500); */
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
                    ></Switch>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditTextField
                      edit={row.edit}
                      id={row.id.toString()}
                      label={row.placeHolderAm}
                      className={classes.inputHour}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <EditTextField
                      edit={row.edit}
                      id={row.id.toString()}
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