import { render } from '@testing-library/react';
import user from '@testing-library/user-event';

import LoginForm from './LoginForm';
import { act } from 'react-dom/test-utils';

describe('LoginForm Component', () => {
  test('It should render', async () => {
    const { getByTestId } = render(<LoginForm />);

    const username = getByTestId('im-input-text') as HTMLInputElement;
    const password = getByTestId('im-input-password') as HTMLInputElement;

    await act(() => {
      user.type(username, 'investor');
      user.type(password, '123456');
    });

    expect(username.value).toBe('investor');
    expect(password.value).toBe('123456');
  });
});
