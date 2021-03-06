import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { INITIAL_STATE_SIGNUP } from "../../constants/initializers";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUpPage = () => (
  <div>
    <SignUpForm classes={useStyles()} />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE_SIGNUP };
    console.log(this.props.firebase);
  }

  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    console.log(this.props.firebase);

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user
        this.props.firebase.db
          .collection("users")
          .add({
            username,
            email
          })
          .then(docRef => {
            console.log("Added new user: " + docRef.id);
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE_SIGNUP });
        this.props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={this.props.classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="Full Name"
                  value={username}
                  onChange={this.onChange}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordOne"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={passwordOne}
                  onChange={this.onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordTwo"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={passwordTwo}
                  onChange={this.onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              disabled={isInvalid}
              onClick={this.onSubmit}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </div>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <Grid container>
    <Grid item>
      <Link variant="body2" to={ROUTES.SIGN_UP}>
        {"Don't have an account? Sign Up"}
      </Link>
    </Grid>
  </Grid>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
