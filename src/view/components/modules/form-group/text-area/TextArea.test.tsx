import { act, render, waitFor } from '@testing-library/react';
import TextArea from './TextArea';
import user from '@testing-library/user-event';

const textInsertion = 'insert a text';

describe('TextArea Component', () => {
  test('It should render what is typed correctly', () => {
    const { getByPlaceholderText } = render(<TextArea placeholder={textInsertion} />);
    const textArea = getByPlaceholderText(textInsertion) as HTMLTextAreaElement;

    act(() => {
      user.type(textArea, 'this is a text');
    });

    expect(textArea.value).toBe('this is a text');
  });
  test('It should clear textarea value after the click on clear button', () => {
    const { getByPlaceholderText, getByTestId } = render(<TextArea placeholder={textInsertion} />);
    const textArea = getByPlaceholderText(textInsertion) as HTMLTextAreaElement;

    act(() => {
      user.type(textArea, 'a text');
    });

    expect(textArea.value).toBe('a text');

    const clear = getByTestId('im-textarea-clear');

    act(() => {
      clear.click();
    });
    waitFor(() => {});
    expect(textArea.value).toBe('');
  });
  test('It should reset textarea to it initial value after the click on reset button', () => {
    const { getByPlaceholderText, queryByTestId } = render(<TextArea placeholder={textInsertion} initialValue="initial" allowReset />);
    const textArea = getByPlaceholderText(textInsertion) as HTMLTextAreaElement;

    act(() => {
      user.clear(textArea);
      user.type(textArea, 'a text');
    });

    expect(textArea.value).toBe('a text');

    const reset = queryByTestId('im-textarea-reset');

    act(() => {
      reset?.click();
    });

    expect(textArea.value).toBe('initial');
  });
  test('It should render properly the remaining characters counter, and do not permit to write anymore when it is zero', () => {
    const { getByPlaceholderText } = render(<TextArea placeholder={textInsertion} maxLength={10} />);
    const textArea = getByPlaceholderText(textInsertion) as HTMLTextAreaElement;

    act(() => {
      user.type(textArea, '0123456789');
    });
    waitFor(() => {});
    const remaining = document.getElementsByClassName('im-remaining-no-characters')[0];
    expect(remaining.textContent).toBe('0');

    act(() => {
      user.type(textArea, '8888');
    });

    expect(textArea.value).toBe('0123456789');
  });
});
