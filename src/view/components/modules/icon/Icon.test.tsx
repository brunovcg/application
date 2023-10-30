import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon Component', () => {
  test('It should render correctly', () => {
    render(<Icon icon={'done'} />);
    const icon = document.getElementsByClassName('im-icon')[0];
    expect(icon).toBeInTheDocument();
  });
});
