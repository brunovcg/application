import { render, waitFor } from '@testing-library/react';
import Switch from './Switch';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';

describe('Switch Component', () => {
  test('It should render correctly, displaying right and left label', () => {
    const { getByText } = render(<Switch leftOption="Left Label" rightOption="Right Label" onChange={() => {}} />);
    const leftLabel = getByText(/Left Label/i) as HTMLInputElement;
    const rightLabel = getByText(/Right Label/i) as HTMLInputElement;

    expect(leftLabel).toBeInTheDocument();
    expect(rightLabel).toBeInTheDocument();
  });
  test('It should render loading spinner when loading prop is true', () => {
    const { getByTestId } = render(<Switch loading leftOption="Left Label" rightOption="Right Label" onChange={() => {}} />);

    expect(getByTestId('im-loading-spinner')).toBeInTheDocument();
  });
  test('It should change switch state after clinking', () => {
    const { getByRole } = render(<Switch leftOption="Left Label" rightOption="Right Label" onChange={() => {}} />);

    const switchComponent = getByRole('switch');
    expect(switchComponent).toHaveAttribute('data-state', 'Left Label');

    act(() => {
      user.click(switchComponent);
    });
    waitFor(() => {});

    const switchComponentAfter = getByRole('switch');

    expect(switchComponentAfter).toHaveAttribute('data-state', 'Right Label');
  });
});
