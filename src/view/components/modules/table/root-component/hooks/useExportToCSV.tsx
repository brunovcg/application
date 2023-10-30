import { Row, HeaderGroup } from 'react-table';

export default function useExportToCSV(renderRows: Row[], headerGroups: HeaderGroup[]) {
  const getCSV = () => {
    const CSV: unknown[][] = [];

    headerGroups.forEach((headerGroup: HeaderGroup) => {
      const headerRow: unknown[] = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach((column) => {
          const rowHasData = renderRows.find((row: Row) => row.values[column.id]);
          if (rowHasData) {
            headerRow.push(column.Header);
          }
        });
      }
      CSV.push(headerRow);
    });

    if (renderRows.length > 0) {
      renderRows.forEach((row: { values: { [s: string]: unknown } | ArrayLike<unknown> }) => {
        const dataRow: unknown[] = [];

        Object.values(row.values).forEach((value) => dataRow.push(value));

        CSV.push(dataRow);
      });
    }

    return CSV;
  };

  return [getCSV];
}
