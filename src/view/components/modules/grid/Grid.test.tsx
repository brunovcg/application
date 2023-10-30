import { render, waitFor } from '@testing-library/react';
import Grid from './Grid';
import { GridTemplateArgs } from './Grid.types';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';

const columns = [
  { id: 1, accessor: 'firstColumn', component: 'First' },
  { id: 2, accessor: 'secondColumn', component: 'Second' },
  { id: 3, accessor: 'thirdColumn', component: 'Third', template: ({ value }: GridTemplateArgs) => `template ${value}` },
];
const rows = [
  { id: 1, firstColumn: 'c1r1', secondColumn: 'c2r1', thirdColumn: 'c3r1' },
  { id: 2, firstColumn: 'c1r2', secondColumn: 'c2r2', thirdColumn: 'c3r2' },
];

describe('Grid Component', () => {
  test('It should render all columns and row, if there is a template it should be rendered', () => {
    const { getByText } = render(<Grid columns={columns} rows={rows} />);

    columns.forEach((column) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(column.component);
      const columnComponent = getByText(regex);
      expect(columnComponent).toBeInTheDocument();
    });

    rows.forEach((row) => {
      const rowKeys = Object.keys(row);
      // remove ids
      rowKeys.shift();

      rowKeys.forEach((key) => {
        const keyValue = row[`${key}` as keyof typeof row] as string;
        const columnHasTemplate = !!columns.find((column) => column.accessor === key)?.template;
        let keyValueTemplateChecked;

        if (!columnHasTemplate) {
          keyValueTemplateChecked = keyValue;
        } else {
          keyValueTemplateChecked = `template ${keyValue}`;
        }

        // eslint-disable-next-line security/detect-non-literal-regexp
        const regex = new RegExp(keyValueTemplateChecked, 'i');
        const cell = getByText(regex);
        expect(cell).toBeInTheDocument();
      });
    });
  });
  test('It should render no Data Message if there is no data in array', () => {
    const { getByText } = render(<Grid columns={columns} rows={[]} noData="there is no data" />);

    const noData = getByText('there is no data');
    expect(noData).toBeInTheDocument();
  });
  test('It should render no loading if loading prop is true, even if there is no data yet.', () => {
    const { queryByText, getByTestId } = render(<Grid columns={columns} rows={[]} loading noData="there is no data" />);

    const noData = queryByText('there is no data');
    expect(noData).not.toBeInTheDocument();
    const loading = getByTestId('im-loading-spinner');
    expect(loading).toBeInTheDocument();
  });
  test('It should be able to filter and display what is filtered', async () => {
    const { getByText, getByTestId } = render(<Grid columns={columns} rows={rows} search />);

    const criteriaField = getByTestId('im-selector');
    expect(criteriaField).toBeInTheDocument();
    const filterField = getByTestId('im-input-text');
    expect(filterField).toBeInTheDocument();

    act(() => {
      user.click(criteriaField);
    });

    waitFor(() => {});
    const selectedCriteria = getByTestId(/im-option-First/i);

    user.click(selectedCriteria);
    user.type(filterField, 'c1r1');

    waitFor(() => {});
    const text = getByText(/c1r1/i);

    expect(text).toBeInTheDocument();
  });
});
