import { act, render, waitFor } from '@testing-library/react';
import SelectorUSStatesView from './SelectorUSStates.view';
import user from '@testing-library/user-event';
import { USState, usStates } from '../../../../../apis/services/states-services/States.services.types';

describe('SelectorStates Component', () => {
  test('It should be able to click open a list and render the options', () => {
    const { getByTestId, getByText } = render(
      <SelectorUSStatesView states={usStates as unknown as USState[]} loading={false} label="State" />
    );
    const selectStates = getByTestId('im-selector-us-states');

    act(() => {
      user.click(selectStates);
    });
    waitFor(() => {});

    const state1 = getByText(/AL/i);
    const state2 = getByText(/FL/i);
    const state3 = getByText(/TX/i);

    expect(state1).toBeInTheDocument();
    expect(state2).toBeInTheDocument();
    expect(state3).toBeInTheDocument();
  });
  test('It should be unable to click open a list and render the options and display loading spinner', () => {
    const { getByTestId, queryByTestId } = render(<SelectorUSStatesView states={[]} loading label="State" />);
    const selectStates = getByTestId('im-selector-us-states');

    act(() => {
      user.click(selectStates);
    });

    const optionsList = queryByTestId('im-options-list-states');

    expect(optionsList).not.toBeInTheDocument();

    const loading = getByTestId('im-loading-spinner');

    expect(loading).toBeInTheDocument();
  });
});
