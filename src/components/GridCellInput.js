import React from  'react';

const GridCellInput = ({ cellVal, handleChange, handleFocus, handleBlur, cellClassName }) => (
  <input
    type="text"
    className={cellClassName}
    value={cellVal}
    onChange={(e) => handleChange(e.target.value)}
    onFocus={(e) => { e.target.select(); handleFocus(); }}
    onBlur={handleBlur}
  />
);

export default GridCellInput;
