import React from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({ done, onChange }) => (
  <input
    type="checkbox"
    className="toggle"
    checked={done}
    onChange={onChange}
  />
);

CheckBox.propTypes = {
  done: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CheckBox;
