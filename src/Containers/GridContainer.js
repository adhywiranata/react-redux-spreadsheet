import React, { Component } from 'react';
import './GridContainer.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetData: {
        headers: [
          { id: 1, title: 'A' },
          { id: 2, title: 'B' },
          { id: 3, title: 'C' },
        ],
        cells: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
      }
    }
  }
  render() {
    const { sheetData } = this.state;
    return (
      <div className="GridContainer">
        <div className="GridRow">
        { sheetData.headers.map(header => (
          <div className="GridCol" key={header.id}>
            <button className="ColBtn">{header.title}</button>
          </div>
        ))}
          <div className="GridCol">
            <button className="ActionBtn">+</button>
          </div>
        </div>
        { sheetData.cells.map(rowData => (
          <div className="GridRow">
            { rowData.map(cell => (
              <div className="GridCol">
                <input type="text" className="GridCell" />
              </div>
            )) }
            <div className="GridCol GridDisabled">
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
