import { act, render, waitFor } from '@testing-library/react';
import InputCurrency from './InputCurrency';
import user from '@testing-library/user-event';

describe('InputCurrency Component', () => {
  test('It should render correctly, when value is typed, component format it on blur, when reset is clicked value is set to zero', () => {
    const { getByRole, getByTestId } = render(<InputCurrency label="im a checkbox label" />);
    const inputCurrency = getByRole('textbox') as HTMLInputElement;

    act(() => {
      user.clear(inputCurrency);
      user.type(inputCurrency, '10000');
      inputCurrency.blur();
    });

    expect(inputCurrency.value).toBe('$100.00');

    waitFor(() => {});

    const resetButton = getByTestId('im-button-icon');

    act(() => {
      user.click(resetButton);
    });

    expect(inputCurrency.value).toBe('$0.00');
  });
  test('It should render 0, when value that are not numbers are typed', () => {
    const { getByRole } = render(<InputCurrency label="im a checkbox label" />);
    const inputCurrency = getByRole('textbox') as HTMLInputElement;

    act(() => {
      user.clear(inputCurrency);
      user.type(inputCurrency, 'anything');
      inputCurrency.blur();
    });

    expect(inputCurrency.value).toBe('$0.00');
  });
});
