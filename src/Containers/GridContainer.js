import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  loadSheetData,
  resetSheetData,
  setCellValue,
  setColumnValue,
  addSheetRow,
  addSheetColumn,
} from '../actions';

import './GridContainer.css';
import { GridCell, GridCellInput, ActionButton } from '../components';

class GridContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellCursor: 'A1',
      colCursor: '',
      isEditing: false,
    };

    this.setCellCursor = this.setCellCursor.bind(this);
    this.renderGridCell = this.renderGridCell.bind(this);
  }

  componentDidMount() {
    const localSheetData = JSON.parse(localStorage.getItem('sheetData'));
    if(localSheetData) {
      this.props.loadSheetData(localSheetData);
    }

    document.addEventListener("keydown", (e) => {
      const gridScollableWrapper = document.getElementById('GridScrollableWrapper');
      const { sheetData } = this.props;
      const { isEditing } = this.state;
      if (!isEditing) {
        // in order to avoid mutability to cellCursor, we make a copy of it
        let cellCursor = this.state.cellCursor;
        cellCursor = cellCursor === '' ? 'A1' : cellCursor;

        // get cursor location
        const cellCursorCol = cellCursor.substring(0, 1);
        const cellCursorRow = parseInt(cellCursor.substring(1), 10);

        // get bottom-most cell id
        const cellRowsTailId = sheetData.cells[sheetData.cells.length - 1][0].id;
        const cellLastRow = parseInt(cellRowsTailId.substring(1), 10);

        // get right-most cell id
        const headersTailId = sheetData.headers[sheetData.headers.length - 1].id;
        const headersLastCol = String.fromCharCode(headersTailId.charCodeAt(0));

        const moveNumber = (num, increment) => {
          if (increment === -1 && num === 1) {
            return num
          }
          if (increment === 1 && num === cellLastRow) {
            return num
          }
          return num + increment;
        }

        const moveAlphabet = (char, increment) => {
          if (increment === -1 && char === 'A') {
            return char;
          }
          if (increment === 1 && char === headersLastCol) {
            return char;
          }
          if (increment > 0) { gridScollableWrapper.scrollLeft += 100; }
          if (increment < 0) { gridScollableWrapper.scrollLeft -= 100; }

          return String.fromCharCode(char.charCodeAt(0) + increment);
        };

        switch (e.keyCode) {
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
          default: return true;
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

  renderGridColumn(header, colCursor) {
    if (colCursor === header.id) {
      return (
        <GridCellInput
          cellVal={header.title}
          handleChange={value => this.props.setColumnValue(value, header.id)}
          handleFocus={() => this.setGridEditing(true)}
          handleBlur={() => this.setGridEditing(false)}
          cellClassName={'ColInput'}
        />
      );
    }
    if (colCursor !== header.id) {
      return (
        <GridCell
          cellVal={header.title}
          gridType={'column'}
          handleClick={() => this.setColCursor(header.id)}
        />
      );
    }
  }

  renderGridHeaders(sheetData, colCursor) {
    return (
      <div className="GridRow">
        { sheetData.headers.map(header => (
          <div className="GridCol" key={header.id}>
            { this.renderGridColumn(header, colCursor) }
          </div>
        ))}
      </div>
    );
  }

  renderGridCell(cell, cellCursor) {
    if (cell.id === cellCursor) {
      return (
        <GridCellInput
          cellVal={cell.val}
          handleChange={value => this.props.setCellValue(value, cell.id)}
          handleFocus={() => this.setGridEditing(true)}
          handleBlur={() => this.setGridEditing(false)}
          cellClassName={'GridCellInput'}
        />
      );
    }
    if (cell.id !== cellCursor) {
      return (
        <GridCell
          cellVal={cell.val}
          gridType={'cell'}
          handleClick={() => this.setCellCursor(cell.id)}
        />
      );
    }
  }

  renderGridRow(sheetData, cellCursor) {
    return (
      <div>
        { sheetData.cells.map((rowData, index) => (
          <div className="GridRow" key={index}>
            { rowData.map((cell) => {
              const gridSelected = cell.id === cellCursor ? 'CellSelected' : '';
              return (
                <div className={'GridCol GridCell ' + gridSelected} key={cell.id}>
                  { this.renderGridCell(cell, cellCursor) }
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { sheetData } = this.props;
    const { cellCursor, colCursor } = this.state;

    return (
      <div className="GridContainer">
        <div className="SheetActionBar">
          <div className="SheetTitle"><h2>{sheetData.sheetTitle}</h2></div>
          <ActionButton handleClick={this.props.resetSheetData} label={'Reset Cells'} align={'right'} />
        </div>
        <div className="GridScrollableWrapper" id="GridScrollableWrapper">
          <div className="GridFloat">
            <ActionButton handleClick={this.props.addSheetColumn} label={'+'} align={'right'} />
          </div>
          { this.renderGridHeaders(sheetData, colCursor) }
          { this.renderGridRow(sheetData, cellCursor) }
        </div>
        <div style={{ marginTop: -40, position: 'relative' }}>
          <ActionButton handleClick={this.props.addSheetRow} label={'Add New Row'} align={'center'} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sheetData: state.sheetData,
});

const mapDispatchToProps = dispatch => ({
  loadSheetData: sheetData => dispatch(loadSheetData(sheetData)),
  resetSheetData: () => dispatch(resetSheetData()),
  addSheetRow: () => dispatch(addSheetRow()),
  addSheetColumn: () => dispatch(addSheetColumn()),
  setColumnValue: (newColVal, colId) => dispatch(setColumnValue(newColVal, colId)),
  setCellValue: (newCellVal, cellId) => dispatch(setCellValue(newCellVal, cellId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GridContainer);
