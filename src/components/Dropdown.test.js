import { render, getAllByRole, cleanup, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Dropdown from './Dropdown';

const dropdownDetails = [
  { text: 'Empty Route', api: 'empty-route' },
  { text: 'Success No Obstacles', api: 'success-no-obstacles' },
  { text: 'Success With Obstacles', api: 'success-with-obstacles' },
  { text: 'Failure Out Of Bounds', api: 'failure-out-of-bounds' },
  { text: 'Failure Hits Obstacle', api: 'failure-hits-obstacle' },
  { text: 'Random', api: 'random' },
];

afterEach(cleanup);

describe('Dropdown component', () => {
  test('display 6 simulation selection', () => {
    const { getByTestId } = render(<Dropdown details={dropdownDetails} />);
    const dropdown = getByTestId('dropdown');
    const dropdownOptions = getAllByRole(dropdown, 'option');
    expect(dropdownOptions).toHaveLength(6);
  });

  test('able to change the dropdown selection', () => {
    const { getByTestId } = render(<Dropdown details={dropdownDetails} />);
    const dropdown = getByTestId('dropdown');
    fireEvent.click(dropdown);
    const dropdownOptions = getAllByRole(dropdown, 'option');
    fireEvent.click(dropdownOptions[2]);
    expect(screen.getByText(dropdownDetails[2].text)).toBeInTheDocument();
    fireEvent.click(dropdownOptions[4]);
    expect(screen.getByText(dropdownDetails[4].text)).toBeInTheDocument();
  });
})