import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from './App';
import { ResultContextProvider } from './store/ResultContext';

const mockRoute = {
  route: {
      track: [],
      travelLog: []
  }
};

beforeEach(() => {
  global.fetch = jest.fn().mockImplementationOnce(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockRoute),
    })
  )
})

afterEach(cleanup);

describe('App component', () => {
  test('renders the component', () => {
    render(<App />);
    expect(screen.getByText('Autonomous Car')).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test('able to determine the simulation result based on the fetch response', async () => {
    render(
      <ResultContextProvider>
        <App />
      </ResultContextProvider>
    );
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    await waitFor(() => {
      const resultText = screen.getByTestId('resultText');
      expect(resultText).toHaveTextContent('{ "status": "success" }');
    });
  });
})