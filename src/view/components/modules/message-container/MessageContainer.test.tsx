import { render } from '@testing-library/react';
import MessageContainer from './MessageContainer';

describe('MessageContainer Component', () => {
  test('It should render with the text passed as props', () => {
    const { getByText } = render(<MessageContainer text="i am a text" />);
    const text = getByText(/i am a text/i);
    expect(text).toBeInTheDocument();
  });
});
