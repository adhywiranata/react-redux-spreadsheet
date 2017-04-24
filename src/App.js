import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import GridContainer from './Containers/GridContainer';
import ChartContainer from './Containers/ChartContainer';
import SettingsContainer from './Containers/SettingsContainer';
import AboutContainer from './Containers/AboutContainer';

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
                <Link to="/settings"><li>Settings</li></Link>
                <Link to="/about"><li>About</li></Link>
              </ul>
            </nav>
          </div>
          <div className="SheetContainer">
            <Route exact path="/" component={GridContainer} />
            <Route path="/charts" component={ChartContainer} />
            <Route path="/settings" component={SettingsContainer} />
            <Route path="/about" component={AboutContainer} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
