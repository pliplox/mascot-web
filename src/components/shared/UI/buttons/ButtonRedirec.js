import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Button, Typography } from "@material-ui/core/";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    textTransform: "none",
    fontWeight: "bold",
  },
  text: {
    color: theme.overrides.MuiTypography.colorTextSecondary,
  },
}));

const ButtonRedirec = (props) => {
  const classes = useStyles();
  const { severity, variant, size, path, text, msg } = props;
  return (
    <div className={classes.root}>
      <Alert
        severity={severity}
        action={
          <Button variant={variant} size={size || "medium"}>
            <Link to={path} className={classes.link}>
              <Typography className={classes.text}>{text}</Typography>
            </Link>
          </Button>
        }
      >
        <Typography>{msg}</Typography>
      </Alert>
    </div>
  );
};

ButtonRedirec.prototype = {
  severity: PropTypes.string.isRequired,
  size: PropTypes.string,
  path: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  msg: PropTypes.string.isRequired,
  variant: PropTypes.string,
};

export default ButtonRedirec;
