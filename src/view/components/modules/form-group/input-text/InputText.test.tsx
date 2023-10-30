import { act, render, waitFor } from '@testing-library/react';
import InputText from './InputText';
import user from '@testing-library/user-event';

const inputInsertion = 'insert a number';

describe('InputText Component', () => {
  test('It should render correctly', () => {
    const { getByPlaceholderText } = render(<InputText placeholder={inputInsertion} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, '10000');
    });

    expect(input.value).toBe('10000');
  });
  test('It should clear input value after the click on clear button', () => {
    const { getByPlaceholderText, getByTestId } = render(<InputText placeholder={inputInsertion} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, 'a text');
    });

    expect(input.value).toBe('a text');

    const clear = getByTestId('im-input-text-clear');

    act(() => {
      clear.click();
    });
    waitFor(() => {});
    expect(input.value).toBe('');
  });
  test('It should reset input to it initial value after the click on reset button', () => {
    const { getByPlaceholderText, queryByTestId } = render(<InputText placeholder={inputInsertion} initialValue="initial" canReset />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.clear(input);
      user.type(input, 'a text');
    });

    expect(input.value).toBe('a text');

    const reset = queryByTestId('im-input-text-reset');

    act(() => {
      reset?.click();
    });

    expect(input.value).toBe('initial');
  });
  test('It should render properly the remaining characters counter, and do not permit to write anymore when it is zero', () => {
    const { getByPlaceholderText } = render(<InputText placeholder={inputInsertion} maxLength={10} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, '0123456789');
    });
    waitFor(() => {});
    const remaining = document.getElementsByClassName('im-remaining-no-characters')[0];
    expect(remaining.textContent).toBe('0');

    act(() => {
      user.type(input, '8888');
    });

    expect(input.value).toBe('0123456789');
  });
});
