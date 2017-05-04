import React from 'react';

const styles = {
  button: {
    position: 'absolute',
    top: 0,
  },
};

const ActionButton = ({ handleClick, label, align }) => {
  const absoluteHorizontalAlignment = align === 'left' ? { left: 0 } : ( align === 'right' ? { right: 0 } : { left: 0, right: 0, margin: '0 auto', width: '30%' });
  const buttonStyle = { ...styles.button, ...absoluteHorizontalAlignment };
  return (
    <button
      className="ActionBtn"
      onClick={handleClick}
      style={buttonStyle}
    >
      { label }
    </button>
  );
};

export default ActionButton;
