import { React, useContext } from 'react';
import ResultContext from '../store/ResultContext';
import LoadingSpinner from './LoadingSpinner';
import classes from './Result.module.css';

function Result() {
  const resultCtx = useContext(ResultContext);
  const laneEnum = {
    outLeft: 'leftmost lane',
    a: 'a lane',
    b: 'b lane',
    c: 'c lane',
    outRight: 'rightmost lane',
  };

  const renderTableData = () => Object.keys(laneEnum).map((key) => (
    <td key={key} aria-label={laneEnum[key]}>
      { key === resultCtx.lane && (
        <span>
          <img src="car.png" alt="car" />
          <p>
            {'Position '}
            {resultCtx.position}
          </p>
          { resultCtx.status !== '' && <img src={`${resultCtx.status}.png`} alt={resultCtx.status} /> }
        </span>
      )}
    </td>
  ));

  return (
    <div className={classes.result} data-testid="result">
      <div className={classes.resultGraphic} data-testid="resultGraphic">
        {resultCtx.isLoading ? <LoadingSpinner /> : (
          <table className={classes.trackTable} data-testid="table">
            <thead>
              <tr>
                <th aria-label="leftmost lane" />
                <th>a</th>
                <th>b</th>
                <th>c</th>
                <th aria-label="rightmost lane" />
              </tr>
            </thead>
            <tbody>
              <tr>
                {renderTableData()}
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div className={classes.resultText} data-testid="resultText">
        <span className={classes.title}>Result</span>
        { resultCtx.errorMessage !== '' && <p className={classes.errorMsg}>{resultCtx.errorMessage}</p>}
        { resultCtx.status !== '' && <p>{`{ "status": "${resultCtx.status}", "position": ${resultCtx.position} }`}</p> }
      </div>
    </div>
  );
}

export default Result;
