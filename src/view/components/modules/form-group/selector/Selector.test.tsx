import { act, render, waitFor } from '@testing-library/react';
import Selector from './Selector';
import user from '@testing-library/user-event';

const options = ['first', 'second', 'third'];

const firstSelectionId = 'im-selection-first';
const firstOptionId = 'im-option-first';
const thirdOptionId = 'im-option-third';
const selector = 'im-selector';

describe('Selector Component', () => {
  test('It should open when is clicked and allow to select one option', () => {
    const { getByTestId, getByText } = render(<Selector options={options} />);

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    waitFor(() => {});

    const firstOption = getByText(/first/i);

    act(() => {
      user.click(firstOption);
    });

    const selectedItemChip = getByTestId(firstSelectionId);

    expect(selectedItemChip).toBeInTheDocument();
  });
  test('It should open and allow to select many options when multiple prop is true, also display the first selection +{number of selections}', () => {
    const { getByTestId, getByText } = render(<Selector options={options} multiple />);

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const firstOption = getByText(/first/i);
    const secondOption = getByText(/second/i);

    act(() => {
      user.click(firstOption);
      user.click(secondOption);
    });

    waitFor(() => {});

    const selectedItemChip = getByTestId(firstSelectionId);
    const getPlusQuantity = getByText(/\+1/i);

    expect(selectedItemChip).toBeInTheDocument();
    expect(getPlusQuantity).toBeInTheDocument();
  });
  test('It should clean the selection when clear button is pressed', () => {
    const { getByTestId, getByText, queryByTestId } = render(<Selector options={options} />);

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    waitFor(() => {});

    const firstOption = getByText(/first/i);

    act(() => {
      user.click(firstOption);
    });

    waitFor(() => {});

    const selectClear = getByTestId('im-selector-clear');

    act(() => {
      user.click(selectClear);
    });

    waitFor(() => {});
    const selectedItemChipAfterClear = queryByTestId(firstSelectionId);

    expect(selectedItemChipAfterClear).not.toBeInTheDocument();
  });
  test('It should render the initState selection and be able to reset to it after a change ', () => {
    const { getByTestId, getByText, queryByTestId } = render(<Selector options={options} initValue={['first']} />);

    const initialItemChip = getByTestId(firstSelectionId);
    expect(initialItemChip).toBeInTheDocument();
    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const secondOption = getByText(/second/i);

    act(() => {
      user.click(secondOption);
    });

    const initialItemChipAfterChange = queryByTestId(firstSelectionId);

    expect(initialItemChipAfterChange).not.toBeInTheDocument();

    const selectReset = getByTestId('im-selector-reset');

    act(() => {
      user.click(selectReset);
    });

    const selectedItemChipAfterClear = queryByTestId(firstSelectionId);

    expect(selectedItemChipAfterClear).toBeInTheDocument();
  });
  test('It should render the placeholder when no option is select', () => {
    const { getByTestId, getByText, queryByText } = render(<Selector options={options} placeholder="im a placeholder" />);

    const placeholder = getByText(/im a placeholder/i);

    expect(placeholder).toBeInTheDocument();

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const secondOption = getByText(/second/i);

    act(() => {
      user.click(secondOption);
    });

    const placeholderAfterClick = queryByText(/im a placeholder/i);

    expect(placeholderAfterClick).not.toBeInTheDocument();
  });

  test('It should be possible to filter options', () => {
    const { getByTestId, getByText, queryByText } = render(<Selector options={options} multiple />);

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const firstOption = getByText(/first/i);
    const secondOption = getByText(/second/i);
    const thirdOption = getByText(/third/i);

    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    const filter = getByTestId('im-selector-filter');

    act(() => {
      user.type(filter, 'first');
    });
    waitFor(() => {});

    const firstOptionAfterClick = getByText(/first/i);
    expect(firstOptionAfterClick).toBeInTheDocument();
    const secondOptionAfterClick = queryByText(/second/i);
    expect(secondOptionAfterClick).not.toBeInTheDocument();
    const thirdOptionAfterClick = queryByText(/third/i);
    expect(thirdOptionAfterClick).not.toBeInTheDocument();
  });
  test('It should be possible to filter only the selected options', () => {
    const { getByTestId, queryByTestId } = render(<Selector options={options} multiple />);

    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const firstOption = getByTestId('im-option-first');
    const secondOption = getByTestId('im-option-second');
    const thirdOption = getByTestId(thirdOptionId);
    expect(firstOption).toBeInTheDocument();
    expect(secondOption).toBeInTheDocument();
    expect(thirdOption).toBeInTheDocument();

    act(() => {
      user.click(firstOption);
      user.click(secondOption);
    });

    const onlySelected = getByTestId('im-filter-selected');

    act(() => {
      user.click(onlySelected);
    });

    waitFor(() => {});

    const firstAfterOnlySelected = getByTestId(firstOptionId);
    expect(firstAfterOnlySelected).toBeInTheDocument();
    const thirdAfterOnlySelected = queryByTestId(thirdOptionId);
    expect(thirdAfterOnlySelected).not.toBeInTheDocument();
  });

  test('It should not render the list on select click when it is loading', () => {
    const { getByTestId, queryByTestId } = render(<Selector options={options} loading />);
    const select = getByTestId(selector);

    act(() => {
      user.click(select);
    });

    const optionsList = queryByTestId('im-options-list');

    expect(optionsList).not.toBeInTheDocument();
  });
});
