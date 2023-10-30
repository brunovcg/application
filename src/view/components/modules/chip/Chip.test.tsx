import { render, screen } from '@testing-library/react';
import Chip from './Chip';

describe('Chip Component', () => {
  test('It should render correctly', () => {
    render(<Chip text="investor" />);
    const chip = screen.getByText(/investor/i);
    expect(chip).toBeInTheDocument();
  });
  test('It should render a close button icon when it has a closeButton prop correctly', () => {
    render(<Chip text="investor" onCloseButton={() => {}} />);
    const closeButton = screen.getByTestId('im-button-icon');
    expect(closeButton).toBeInTheDocument();
  });
});
