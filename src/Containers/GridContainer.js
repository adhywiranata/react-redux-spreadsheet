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
          [{ id: 1, val: '' }, { id: 2, val: '' }, { id: 3, val: '' }],
          [{ id: 4, val: '' }, { id: 5, val: '' }, { id: 6, val: '' }],
          [{ id: 7, val: '' }, { id: 8, val: '' }, { id: 9, val: '' }],
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
        { sheetData.cells.map((rowData, index) => (
          <div className="GridRow" key={index}>
            { rowData.map(cell => (
              <div className="GridCol" key={cell.id}>
                <input type="text" className="GridCell" value={cell.val} />
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
