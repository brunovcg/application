import { render, act, waitFor } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';
import user from '@testing-library/user-event';

const options = [
  {
    text: 'Option 1',
  },
  {
    text: 'Option 2',
  },
];

describe('DropdownMenu Component', () => {
  test('It should render correctly', () => {
    const { getByTestId } = render(<DropdownMenu options={options} />);
    const trigger = getByTestId('im-dropdown-menu-trigger');
    expect(trigger).toBeInTheDocument();
  });
  test('It should pop up a container with the options after trigger is clicked', () => {
    const { getByTestId, getByText } = render(<DropdownMenu options={options} />);
    const trigger = getByTestId('im-dropdown-menu-trigger');

    act(() => {
      user.click(trigger);
    });

    // This is needed to wait the components to re-render, if we don't set thi we'll get a warning because of popper state
    waitFor(() => {});
    expect(getByText(/Option 1/)).toBeInTheDocument();
    expect(getByText(/Option 2/)).toBeInTheDocument();
  });
});
