import { useState } from 'react';
import PropTypes from 'prop-types';

const Togglable = ({ buttonLabel, children }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <>
      <div style={hideWhenVisible}>
        <button className="viewBtn" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {children}
        <button onClick={toggleVisibility} style={{ marginBottom: '20px' }}>
          cancel
        </button>
      </div>
    </>
  );
};

export default Togglable;

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};
