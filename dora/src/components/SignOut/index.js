import React from "react";

import { withFirebase } from "../Firebase";

import { Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(1),
    textDecoration: "none",
    color: "#000",
    "&:visited": {
      textDecoration: "none",
      color: "#000"
    },
    "&:hover": {
      textDecoration: "none",
      color: "#000",
      cursor: "pointer"
    }
  }
}));

const SignOutButton = ({ firebase }) => {
  const classes = useStyles();
  return (
    <Link type="button" className={classes.link} onClick={firebase.doSignOut}>
      Sign Out
    </Link>
  );
};

export default withFirebase(SignOutButton);
