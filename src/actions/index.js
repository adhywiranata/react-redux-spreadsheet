import * as ActionTypes from './constants';

export const loadSheetData = (sheetData) => ({
  type: ActionTypes.LOAD_SHEET_DATA,
  payload: { sheetData },
});

export const setCellValue = (newCellVal, cellId) => ({
  type: ActionTypes.SET_CELL_VALUE,
  payload: { newCellVal, cellId },
});

export const resetSheetData = () => ({
  type: ActionTypes.RESET_SHEET_DATA,
})
