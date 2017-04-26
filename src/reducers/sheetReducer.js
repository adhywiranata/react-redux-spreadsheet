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

const sheetReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_SHEET_DATA: return action.payload.sheetData;
    case RESET_SHEET_DATA: return initialState;
    case ADD_SHEET_ROW: return state;
    case ADD_SHEET_COLUMN: return state;
    case SET_COLUMN_TITLE: return state;
    case SET_CELL_VALUE: return setCellValue(state, action.payload);
    default: return state;
  }
}

export default sheetReducer;
