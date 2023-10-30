import { render, screen } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar Component', () => {
  test('It should prefer name instead of username, render the first and last name initials if name has more than two words', () => {
    render(<Avatar username="im@theinvestormachine" name="The Investor Machine" />);
    const avatar = screen.getByText(/TM/i);
    expect(avatar).toBeInTheDocument();
  });
  test('It should render the username initial if there is no name', () => {
    render(<Avatar username="im@theinvestormachine" />);
    const avatar = screen.getByText(/I/i);
    expect(avatar).toBeInTheDocument();
  });

  test('It should prefer name instead of username, render name initial if it has one word', () => {
    render(<Avatar username="im@theinvestormachine" name="Machine" />);
    const avatar = screen.getByText(/M/i);
    expect(avatar).toBeInTheDocument();
  });
});
