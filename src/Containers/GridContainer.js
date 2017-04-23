import React, { Component } from 'react';
import './GridContainer.css';

class App extends Component {
  render() {
    return (
      <div className="GridContainer">
        <div className="GridRow">
          <div className="GridCol">
            <button className="ColBtn">A</button>
          </div>
          <div className="GridCol">
            <button className="ColBtn">B</button>
          </div>
          <div className="GridCol">
            <button className="ColBtn">C</button>
          </div>
          <div className="GridCol">
            <button className="ActionBtn">+</button>
          </div>
        </div>
        <div className="GridRow">
          <div className="GridCol">
            <input type="text" className="GridCell" />
          </div>
          <div className="GridCol">
            <input type="text" className="GridCell" />
          </div>
          <div className="GridCol">
            <input type="text" className="GridCell" />
          </div>
          <div className="GridCol">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
