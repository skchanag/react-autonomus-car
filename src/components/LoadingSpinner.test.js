import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner component', () => {
  test('renders the component', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('spinnerContainer')).toBeInTheDocument();
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
});
