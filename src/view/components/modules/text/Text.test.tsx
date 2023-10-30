import { render } from '@testing-library/react';
import Text from './Text';

describe('Text Component', () => {
  test('It should render correctly', () => {
    const { getByText } = render(<Text text="this is a text" width="60px" height="40px" />);
    const text = getByText(/this is a text/i);
    expect(text).toBeInTheDocument();
  });
  test('It should render correctly, if there is a http link it will transform into a anchor', () => {
    render(<Text text="this is a text https://www.mock.com" width="60px" height="40px" />);
    const anchor = document.querySelector('a');
    expect(anchor).toBeInTheDocument();
  });
});
