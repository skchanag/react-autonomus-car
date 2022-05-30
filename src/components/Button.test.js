import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from './Button';
import ResultContext from '../store/ResultContext'

afterEach(cleanup);

describe('Button component', () => {
  test('able to trigger click event', () => {
    const mockOnClick = jest.fn();
    const { getByTestId }  = render(<Button text="Start" btnOnClick={mockOnClick} />);
    const button = getByTestId('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('becomes disabled when resultCtx is loading', () => {
    const contextValues = {isLoading: true};
    const mockOnClick = jest.fn();
    const { getByTestId }  = render(
      <ResultContext.Provider value={contextValues}>
        <Button text="Start" btnOnClick={mockOnClick} />
      </ResultContext.Provider>
    )
    const button = getByTestId('button');
    expect(button).toBeDisabled();
  });
})