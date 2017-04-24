import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import GridContainer from './Containers/GridContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="Header">
            <h1>React Spreadsheet</h1>
          </div>
          <div className="SheetContainer">
            <Route exact path="/" component={GridContainer}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
