/* eslint-disable @typescript-eslint/no-explicit-any */
import { Row, ColumnInstance, HeaderGroup } from 'react-table';
import { StyledTable, StyledColumnData, StyledColumnHeader } from './Table.styled';
import { TableProps } from './Table.types';
import TablePagination from '../components/table-pagination/TablePagination';
import TableMenu from '../components/table-menu/TableMenu';
import { useTranslation } from 'react-i18next';
import { Icon, LoadingSpinner, MessageContainer, NotificationBubble, Title } from '../../..';
import { ClassNameHelper } from '../../../../../utils/helpers';
import SelectorFilter from '../components/table-column-filters/selector-filter/SelectorFilter';

function Table({
  allowExportExcel = true,
  allowExportCSV = true,
  showGlobalFilter = true,
  showColumnSelection = true,
  showCleanFilters = true,
  paginate,
  noData,
  stickHeader = true,
  headerStyles,
  rowStyles,
  onRowClick,
  tableHeight = '100%',
  label,
  filename,
  loading = true,
  tableInstance,
  customHeader,
  tableMaxWidth,
  tableWidth,
  className,
  info,
  tableType,
  onResetFilters,
}: TableProps) {
  const { t } = useTranslation();

  const setHeaderGroupArgs = (column: ColumnInstance) => {
    if (tableType === 'controlled') {
      return [column?.getSortByToggleProps()];
    }
    return [];
  };

  const {
    getTableProps,
    getTableBodyProps,
    setGlobalFilter,
    headerGroups,
    prepareRow,
    getToggleHideAllColumnsProps,
    globalFilter,
    allColumns,
    memoizedData,
    renderRows,
    hasFilteredValues,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageCount,
    handleLimitChange,
    clearAllFilters,
    currentPage,
    goToFirstPage,
    goToLastPage,
    limit,
    hasManualWidthColumns,
    totalResults,
    isUncontrolled,
    setFilter,
    filters,
    filteredRows,
    serverSortBy,
    handleServerSortBy,
    state,
  } = tableInstance;

  const isServerControlledTable = tableType === 'serverControlled';
  const isControlledTable = tableType === 'controlled';

  const totalFilteredRows = filteredRows?.length;

  const handleRowClick = (rowData: typeof renderRows) => {
    onRowClick?.(rowData);
  };

  const getSortIndex = (id: string, isServerSorted: boolean) => {
    if (!isServerSorted) {
      return state.sortBy.findIndex((item: { id: string; desc: boolean }) => item.id === id) + 1;
    }
    return serverSortBy.findIndex((item: { id: string; desc: boolean }) => item.id === id) + 1;
  };

  const renderOrderingIcon = (column: ColumnInstance) => {
    if (column.disableSortBy) {
      return <div />;
    }

    const serverSorted = serverSortBy?.find((item: { id: string }) => item.id === column.id);
    const isServerSorted = !!serverSorted;
    const isServerSortedDesc = !!serverSorted?.desc;
    const handleServerSortClick = isServerControlledTable ? () => handleServerSortBy(column.id) : undefined;
    const { sortBy } = state;

    const showSortPosition = sortBy?.length > 1 || serverSortBy?.length > 1;

    const sortIconRenderer = (icon: 'sort' | 'sortDesc' | 'sortAsc') => (
      <div className="im-table-sort-button" onClick={handleServerSortClick}>
        <Icon icon={icon} />
        {showSortPosition && <NotificationBubble quantity={getSortIndex(column.id, isServerSorted)} variant="primary" />}
      </div>
    );

    if ((isControlledTable && !column.isSorted) || (isServerControlledTable && !isServerSorted)) {
      return sortIconRenderer('sort');
    }

    if ((isControlledTable && column.isSortedDesc) || (isServerControlledTable && isServerSortedDesc)) {
      return sortIconRenderer('sortDesc');
    }
    return sortIconRenderer('sortAsc');
  };

  const tableClasses = ClassNameHelper.conditional({
    ['im-table']: true,
    [className as string]: !!className,
  });

  const hasRenderedData = renderRows?.length > 0;
  const finishLoadingData = memoizedData !== undefined;
  const hasData = !!memoizedData?.length;
  const renderNoData = (!hasData || !hasRenderedData) && !loading && finishLoadingData;
  const noDataRenderer = () => {
    if (!hasRenderedData && hasData) {
      return t('Components.Table.NoMatches');
    }

    return noData ?? t('Components.Table.NoData');
  };

  return (
    <StyledTable
      className={tableClasses}
      manualWidth={hasManualWidthColumns}
      headerStyles={headerStyles}
      rowStyles={rowStyles}
      clickableRow={!!onRowClick}
      stickHeader={!!stickHeader}
      tableHeight={loading ? '' : tableHeight}
      tableMaxWidth={tableMaxWidth}
      tableWidth={tableWidth}
    >
      {label && <Title text={label} className="im-table-label" size="medium" />}
      <TableMenu
        allColumns={allColumns}
        allowExportExcel={allowExportExcel}
        allowExportCSV={allowExportCSV}
        renderRows={renderRows}
        headerGroups={headerGroups}
        getToggleHideAllColumnsProps={getToggleHideAllColumnsProps}
        showGlobalFilter={showGlobalFilter}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        label={label}
        filename={filename}
        hasFilteredValues={hasFilteredValues}
        clearAllFilters={clearAllFilters}
        customHeader={customHeader}
        onResetFilters={onResetFilters}
        showColumnSelection={showColumnSelection}
        showCleanFilters={showCleanFilters}
        isUncontrolled={isUncontrolled}
      />
      {info && <div className="im-table-info">{!loading && hasData && info}</div>}
      <div className="im-table-wrapper">
        <table {...getTableProps}>
          <thead>
            {headerGroups?.map((headerGroup: HeaderGroup) => (
              // react-table headerGroup.getHeaderGroupProps() already set a key
              // eslint-disable-next-line react/jsx-key
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  // react-table column.getHeaderProps() already set a key
                  // eslint-disable-next-line react/jsx-key
                  <StyledColumnHeader
                    key="1"
                    className="im-table-th"
                    width={column.width ?? 200}
                    {...column.getHeaderProps(...setHeaderGroupArgs(column))}
                  >
                    <div className="im-table-th-container" data-testid={`im-table-header-${column?.Header?.replace?.(' ', '')}`}>
                      <span className="im-table-th-title">{column.render('Header')}</span>
                      {hasData && column?.Filter && column.render('Filter')}
                      {hasData && column?.selectorFilter && (
                        <SelectorFilter {...column?.selectorFilter} setFilter={setFilter} columnId={column.id} filters={filters} />
                      )}{' '}
                      {hasData && renderOrderingIcon(column)}
                    </div>
                  </StyledColumnHeader>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {!loading &&
              renderRows?.map((row: Row) => {
                prepareRow(row);
                return (
                  // react-table row.getRowProps() already set a key
                  // eslint-disable-next-line react/jsx-key
                  <tr
                    className="im-table-row"
                    data-testid="im-table-row"
                    onClick={() => handleRowClick(row.original)}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell: any) => (
                      // react-table row.getCellProps() already set a key
                      // eslint-disable-next-line react/jsx-key
                      <StyledColumnData
                        className="im-table-td"
                        width={cell.column.width ?? 200}
                        alignment={cell.column.alignment}
                        margin={cell.column.margin}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </StyledColumnData>
                    ))}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      {renderNoData && (
        <div className="im-table-no-data">
          {<MessageContainer variant="error" fontSize="medium" width="fit-content" text={noDataRenderer()} />}
        </div>
      )}
      {loading && (
        <div className="im-table-loading">
          <LoadingSpinner size="medium" message />
        </div>
      )}
      {paginate && !loading && hasData && (
        <TablePagination
          currentPage={currentPage}
          pageCount={pageCount}
          paginate={paginate}
          limit={limit}
          handleLimitChange={handleLimitChange}
          goToFirstPage={goToFirstPage}
          goToLastPage={goToLastPage}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
          totalResults={totalResults}
          isUncontrolled={isUncontrolled}
          totalFilteredRows={totalFilteredRows}
        />
      )}
    </StyledTable>
  );
}

export default Table;
