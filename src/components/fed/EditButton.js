import React from "react";

import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DoneOutlineRoundedIcon from "@material-ui/icons/DoneOutlineRounded";

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
          color="secondary"
        >
          <DoneOutlineRoundedIcon />
        </IconButton>
      ) : (
        <IconButton
          id={id}
          onClick={handleEdit}
          name="edit"
          size="small"
          color="secondary"
        >
          <EditOutlinedIcon />
        </IconButton>
      )}
    </React.Fragment>
  );
};

export default Editbutton;
