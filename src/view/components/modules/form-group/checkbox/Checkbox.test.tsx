import { act, render } from '@testing-library/react';
import Checkbox from './Checkbox';
import user from '@testing-library/user-event';

describe('Checkbox Component', () => {
  test('It should render label correctly', () => {
    const { getByText } = render(<Checkbox label="im a checkbox label" />);
    const label = getByText(/im a checkbox label/i);
    expect(label).toBeInTheDocument();
  });
  test('It should change state correctly conditionally display the check icon', () => {
    const { getByRole, getByText } = render(<Checkbox label="im a checkbox label" />);
    const checkbox = getByRole('checkbox', { hidden: true });

    act(() => {
      user.click(checkbox);
    });

    const icon = document.getElementsByClassName('im-icon-checkbox')[0];

    expect(icon).toBeVisible();
    expect(checkbox).toBeChecked();

    const label = getByText(/im a checkbox label/i);

    act(() => {
      user.click(label);
      user.click(checkbox);
    });

    expect(icon).not.toBeVisible();
    expect(checkbox).not.toBeChecked();
  });
});
