import { render } from '@testing-library/react';
import UserTypeChip from './UserTypeChip';

describe('UserTypeChip Component', () => {
  test('It should render Customer text when userType is C', () => {
    const { getByText } = render(<UserTypeChip userType="C" />);
    const title = getByText('Customer');

    expect(title).toBeInTheDocument();
  });
  test('It should render Internal text when userType is I', () => {
    const { getByText } = render(<UserTypeChip userType="I" />);
    const title = getByText('Internal');

    expect(title).toBeInTheDocument();
  });
});
