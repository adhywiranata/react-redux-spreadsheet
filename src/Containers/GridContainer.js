import React, { Component } from 'react';
import './GridContainer.css';

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetData: {
        sheetTitle: 'just another',
        headers: [
          { id: 'A', title: 'A' },
          { id: 'B', title: 'B' },
          { id: 'C', title: 'C' },
        ],
        cells: [
          [{ id: 'A1', val: '' }, { id: 'B1', val: '' }, { id: 'C1', val: '' }],
          [{ id: 'A2', val: '' }, { id: 'B2', val: '' }, { id: 'C2', val: '' }],
          [{ id: 'A3', val: '' }, { id: 'B3', val: '' }, { id: 'C3', val: '' }],
        ],
      }
    }

    this.setCellValue = this.setCellValue.bind(this);
  }

  setCellValue(newCellVal, cellId) {
    const { sheetData } = this.state;
    const updateCellVal = cell => cell.id === cellId ? {...cell, val: newCellVal} : cell;
    const newCells = sheetData.cells.map(row => row.map(updateCellVal));
    const newSheetData = { ...sheetData, cells: newCells };
    this.setState({
      sheetData: newSheetData
    });
  }

  render() {
    const { sheetData } = this.state;
    return (
      <div className="GridContainer">
        <h3>{sheetData.sheetTitle}</h3>
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
                <input
                  type="text"
                  className="GridCell"
                  value={cell.val}
                  onChange={(e) => this.setCellValue(e.target.value, cell.id)}
                />
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

export default GridContainer;
