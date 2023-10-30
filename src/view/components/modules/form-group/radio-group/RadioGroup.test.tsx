import { render } from '@testing-library/react';
import RadioGroup from './RadioGroup';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';

const options = [
  { id: 'first', label: 'first', checked: true },
  { id: 'second', label: 'second', checked: false },
  { id: 'third', label: 'third', checked: false },
];

describe('RadioGroup Component', () => {
  test('It should render correctly, displaying each radio and its label', () => {
    const { getByLabelText } = render(<RadioGroup options={options} />);

    const first = getByLabelText('first');
    const second = getByLabelText('second');
    const third = getByLabelText('third');

    expect(first).toBeInTheDocument();
    expect(second).toBeInTheDocument();
    expect(third).toBeInTheDocument();
    expect(first).toBeChecked();
    expect(second).not.toBeChecked();
    expect(third).not.toBeChecked();

    act(() => {
      user.click(second);
    });

    const firstAfterClick = getByLabelText('first');

    expect(second).toBeChecked();
    expect(firstAfterClick).not.toBeChecked();
  });
  test('It should handle a radio click, when one of the radios is clicked, this one gets checked, the other that was previously checked will be unchecked', () => {
    const { getByLabelText } = render(<RadioGroup options={options} />);

    const second = getByLabelText('second');

    act(() => {
      user.click(second);
    });

    const firstAfterClick = getByLabelText('first');
    const secondAfterClick = getByLabelText('second');
    const thirdAfterClick = getByLabelText('third');

    expect(secondAfterClick).toBeChecked();
    expect(firstAfterClick).not.toBeChecked();
    expect(thirdAfterClick).not.toBeChecked();
  });
});
