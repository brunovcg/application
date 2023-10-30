import { ExportToExcelColumnType, ExportToExcelHeaderRowType } from '../Table.types';
import generateExcel from 'zipcelx';
import { Row, HeaderGroup } from 'react-table';

export default function useExportToExcel(renderRows: Row[], headerGroups: HeaderGroup[], label?: string, filename?: string) {
  function getHeader(column: ExportToExcelColumnType) {
    if (column.totalHeaderCount === 1) {
      return [
        {
          value: column.Header,
          type: 'string',
        },
      ];
    }
    return [
      {
        value: column.Header,
        type: 'string',
      },
    ];
  }

  function getExcel() {
    const config = {
      filename: filename ?? label ?? 'im-table',
      sheet: {
        data: [],
      },
    };

    const dataSet: unknown[] = config.sheet.data;

    headerGroups.forEach((headerGroup: HeaderGroup) => {
      const headerRow: ExportToExcelHeaderRowType[] = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach((column) => {
          const rowHasData = renderRows.find((row: Row) => row.values[column.id]);
          if (rowHasData) {
            headerRow.push(...getHeader(column as ExportToExcelColumnType));
          }
        });
      }

      dataSet.push(headerRow);
    });

    if (renderRows.length > 0) {
      renderRows.forEach((row: { values: { [s: string]: unknown } | ArrayLike<unknown> }) => {
        const dataRow: { value: unknown; type: string }[] = [];

        Object.values(row.values).forEach((value) =>
          dataRow.push({
            value,
            type: typeof value === 'number' ? 'number' : 'string',
          })
        );

        dataSet.push(dataRow);
      });
    } else {
      dataSet.push([
        {
          value: 'No data',
          type: 'string',
        },
      ]);
    }
    return generateExcel(config);
  }
  return [getExcel];
}
