import { render } from '@testing-library/react';
import Divider from './Divider';

describe('Chip Component', () => {
  test('It should render correctly', () => {
    render(<Divider />);
    const divider = document.getElementsByClassName('im-divider')[0];
    expect(divider).toBeInTheDocument();
  });
});
