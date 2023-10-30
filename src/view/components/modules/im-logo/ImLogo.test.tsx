import { render } from '@testing-library/react';
import ImLogo from './ImLogo';

describe('ImLogo Component', () => {
  test('It should render correctly', () => {
    render(<ImLogo size="small" />);
    const logo = document.getElementsByClassName('im-logo')[0];
    expect(logo).toBeInTheDocument();
  });
});
