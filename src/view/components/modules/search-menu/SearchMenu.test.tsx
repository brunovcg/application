import { act, render, screen, waitFor } from '@testing-library/react';
import SearchMenu from './SearchMenu';
import user from '@testing-library/user-event';

const options = [
  { content: 'this is a filtered content', type: 'text' },
  { content: 'this is a content', type: 'text' },
];

describe('SearchMenu Component', () => {
  const onClick = () => {};
  test('It should render correctly, a option that fit the search renders, those that doesn`t should`t', () => {
    render(
      <SearchMenu
        options={options}
        displayAccessor="content"
        contentAccessor="content"
        onOptionClick={onClick}
        placeholder="type to search"
      />
    );
    const input = screen.getByPlaceholderText(/type to search/i);

    expect(input).toBeInTheDocument();

    act(() => {
      user.type(input, 'filtered');
    });

    waitFor(() => {});

    const filteredOption = screen.getByText(/this is a filtered content/i);
    const notFilteredOptions = screen.queryByText(/this is a content/i);

    expect(filteredOption).toBeInTheDocument();

    expect(notFilteredOptions).not.toBeInTheDocument();
  });
  test('It should render a error message if there isn`t matches', () => {
    render(
      <SearchMenu
        options={options}
        displayAccessor="content"
        contentAccessor="content"
        onOptionClick={() => {}}
        placeholder="type to search"
      />
    );
    const input = screen.getByPlaceholderText(/type to search/i);

    expect(input).toBeInTheDocument();

    act(() => {
      user.type(input, 'text');
    });

    waitFor(() => {});

    const filteredOptions = screen.queryByText(/this is a filtered content/i);
    const notFilteredOptions = screen.queryByText(/this is a content/i);

    expect(filteredOptions).not.toBeInTheDocument();

    expect(notFilteredOptions).not.toBeInTheDocument();
  });
});
