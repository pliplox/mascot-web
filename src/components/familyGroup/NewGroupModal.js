import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #380250",
    padding: theme.spacing(2, 4, 3),
    maxWidth: "100vw",
    maxHeight: "100%",
    position: "fixed",
    top: "30%",
    left: "25%",
  },
}));
const NewGroupModal = (props) => {
  const classes = useStyles();

  const { openModal, handleCloseNewGroup } = props;
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(!openModal);
    handleCloseNewGroup(false);
  };

  const body = (
    <div className={classes.paper}>
      <Typography variant="h4" noWrap>Crear grupo</Typography>
      <p id="simple-modal-description">
        TODO: coming soon... (ESC to close modal)
      </p>
      <NewGroupModal />
    </div>
  );
  return (
    <Modal
      open={open || false}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      disableBackdropClick={true}      
    >
      {body}
    </Modal>
  );
};

export default NewGroupModal;
