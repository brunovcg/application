import { render } from '@testing-library/react';
import Title from './Title';

describe('Title Component', () => {
  test('It should render correctly', () => {
    const { getByText } = render(<Title text="this is a title" icon="cancel" />);
    const title = getByText('this is a title');
    expect(title).toBeInTheDocument();
    const icon = document.getElementsByClassName('im-icon')[0];
    expect(icon).toBeInTheDocument();
  });
});
