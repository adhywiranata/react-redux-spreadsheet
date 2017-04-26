import { combineReducers } from 'redux';

import sheetReducer from './sheetReducer';

const rootReducer = combineReducers({
  sheetData: sheetReducer,
});

export default rootReducer;
