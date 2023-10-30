import { ClassNameHelper } from '../../../../utils/helpers';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';
import { StyledCell, StyledGrid, StyledHead } from './Grid.styled';
import { GridRow, GridProps, GridCell, Alignment } from './Grid.types';
import { useElementTreeNextZIndex, useTranslationPath } from '../../../../utils/hooks';
import { useRef, MutableRefObject, useMemo, useState } from 'react';
import { InputText, Selector } from '../..';
import { useTranslation } from 'react-i18next';

const { conditional } = ClassNameHelper;

export default function Grid({
  columns,
  rows,
  width,
  maxWidth,
  rowHeight = '40px',
  maxHeight,
  height,
  loading,
  noData,
  className,
  search = false,
  rowPK = 'id',
  onRowClick,
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const headerZIndex = useElementTreeNextZIndex(gridRef as MutableRefObject<HTMLElement>);
  const { t } = useTranslation();
  const path = useTranslationPath('Components.Grid');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const hasPrimaryKey = useMemo(() => {
    if (!rows?.length) {
      return true;
    }
    return rows?.every((row) => row[rowPK as keyof typeof row]);
  }, [rows?.length, rowPK]);

  if (!hasPrimaryKey) {
    console.error(`${Grid.name} Component: Every row must have a id prop or declare a rowPK that all rows have`);
  }

  const mappedRows = useMemo(
    () =>
      rows?.reduce((acc, row, rowIndex) => {
        let mappedRow = { id: `${rowIndex}-${row[rowPK as keyof typeof row]}`, row } as GridRow;
        const cells: GridCell[] = [];

        const filterAccessor = columns?.find((item) => item.component === filterCriteria)?.accessor;

        if (filterValue && filterAccessor && !row[`${filterAccessor}`]?.toLowerCase().includes(filterValue)) {
          return acc;
        }

        columns?.forEach((column, index) => {
          const accessedValue = column.accessor ? row[column?.accessor] : undefined;

          const cell = column.template ? column.template({ row, value: accessedValue, rows, index: rowIndex }) : accessedValue;

          cells.push({
            id: `${row[rowPK as keyof typeof row]}-${column.accessor}-${index}`,
            value: cell,
            cellAlignment: column.cellAlignment as Alignment,
            isTemplate: !!column.template,
            accessor: column.accessor,
          });
        });
        mappedRow = { ...mappedRow, cells };
        acc.push(mappedRow);
        return acc;
      }, [] as GridRow[]),
    [JSON.stringify(rows), filterCriteria, filterValue]
  );

  const tableRenderer = useMemo(
    () => (
      <>
        <table>
          <thead>
            <tr>
              {columns?.map((column) => (
                <StyledHead headerAlignment={column.headerAlignment ?? 'center'} key={column.id}>
                  {column.component ?? column.accessor}
                </StyledHead>
              ))}
            </tr>
          </thead>
          <tbody>
            {mappedRows?.map((row) => (
              <tr key={row.id} onClick={() => onRowClick?.(row)}>
                {row.cells?.map((cell) => (
                  <StyledCell cellAlignment={cell.cellAlignment ?? 'center'} key={cell.id} clickable={!!onRowClick}>
                    {cell.isTemplate ? <div className="im-grid-cell-template">{cell.value}</div> : cell.value}
                  </StyledCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {noData && !mappedRows?.length && <div className="im-grid-no-data">{noData}</div>}
      </>
    ),
    [mappedRows]
  );

  const renderer = loading ? <LoadingSpinner message /> : tableRenderer;

  const classes = conditional({
    [className as string]: !!className,
    ['im-grid']: true,
  });

  return (
    <StyledGrid
      zIndex={headerZIndex}
      className={classes}
      height={height}
      width={width}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      loading={loading ? 1 : 0}
      ref={gridRef}
      rowHeight={rowHeight}
    >
      {search && (
        <div className="im-grid-search">
          <Selector
            className="im-grid-search-criteria"
            label={t(path('FieldSearch'))}
            options={columns?.map((item) => item.component as string) ?? []}
            width="200px"
            onSelect={(inputValue) => setFilterCriteria(inputValue[0] ?? '')}
          />
          <InputText
            label={t(path('Filter'))}
            debounce={300}
            width="200px"
            onChange={(inputValue) => setFilterValue(inputValue?.toLowerCase())}
          />
        </div>
      )}
      {renderer}
    </StyledGrid>
  );
}
