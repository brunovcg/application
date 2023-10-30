import { act, render, waitFor } from '@testing-library/react';
import InputNumber from './InputNumber';
import user from '@testing-library/user-event';

const inputInsertion = 'insert a number';

describe('InputNumber Component', () => {
  test('It should render correctly', () => {
    const { getByPlaceholderText } = render(<InputNumber placeholder={inputInsertion} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, '10000');
      input.blur();
    });

    expect(input.value).toBe('10000');
  });
  test('It should render the value correctly if we set a number lower than the minimum of higher than the maximum.', () => {
    const { getByPlaceholderText } = render(<InputNumber placeholder={inputInsertion} min={5} max={100} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, '101');
      input.blur();
    });

    expect(input.value).toBe('100');

    act(() => {
      user.dblClick(input);
      user.type(input, '-1');
      input.blur();
    });

    expect(input.value).toBe('5');
  });
  test('It should clear input value after the click on clear button', () => {
    const { getByPlaceholderText, getByTestId } = render(<InputNumber placeholder={inputInsertion} />);
    const input = getByPlaceholderText(inputInsertion) as HTMLInputElement;

    act(() => {
      user.type(input, '111');
      input.blur();
    });

    expect(input.value).toBe('111');

    const clear = getByTestId('im-input-number-clear');

    act(() => {
      clear.click();
    });
    waitFor(() => {});
    expect(input.value).toBe('0');
  });
});
