import {
  LOAD_SHEET_DATA,
  RESET_SHEET_DATA,
  ADD_SHEET_ROW,
  ADD_SHEET_COLUMN,
  SET_COLUMN_TITLE,
  SET_CELL_VALUE,
} from '../actions/constants';

const initialState = {
  sheetTitle: 'Sheet One',
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
};

const setCellValue = (state, { newCellVal, cellId }) => {
  const updateCellVal = cell => cell.id === cellId ? {...cell, val: newCellVal} : cell;
  const newCells = state.cells.map(row => row.map(updateCellVal));
  return { ...state, cells: newCells };
}

const addSheetRow = (state) => {
  const cellRowsTailId = state.cells[state.cells.length - 1][0].id;
  const cellLastRow = parseInt(cellRowsTailId.substring(1), 10);
  const newRow = state.headers.map(header => ({ id: header.id + (cellLastRow + 1), val: '' }) );
  return { ...state, cells: [ ...state.cells, newRow ] };
};

const addSheetColumn = (state) => {
  const headersTailId = state.headers[state.headers.length - 1].id;
  const headerNewId = String.fromCharCode(headersTailId.charCodeAt(0) + 1);
  const newHeader = {
    id: headerNewId,
    title: 'Untitled Column',
  };

  const newCells = state.cells.map(row => {
    let rowNumber = row[0].id.substring(1);
    let newCell = { id: headerNewId + rowNumber, val: '' };
    return [ ...row, newCell ]
  });

  const newHeaders = [...state.headers, newHeader];
  return { ...state, headers: newHeaders, cells: newCells };
}

const sheetReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SHEET_DATA: return action.payload.sheetData;
    case RESET_SHEET_DATA: return initialState;
    case ADD_SHEET_ROW: return addSheetRow(state);
    case ADD_SHEET_COLUMN: return addSheetColumn(state);
    case SET_COLUMN_TITLE: return state;
    case SET_CELL_VALUE: return setCellValue(state, action.payload);
    default: return state;
  }
}

export default sheetReducer;
