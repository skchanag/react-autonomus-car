import React from 'react';
import classes from './LoadingSpinner.module.css';

function LoadingSpinner() {
  return (
    <div className={classes.spinnerContainer} data-testid="spinnerContainer">
      <div className={classes.loadingSpinner} data-testid="loadingSpinner" />
    </div>
  );
}

export default LoadingSpinner;
