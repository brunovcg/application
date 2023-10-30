import { render } from '@testing-library/react';
import ButtonImage from './ButtonImage';
import IMLogo from '../../../../assets/images/logo.png';

describe('ButtonImage Component', () => {
  test('It should render correctly', () => {
    const { getByRole } = render(<ButtonImage backgroundImage={IMLogo} width="100px" height="20px" onClick={() => {}} />);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();

    expect(button).toHaveStyle({ 'background-image': `url(${IMLogo})` });
  });
});
