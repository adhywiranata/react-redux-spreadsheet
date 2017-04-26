import { combineReducers } from 'redux';

import sheetReducer from './sheetReducer';
import gridCursorReducer from './gridCursorReducer';

const rootReducer = combineReducers({
  sheetData: sheetReducer,
  gridCursor: gridCursorReducer,
});

export default rootReducer;
