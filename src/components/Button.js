import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.css';
import ResultContext from '../store/ResultContext';

function Button(props) {
  const { text, btnOnClick } = props;
  const resultCtx = useContext(ResultContext);

  return (
    <button
      type="button"
      className={classes.btn}
      onClick={() => btnOnClick()}
      disabled={resultCtx.isLoading}
      data-testid="button"
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  btnOnClick: PropTypes.func.isRequired,
};

export default Button;
