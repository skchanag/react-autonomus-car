import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Result from './Result';
import ResultContext from '../store/ResultContext'

afterEach(cleanup);

describe('Result component', () => {
  test('able to display spinner when resultCtx is loading', () => {
    const contextValues = {isLoading: true};
    const { getByTestId } = render(
      <ResultContext.Provider value={contextValues}>
        <Result />
      </ResultContext.Provider>
    )
    const spinnerContainer = getByTestId('spinnerContainer');
    expect(spinnerContainer).toBeInTheDocument();
  });

  test('able to display table when resultCtx is not loading', () => {
    const contextValues = {isLoading: false};
    const { getByTestId } = render(
      <ResultContext.Provider value={contextValues}>
        <Result />
      </ResultContext.Provider>
    )
    const table = getByTestId('table');
    expect(table).toBeInTheDocument();
  });

  test('able to display resultText with resultCtx value', () => {
    const contextValues = {
      status: 'success',
      position: 0,
    }
    const { getByTestId } = render(
      <ResultContext.Provider value={contextValues}>
        <Result />
      </ResultContext.Provider>
    )
    const resultText = getByTestId('resultText');
    expect(resultText).toHaveTextContent('{ "status": "success", "position": 0 }');
  });
})