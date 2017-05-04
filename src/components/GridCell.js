import React from 'react';

const styles = {
  cell: {
    textAlign: 'left',
    color: '#666',
    backgroundColor: '#FEFEFE',
    width: '100%',
    height: '100%',
    padding: 5,
    fontSize: '1em',
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  },
  column: {
    textAlign: 'center',
    color: '#FFF',
    backgroundColor: '#333333',
    width: '100%',
    height: '100%',
    padding: 5,
    fontSize: '1em',
    border: 0,
    outline: 'none',
    cursor: 'pointer',
  }
};

const GridCell = ({ cellVal, handleClick, gridType }) => (
  <button onClick={handleClick} style={ gridType === 'cell' ? styles.cell : styles.column }>
    {cellVal} &nbsp;
  </button>
);

export default GridCell;
