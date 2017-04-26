import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadSheetData, setCellValue, setColumnValue, addSheetRow, addSheetColumn } from '../actions';
import './GridContainer.css';

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellCursor: 'A1',
      colCursor: '',
      isEditing: false,
    }

    this.setCellCursor = this.setCellCursor.bind(this);
  }

  componentDidMount() {
    const localSheetData = JSON.parse(localStorage.getItem('sheetData'));
    if(localSheetData) {
      this.props.loadSheetData(localSheetData);
    }

    document.addEventListener("keydown", (e) => {
      let gridScollableWrapper = document.getElementById('GridScrollableWrapper');
      // console.log(gridScollableWrapper.scrollLeft);
      const { sheetData } = this.props;
      const { isEditing } = this.state; 
      if(!isEditing) {
        // in order to avoid mutability to cellCursor, we make a copy of it
        let cellCursor = this.state.cellCursor;
        cellCursor = cellCursor === '' ? 'A1' : cellCursor;

        // get cursor location
        const cellCursorCol = cellCursor.substring(0,1);
        const cellCursorRow = parseInt(cellCursor.substring(1), 10);

        // get bottom-most cell id
        const cellRowsTailId = sheetData.cells[sheetData.cells.length - 1][0].id;
        const cellLastRow = parseInt(cellRowsTailId.substring(1), 10);

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
          if(increment > 0) { gridScollableWrapper.scrollLeft += 100; }
          if(increment < 0) { gridScollableWrapper.scrollLeft -= 100; }

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

  componentWillReceiveProps(nextProps) {
    localStorage.setItem('sheetData', JSON.stringify(nextProps.sheetData));
  }

  setGridEditing(isEditing) {
    this.setState({ isEditing });
  }

  setCellCursor(cellDestination) {
    this.setState({ cellCursor: cellDestination, colCursor: '' });
  }

  setColCursor(colDestination) {
    this.setState({ colCursor: colDestination, cellCursor: '' });
  }

  resetSheet() {
    this.setState({ sheetData: '' });
  }

  render() {
    const { sheetData } = this.props;
    const { cellCursor, colCursor } = this.state;

    return (
      <div className="GridContainer">
        <div className="SheetActionBar">
          <div className="SheetTitle"><h2>{sheetData.sheetTitle}</h2></div>
          <button
            className="ActionBtn"
            onClick={() => this.resetSheet() }
            style={{position: 'absolute', right: 0, top: 0 }}
          >
            Reset Cells
          </button>
        </div>
        <div className="GridScrollableWrapper" id="GridScrollableWrapper">
          <div className="GridFloat">
            <button className="ActionBtn" onClick={this.props.addSheetColumn}>+</button>
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
                    onChange={(e) => this.props.setColumnValue(e.target.value, header.id)}
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
                    onChange={(e) => this.props.setCellValue(e.target.value, cell.id)}
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
        </div>
        <div style={{ marginTop: -40 }}>
          <button className="ActionBtn" onClick={this.props.addSheetRow}>Add New Row</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sheetData: state.sheetData,
});

const mapDispatchToProps = dispatch => ({
  loadSheetData: (sheetData) => dispatch(loadSheetData(sheetData)),
  addSheetRow: () => dispatch(addSheetRow()),
  addSheetColumn: () => dispatch(addSheetColumn()),
  setColumnValue: (newColVal, colId) => dispatch(setColumnValue(newColVal, colId)),
  setCellValue: (newCellVal, cellId) => dispatch(setCellValue(newCellVal, cellId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
