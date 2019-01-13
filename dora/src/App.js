import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lesson from './Lesson';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Lesson />
        </header>
      </div>
    );
  }
}

export default App;
