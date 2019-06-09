import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import MainAppBar from "./MainAppBar";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#8eacbb",
      main: "#607d8b",
      dark: "#34515e",
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

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <MainAppBar />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
