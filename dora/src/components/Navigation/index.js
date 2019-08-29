import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
  },
  title: {
    flexGrow: 1,
    color: "#000"
  },
  link: {
    margin: theme.spacing(1),
    textDecoration: "none",
    color: "#000",
    "&:visited": {
      textDecoration: "none",
      color: "#000"
    }
  }
}));

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
  </div>
);

const NavigationNonAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dora - The Teaching Robot
          </Typography>
          <Link
            component="button"
            variant="body2"
            className={classes.link}
            to={ROUTES.LANDING}
          >
            Home Page
          </Link>
          <Link
            component="button"
            variant="body2"
            className={classes.link}
            to={ROUTES.SIGN_IN}
          >
            Sign In
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const NavigationAuth = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dora - The Teaching Robot
          </Typography>
          <Link
            component="button"
            variant="body2"
            className={classes.link}
            to={ROUTES.LANDING}
          >
            Home Page
          </Link>
          <Link
            component="button"
            variant="body2"
            className={classes.link}
            to={ROUTES.LESSONS}
          >
            Lessons
          </Link>
          <Link
            component="button"
            variant="body2"
            className={classes.link}
            to={ROUTES.SCENARIOS}
          >
            Scenarios
          </Link>
          <SignOutButton />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
