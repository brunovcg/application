import { render } from '@testing-library/react';
import NotificationBubble from './NotificationBubble';

describe('NotificationBubble Component', () => {
  test('It should render +99 when quantity is over 99', () => {
    const { getByText } = render(<NotificationBubble quantity={100} />);

    const text = getByText(/\+99/i);

    expect(text).toBeInTheDocument();
  });
  test('It should render the exact quantity when quantity is less or equal than 99', () => {
    const { getByText } = render(<NotificationBubble quantity={98} />);

    const text = getByText(/98/i);

    expect(text).toBeInTheDocument();
  });
});
