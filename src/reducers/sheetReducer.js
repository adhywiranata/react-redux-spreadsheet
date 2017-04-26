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

const sheetReducer = (state = initialState, action) => {
  return state;
}

export default sheetReducer;
