import React, { Component } from 'react';

import GridContainer from './Containers/GridContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>React Spreadsheet</h1>
        </div>
        <div className="SheetContainer">
          <GridContainer />
        </div>
      </div>
    );
  }
}

export default App;
