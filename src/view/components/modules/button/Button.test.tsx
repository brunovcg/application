import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  test('It should render correctly', () => {
    render(<Button text="submit" />);
    const textElement = screen.getByText(/submit/i);
    expect(textElement).toBeInTheDocument();
  });

  test('It should display a loading spinner when it has a loading state', () => {
    render(<Button text="submit" loading />);
    const loadingElement = screen.getByRole('img');
    expect(loadingElement).toBeInTheDocument();
  });
});
