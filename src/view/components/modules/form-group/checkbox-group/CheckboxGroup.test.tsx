import { render } from '@testing-library/react';
import CheckboxGroup from './CheckboxGroup';

const options = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
];

describe('CheckboxGroup Component', () => {
  test('It should render label correctly with all options', () => {
    const { getByText } = render(<CheckboxGroup options={options} />);
    const checkbox1 = getByText(/Option 1/i);
    expect(checkbox1).toBeInTheDocument();
    const checkbox2 = getByText(/Option 2/i);
    expect(checkbox2).toBeInTheDocument();
  });
});
