import { act, render, waitFor } from '@testing-library/react';
import InputPassword from './InputPassword';
import user from '@testing-library/user-event';

describe('InputPassword Component', () => {
  test('It should render correctly starts as password and after visibility click password is visible.', () => {
    const { getByPlaceholderText, getByTestId } = render(<InputPassword placeholder="insert a password" />);
    const input = getByPlaceholderText('insert a password') as HTMLInputElement;

    act(() => {
      user.type(input, '123456');
    });

    expect(input.value).toBe('123456');
    expect(input).toHaveAttribute('type', 'password');

    const visibility = getByTestId('im-input-password-visibility');

    act(() => {
      visibility.click();
    });
    waitFor(() => {});

    expect(input).toHaveAttribute('type', 'text');
  });
  test('It should clear input value after the click on clear button', () => {
    const { getByPlaceholderText, getByTestId } = render(<InputPassword placeholder="insert a password" />);
    const input = getByPlaceholderText('insert a password') as HTMLInputElement;

    act(() => {
      user.type(input, '123456');
    });

    expect(input.value).toBe('123456');

    const clear = getByTestId('im-input-password-clear');

    act(() => {
      clear.click();
    });
    waitFor(() => {});
    expect(input.value).toBe('');
  });
});
