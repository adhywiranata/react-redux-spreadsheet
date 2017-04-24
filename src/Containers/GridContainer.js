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
          { id: 'D', title: 'D' },
        ],
        cells: [
          [{ id: 'A1', val: '' }, { id: 'B1', val: '' }, { id: 'C1', val: '' }, { id: 'D1', val: '' }],
          [{ id: 'A2', val: '' }, { id: 'B2', val: '' }, { id: 'C2', val: '' }, { id: 'D2', val: '' }],
          [{ id: 'A3', val: '' }, { id: 'B3', val: '' }, { id: 'C3', val: '' }, { id: 'D3', val: '' }],
          [{ id: 'A4', val: '' }, { id: 'B4', val: '' }, { id: 'C4', val: '' }, { id: 'D4', val: '' }],
        ],
      },
      cellCursor: 'A1',
      colCursor: '',
      isEditing: false,
    }

    this.setCellValue = this.setCellValue.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.setCellCursor = this.setCellCursor.bind(this);
  }

  componentDidMount() {
    const localSheetData = JSON.parse(localStorage.getItem('sheetData'));
    if(localSheetData) {
      this.setState({
        sheetData: localSheetData,
      });
    }
    document.addEventListener("keydown", (e) => {
      const { sheetData, isEditing, colCursor } = this.state;
      if(!isEditing) {
        // in order to avoid mutability to cellCursor, we make a copy of it
        let cellCursor = this.state.cellCursor;
        cellCursor = cellCursor === '' ? 'A1' : cellCursor;

        // get cursor location
        const cellCursorCol = cellCursor.substring(0,1);
        const cellCursorRow = parseInt(cellCursor.substring(1));

        // get bottom-most cell id
        const cellRowsTailId = sheetData.cells[sheetData.cells.length - 1][0].id;
        const cellLastRow = parseInt(cellRowsTailId.substring(1));

        // get right-most cell id
        const headersTailId = sheetData.headers[sheetData.headers.length - 1].id;
        const headersLastCol = String.fromCharCode(headersTailId.charCodeAt(0));

        const moveNumber = (num, increment) => {
          if(increment === -1 && num === 1) {
            return num
          }
          if(increment === 1 && num === cellLastRow) {
            return num
          }
          return num + increment;
        }

        const moveAlphabet = (char, increment) => {
          if(increment === -1 && char === 'A') {
            return char;
          }
          if(increment === 1 && char === headersLastCol) {
            return char;
          }
          return String.fromCharCode(char.charCodeAt(0) + increment);
        };

        switch(e.keyCode) {
          // move left
          case 37: this.setCellCursor(moveAlphabet(cellCursorCol, -1) + cellCursorRow); break;
          // move up
          case 38: this.setCellCursor(cellCursorCol + moveNumber(cellCursorRow, -1)); break;
          // move right
          case 39: this.setCellCursor(moveAlphabet(cellCursorCol, 1) + cellCursorRow); break;
          // move down
          case 40: this.setCellCursor(cellCursorCol + moveNumber(cellCursorRow, 1)); break;
          // tab (move right)
          case 9: this.setCellCursor(moveAlphabet(cellCursorCol, 1) + cellCursorRow); break;
          default: return true
        }
      }
    });
  }

  componentDidUpdate() {
    localStorage.setItem('sheetData', JSON.stringify(this.state.sheetData));
  }

  setGridEditing(isEditing) {
    this.setState({ isEditing });
  }

  setCellValue(newCellVal, cellId) {
    const { sheetData } = this.state;
    const updateCellVal = cell => cell.id === cellId ? {...cell, val: newCellVal} : cell;
    const newCells = sheetData.cells.map(row => row.map(updateCellVal));
    this.setState({
      sheetData: { ...sheetData, cells: newCells },
    });
  }

  addRow() {
    const { sheetData } = this.state;
    const cellRowsTailId = sheetData.cells[sheetData.cells.length - 1][0].id;
    const cellLastRow = parseInt(cellRowsTailId.substring(1));
    const newRow = sheetData.headers.map(header => ({ id: header.id + (cellLastRow + 1), val: '' }) );
    this.setState({
      sheetData: { ...sheetData, cells: [ ...sheetData.cells, newRow ] },
    });
  }

  addColumn() {
    const { sheetData } = this.state;

    const headersTailId = sheetData.headers[sheetData.headers.length - 1].id;
    const headerNewId = String.fromCharCode(headersTailId.charCodeAt(0) + 1);
    const newHeader = {
      id: headerNewId,
      title: 'Untitled Column',
    };

    const newCells = sheetData.cells.map(row => {
      let rowNumber = row[0].id.substring(1);
      let newCell = { id: headerNewId + rowNumber, val: '' };
      return [ ...row, newCell ]
    });

    const newHeaders = [...sheetData.headers, newHeader];
    this.setState({
      sheetData: { ...sheetData, headers: newHeaders, cells: newCells },
    })
  }

  setCellCursor(cellDestination) {
    this.setState({ cellCursor: cellDestination, colCursor: '' });
  }

  setColCursor(colDestination) {
    this.setState({ colCursor: colDestination, cellCursor: '' });
  }

  setColTitle(colId, newColTitle) {
    const { sheetData } = this.state;
    const newHeaders = sheetData.headers.map(header => header.id === colId ? {...header, title: newColTitle} : header);
    this.setState({
      sheetData: {...sheetData, headers: newHeaders },
    });
  }

  render() {
    const { sheetData, cellCursor, colCursor } = this.state;
    return (
      <div className="GridContainer">
        <h3>{sheetData.sheetTitle}</h3>
        <div className="GridFloat">
          <button className="ActionBtn" onClick={this.addColumn}>+</button>
        </div>
        <div className="GridRow">
        { sheetData.headers.map(header => (
          <div className="GridCol" key={header.id}>
            { colCursor === header.id ? (
                <input
                  type="text"
                  value={header.title}
                  className="ColInput"
                  onFocus={(e) => { e.target.select(); this.setGridEditing(true); }}
                  onChange={(e) => this.setColTitle(header.id, e.target.value)}
                  onBlur={() => this.setGridEditing(false)}
                />
              ) : (
                <button className="ColBtn" onClick={() => this.setColCursor(header.id)}>{header.title}</button>
              )
            }
          </div>
        ))}
        </div>
        { sheetData.cells.map((rowData, index) => (
          <div className="GridRow" key={index}>
            { rowData.map(cell => {
              let gridSelected = cell.id === cellCursor ? 'CellSelected' : '';
              return (
              <div className={ 'GridCol GridCell ' + gridSelected } key={cell.id}>
                { cell.id === cellCursor ? (
                <input
                  type="text"
                  className="GridCellInput"
                  value={cell.val}
                  onChange={(e) => this.setCellValue(e.target.value, cell.id)}
                  onFocus={(e) => { e.target.select(); this.setGridEditing(true); }}
                  onBlur={() => this.setGridEditing(false)}
                />) : (
                  <button className="GridCellText" onClick={() => this.setCellCursor(cell.id)}>
                    {cell.val} &nbsp;
                  </button>)
                }
              </div>
            ); }) }
          </div>
        ))}
        <div className="GridFullRow">
          <button className="ActionBtn" onClick={this.addRow}>Add More Row..</button>
        </div>
      </div>
    );
  }
}

export default GridContainer;
