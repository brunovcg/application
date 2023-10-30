import { render } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  test('It should render spinner correctly', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    const spinner = getByTestId('im-loading-spinner');
    expect(spinner).toBeInTheDocument();
  });
  test('It should render loading as message if message is passed as true', () => {
    const { getByText } = render(<LoadingSpinner message />);
    const message = getByText(/loading/i);
    expect(message).toBeInTheDocument();
  });
  test('It should render the message passed as props', () => {
    const { getByText } = render(<LoadingSpinner message="loading message" />);
    const message = getByText(/loading message/i);
    expect(message).toBeInTheDocument();
  });
  test('It should not render if condition props is set falsy', () => {
    const { queryByTestId } = render(<LoadingSpinner condition={false} />);
    const spinner = queryByTestId('im-loading-spinner');
    expect(spinner).not.toBeInTheDocument();
  });
});
