import { render } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  test('It should render correctly', () => {
    const { getByTestId } = render(<ErrorMessage error="This is an error" />);

    expect(getByTestId('im-error-message')).toBeInTheDocument();
  });
  test('It should be hidden when hide prop is true ', () => {
    const { queryByText } = render(<ErrorMessage error="This is an error" hide />);

    expect(queryByText(/This is an error/i)).not.toBeInTheDocument();
  });
});
