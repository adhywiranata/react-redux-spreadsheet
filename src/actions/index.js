import * as ActionTypes from './constants';

export const loadSheetData = (sheetData) => ({
  type: ActionTypes.LOAD_SHEET_DATA,
  payload: { sheetData },
})
