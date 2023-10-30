import { render, screen } from '@testing-library/react';
import ButtonIcon from './ButtonIcon';

describe('ButtonIcon Component', () => {
  test('It should render correctly', () => {
    render(<ButtonIcon icon="close" />);
    const buttonIcon = screen.getByTestId('im-button-icon');
    expect(buttonIcon).toBeInTheDocument();
  });

  test('It should be hidden when it has hide prop', () => {
    render(<ButtonIcon icon="close" hide />);
    const buttonIcon = document.getElementsByClassName('im-button-icon')[0];
    const style = window.getComputedStyle(buttonIcon);
    expect(style.visibility).toBe('hidden');
  });
});
