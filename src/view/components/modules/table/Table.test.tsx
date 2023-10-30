import { act, render, waitFor } from '@testing-library/react';
import ControlledTable from './high-order-components/controlled-table/ControlledTable';
import user from '@testing-library/user-event';

const columns = [
  { Header: 'FirstColumn', accessor: 'first' },
  { Header: 'SecondColumn', accessor: 'second' },
  { Header: 'ThirdColumn', accessor: 'third', Cell: ({ value }: { value: string }) => `Cell ${value}` },
];
const data = [
  { first: 'C1R1', second: 'C2R1', third: 'C3R1' },
  { first: 'C1R2', second: 'C2R2', third: 'C3R2' },
  { first: 'C1R3', second: 'C2R3', third: 'C3R3' },
];

describe('Table Component', () => {
  test('It should render all header and data, the formatted template for cells.', () => {
    const { getByText } = render(<ControlledTable columns={columns} data={data} />);

    columns.forEach((column) => {
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp(column.Header);
      const columnComponent = getByText(regex);
      expect(columnComponent).toBeInTheDocument();
    });

    data.forEach((row) => {
      const rowKeys = Object.keys(row);

      rowKeys.forEach((key) => {
        const keyValue = row[`${key}` as keyof typeof row] as string;
        const columnHasTemplate = !!columns.find((column) => column.accessor === key)?.Cell;
        let keyValueTemplateChecked;

        if (!columnHasTemplate) {
          keyValueTemplateChecked = keyValue;
        } else {
          keyValueTemplateChecked = `Cell ${keyValue}`;
        }

        // eslint-disable-next-line security/detect-non-literal-regexp
        const regex = new RegExp(keyValueTemplateChecked, 'i');
        const cell = getByText(regex);
        expect(cell).toBeInTheDocument();
      });
    });
  });
  test('It should handle pagination, only data in that page is rendered, if change pagination size, that page options will be visible', () => {
    const { getByText, getByTestId, getByRole, queryByText } = render(
      <ControlledTable columns={columns} data={data} paginate={[1, 2, 3]} />
    );

    expect(getByTestId('im-table-pagination')).toBeInTheDocument();

    const lineOneData = queryByText(/C1R1/i);
    expect(lineOneData).toBeInTheDocument();

    const line2Data = queryByText(/C1R2/i);
    expect(line2Data).not.toBeInTheDocument();

    const select = getByRole('combobox');

    act(() => {
      user.selectOptions(select, '2');
    });

    const line2DataAfterSelect = getByText(/C1R2/i);
    expect(line2DataAfterSelect).toBeInTheDocument();
  });
  test('It should handle pagination, if next button is clicked, the next values will be rendered', () => {
    const { getByTestId, queryByText } = render(<ControlledTable columns={columns} data={data} paginate={[1, 2, 3]} />);

    expect(getByTestId('im-table-pagination')).toBeInTheDocument();

    const lineOneData = queryByText(/C1R1/i);
    expect(lineOneData).toBeInTheDocument();

    const line2Data = queryByText(/C1R2/i);
    expect(line2Data).not.toBeInTheDocument();

    const nextButton = getByTestId('im-pagination-next');

    act(() => {
      user.click(nextButton);
    });

    const lineOneDataAfterClick = queryByText(/C1R1/i);
    expect(lineOneDataAfterClick).not.toBeInTheDocument();

    const lineTwoAfterClick = queryByText(/C1R2/i);
    expect(lineTwoAfterClick).toBeInTheDocument();
  });
  test('It should handle excel and csv export if props are allowed', () => {
    const { getByTestId } = render(<ControlledTable columns={columns} data={data} allowExportCSV allowExportExcel />);

    const excelButton = getByTestId('im-table-excel');
    const CSVButton = getByTestId('im-table-csv');

    expect(excelButton).toBeInTheDocument();
    expect(CSVButton).toBeInTheDocument();
  });

  test('It should render table info and label if each of those props are passes', () => {
    const { queryByText } = render(<ControlledTable columns={columns} data={data} info="This is a table Info" label="table label" />);

    const info = queryByText(/This is a table Info/i);
    expect(info).toBeInTheDocument();

    const label = queryByText(/table label/i);
    expect(label).toBeInTheDocument();
  });

  test('It should filter columns, if a column is unchecked on column filter popover and showColumnFilter prop is set to true', () => {
    const { getByTestId, queryByTestId } = render(
      <div>
        <ControlledTable columns={columns} data={data} />
        <div id="im-app-popover-root" />
      </div>
    );

    const firstColumn = getByTestId(/im-table-header-SecondColumn/i);
    const secondColumn = getByTestId(/im-table-header-FirstColumn/i);

    expect(firstColumn).toBeInTheDocument();
    expect(secondColumn).toBeInTheDocument();

    const trigger = getByTestId('im-column-filter-trigger');

    act(() => {
      user.click(trigger);
    });
    waitFor(() => {});

    const unselectOption = getByTestId('im-option-FirstColumn');

    act(() => {
      user.click(unselectOption);
    });
    waitFor(() => {});

    const notUncheckedColumn = getByTestId(/im-table-header-SecondColumn/i);
    expect(notUncheckedColumn).toBeInTheDocument();

    const UncheckedColumn = queryByTestId(/im-table-header-FirstColumn/i);

    expect(UncheckedColumn).not.toBeInTheDocument();
  });
});
