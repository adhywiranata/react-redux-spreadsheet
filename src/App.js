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
            <nav>
              <ul>
                <Link to="/"><li>Sheets</li></Link>
                <Link to="/charts"><li>Charts</li></Link>
                <Link to="/charts"><li>Settings</li></Link>
                <Link to="/charts"><li>About</li></Link>
              </ul>
            </nav>
          </div>
          <div className="SheetContainer">
            <Route exact path="/" component={GridContainer} />
            <Router path="/charts" component={GridContainer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
