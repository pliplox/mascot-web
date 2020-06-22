import React from "react";

import { IconButton } from "@material-ui/core/";
import { DoneOutlineRounded, EditOutlined } from "@material-ui/icons/";

const Editbutton = (props) => {
  const { edit, handleEdit, id } = props;
  return (
    <React.Fragment>
      {edit ? (
        <IconButton
          id={id}
          onClick={handleEdit}
          name="done"
          size="small"
          color="primary"
        >
          <DoneOutlineRounded />
        </IconButton>
      ) : (
        <IconButton
          id={id}
          onClick={handleEdit}
          name="edit"
          size="small"
          color="secondary"
        >
          <EditOutlined />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default Editbutton;
