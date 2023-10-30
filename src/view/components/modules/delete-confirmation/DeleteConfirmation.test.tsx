import { act, render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import DeleteConfirmation from './DeleteConfirmation';

describe('DeleteConfirmation Component', () => {
  test('It should render correctly', () => {
    render(<DeleteConfirmation onDelete={() => {}} />);
    const deleteConfirmation = screen.getByTestId('im-delete-confirmation');
    expect(deleteConfirmation).toBeInTheDocument();
  });
  test('It should display confirmation component on delete click', async () => {
    render(<DeleteConfirmation onDelete={() => {}} />);
    const deleteButton = screen.getByTestId('im-delete-button');
    act(() => {
      user.click(deleteButton);
    });

    const confirmationComponent = screen.getByTestId('im-confirmation-component');

    expect(confirmationComponent).toBeInTheDocument();
    expect(deleteButton).not.toBeInTheDocument();

    const closeButton = screen.getByTestId('im-close-button');

    act(() => {
      user.click(closeButton);
    });

    const deleteButtonReRendered = screen.getByTestId('im-delete-button');

    expect(deleteButtonReRendered).toBeInTheDocument();
  });
});
