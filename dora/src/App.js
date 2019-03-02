import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MainAppBar from './MainAppBar'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffbb33',
      main: '#ffab00',
      dark: '#b27700',
      contrastText: '#000',
    },
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <div className="App">
        <MainAppBar/>
      </div>
    </MuiThemeProvider>
    );
  }
}

export default App;