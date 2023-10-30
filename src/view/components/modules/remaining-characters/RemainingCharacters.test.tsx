import { render } from '@testing-library/react';
import RemainingCharacters from './RemainingCharacters';

describe('RemainingCharacters Component', () => {
  test('It should render correctly', () => {
    const { getByText } = render(<RemainingCharacters remainingCharacters={100} />);

    const remaining = getByText(/100/i);

    expect(remaining).toBeInTheDocument();
  });
});
