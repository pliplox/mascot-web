import React from "react";
import { TextField } from "@material-ui/core/";

const EditTextField = (props) => {
  const { edit, id, label, className, name } = props;
  return (
    <React.Fragment>
      {edit ? (
        <TextField role="textEdit" size="small" name={name} id={id} className={className} />
      ) : (
        label
      )}
    </React.Fragment>
  );
};

export default EditTextField;
