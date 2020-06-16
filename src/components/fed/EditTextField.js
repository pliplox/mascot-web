import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  inputHour: {
    width: 40,
  },
}));

const EditTextField = (props) => {
  const classes = useStyles();
  const { edit, id, label, className } = props;
  return (
    <React.Fragment>
      {edit ? (
        <TextField size="small" name="hour" id={id} className={className} />
      ) : (
        label
      )}
    </React.Fragment>
  );
};

export default EditTextField;
