import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Panel from './Panel';

describe('Panel component', () => {
  test('renders the compoent', () => {
    render(<Panel />);
    expect(screen.getByTestId('panel')).toBeInTheDocument();
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });
})