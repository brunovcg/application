import { render } from '@testing-library/react';
import Radio from './Radio';

const label = 'this is an label';

describe('Radio Component', () => {
  test('It should render correctly, displaying a label', () => {
    const { getByText } = render(<Radio label={label} />);
    const radioLabel = getByText(/this is an label/i) as HTMLInputElement;

    expect(radioLabel).toBeInTheDocument();
  });
  test('It should start checked when a true checked props is passed', () => {
    const { getByLabelText } = render(<Radio label={label} checked />);
    const radio = getByLabelText(/this is an label/i) as HTMLInputElement;

    expect(radio).toBeChecked();
  });
});
