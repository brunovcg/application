import { render } from '@testing-library/react';

import ImLogoAnimation from './ImLogoAnimation';

describe('ImLogoAnimation Component', () => {
  test('It should render correctly', () => {
    render(<ImLogoAnimation size="small" />);
    const logo = document.getElementsByClassName('im-logo-animation')[0];
    expect(logo).toBeInTheDocument();
  });
});
