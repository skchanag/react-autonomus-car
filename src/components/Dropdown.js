import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import ResultContext from '../store/ResultContext';
import classes from './Dropdown.module.css';

function Dropdown(props) {
  const { details } = props;
  const resultCtx = useContext(ResultContext);

  const selectOnChange = (val) => {
    // Reset the car position
    resultCtx.setStatus('');
    resultCtx.setPosition(0);
    resultCtx.setLane('b');
    resultCtx.setErrorMessage('');
    // Update current simulation
    resultCtx.setCurrentSimulation(val);
  };

  const renderDropdownData = () => details.map((item) => (
    <option value={item.api} key={item.api} data-testid="option">{item.text}</option>
  ));

  return (
    <div className={classes.dropdown} data-testid="dropdown">
      <select
        value={resultCtx.currentSimulation}
        onChange={(event) => selectOnChange(event.target.value)}
        data-testid="select"
      >
        { renderDropdownData() }
      </select>
    </div>
  );
}

Dropdown.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    api: PropTypes.string.isRequired,
  })).isRequired,
};

export default Dropdown;
