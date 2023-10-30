import { render } from '@testing-library/react';
import List from './List';

const lines = [
  { id: 1, text: 'first line' },
  { id: 2, text: 'second line' },
];

describe('List Component', () => {
  test('It should render all lines', () => {
    const { getByText } = render(<List lines={lines} />);

    lines.forEach((line) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(line.text, 'i');
      const li = getByText(regex);
      expect(li).toBeInTheDocument();
    });
  });
});
