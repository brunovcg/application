import useExportToExcel from '../../root-component/hooks/useExportToExcel';
import useExportToCSV from '../../root-component/hooks/useExportToCSV';
import { TableMenuProps } from '../../root-component/Table.types';
import TableCheckbox from '../table-checkbox/TableCheckbox';
import { StyledTableMenu, StyledTableMenuSelection } from './TableMenu.styled';
import { CSVLink } from 'react-csv';
import { Button, Popover, InputText, ButtonIcon } from '../../../..';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';
import { InputTextRef } from '../../../form-group/input-text/InputText.types';
import useTranslationPath from '../../../../../../utils/hooks/modules/useTranslationPath';

export default function TableMenu({
  allColumns,
  allowExportExcel,
  allowExportCSV,
  renderRows,
  headerGroups,
  getToggleHideAllColumnsProps,
  showGlobalFilter,
  globalFilter,
  setGlobalFilter,
  label,
  filename,
  hasFilteredValues,
  clearAllFilters,
  customHeader,
  onResetFilters,
  showColumnSelection,
  showCleanFilters,
  isUncontrolled,
}: TableMenuProps) {
  const [getExcel] = useExportToExcel(renderRows, headerGroups, label, filename);
  const [getCSV] = useExportToCSV(renderRows, headerGroups);
  const { t } = useTranslation();
  const tablePath = useTranslationPath('Components.Table');

  const inputRef = useRef<InputTextRef>(null);

  const CSVData = getCSV();
  const CSVFileName = filename ?? label ?? 'im-table';

  const isAllToggled = getToggleHideAllColumnsProps().checked;

  const popoverContent = (
    <StyledTableMenuSelection>
      <div>
        <TableCheckbox {...getToggleHideAllColumnsProps()} label="Toggle All" disabled={isAllToggled} />
      </div>

      {allColumns.map((column) => {
        const header = typeof column.Header === 'string' ? column.Header : column.id;
        return (
          <TableCheckbox
            key={column.id}
            {...column.getToggleHiddenProps()}
            label={header}
            dataTestId={`im-option-${header.replace(' ', '')}`}
          />
        );
      })}
    </StyledTableMenuSelection>
  );

  const handleResetFilters = () => {
    setGlobalFilter('');
    clearAllFilters();
    onResetFilters?.();

    inputRef.current?.clearInputValue();
  };

  const csvRef = useRef<HTMLDivElement>(null);

  const csvComponent = (
    <CSVLink data={CSVData} target="_self" className="im-csv-download" filename={CSVFileName}>
      <div ref={csvRef} />
    </CSVLink>
  );

  return (
    <StyledTableMenu className="im-table-menu">
      <div className="im-table-download-files">
        {customHeader && <div className="im-table-custom-header">{customHeader}</div>}
        {allowExportExcel && (
          <ButtonIcon showBorder icon="fileXLS" dataTestId="im-table-excel" onClick={getExcel} size="large" variant="primary" />
        )}
        {allowExportCSV && (
          <>
            {csvComponent}
            <ButtonIcon
              showBorder
              variant="primary"
              icon="fileCSV"
              onClick={() => {
                csvRef.current?.click();
                getCSV();
              }}
              dataTestId="im-table-csv"
              size="large"
            />
          </>
        )}
      </div>
      {showColumnSelection && (
        <Popover
          content={popoverContent}
          title={t(tablePath('ColumnSelection'))}
          trigger={<ButtonIcon showBorder icon="checklist" dataTestId="im-column-filter-trigger" />}
        />
      )}

      {showCleanFilters && (
        <Button
          styling="text"
          text={t(tablePath('ResetFilters'))}
          disabled={!hasFilteredValues}
          onClick={handleResetFilters}
          icon="filter"
        />
      )}
      {showGlobalFilter && (
        <InputText
          label={isUncontrolled ? t(tablePath('PageFilter')) : t(tablePath('GlobalFilter'))}
          debounce={500}
          width="300px"
          placeholder={t('Common.Search')}
          value={(globalFilter as string) || ''}
          onChange={(e) => setGlobalFilter(e)}
          ref={inputRef}
          canReset={false}
          showError={false}
        />
      )}
    </StyledTableMenu>
  );
}
