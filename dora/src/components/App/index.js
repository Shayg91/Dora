import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import HomePage from "../Home";
import AccountPage from "../Account";
import ScenariosPage from "../Scenarios";
import LessonsPage from "../Lessons";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#b4ffff",
      main: "#80deea",
      dark: "#4bacb8",
      contrastText: "#000"
    },
    secondary: {
      light: "#e35183",
      main: "#ad1457",
      dark: "#78002e",
      contrastText: "#FFFFFF"
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <div>
        <Navigation />

        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.SCENARIOS} component={ScenariosPage} />
        <Route path={ROUTES.LESSONS} component={LessonsPage} />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default withAuthentication(App);
