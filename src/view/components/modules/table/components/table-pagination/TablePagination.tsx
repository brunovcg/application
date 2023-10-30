import { ButtonIcon, Icon, Tooltip } from '../../../..';
import { AllTableSize, TablePaginationProps } from '../../root-component/Table.types';
import StyledTablePagination from './TablePagination.styled';
import { useTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/constants/Constants';
import { useTranslationPath } from '../../../../../../utils/hooks';

const { ALL_TABLE_SIZE } = Constants.COMPONENTS.table;

export default function TablePagination({
  currentPage,
  pageCount,
  limit,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
  paginate,
  totalResults,
  goToFirstPage,
  goToLastPage,
  handleLimitChange,
  isUncontrolled,
  totalFilteredRows,
}: TablePaginationProps) {
  const { t } = useTranslation();
  const tablePath = useTranslationPath('Components.Table');

  const setLimit = isUncontrolled || String(limit) !== ALL_TABLE_SIZE ? limit : totalResults;
  const setOptionValue = (size: number | AllTableSize) => (isUncontrolled || String(size) !== ALL_TABLE_SIZE ? size : totalResults);

  return (
    <StyledTablePagination className="im-table-pagination" data-testid="im-table-pagination">
      {totalFilteredRows !== totalResults && (
        <>
          <div className="im-table-pagination-total">
            {t(tablePath('FilteredRows'))}
            <strong>{totalFilteredRows}</strong>
          </div>
          <Icon icon="separator" weight="fill" />
        </>
      )}
      <div className="im-table-pagination-total">
        {t(tablePath('TotalRows'))}
        <strong>{totalResults}</strong>
      </div>
      <Icon icon="separator" weight="fill" />
      <div className="im-table-pagination-pages">
        {t(tablePath('Page'))}
        <strong>
          {currentPage} {t(tablePath('Of'))} {pageCount}
        </strong>
      </div>
      <Icon icon="separator" weight="fill" />
      <div className="im-table-pagination-size">
        {t(tablePath('PageSize'))}:{'  '}
        <select value={setLimit} onChange={handleLimitChange}>
          {paginate?.map((size) => (
            <option key={size} value={setOptionValue(size)}>
              {size == ALL_TABLE_SIZE ? t('Common.All') : size}
            </option>
          ))}
        </select>
      </div>
      <Icon icon="separator" weight="fill" />
      <div className="im-table-pagination-buttons">
        <Tooltip
          content={t(tablePath('FirstPage'))}
          side="top"
          trigger={
            <ButtonIcon
              showBorder
              disabled={!canPreviousPage}
              variant="primary"
              onClick={goToFirstPage}
              iconWeight="bold"
              icon="arrowStart"
            />
          }
        />
        <Tooltip
          content={t(tablePath('PreviousPage'))}
          side="top"
          trigger={
            <ButtonIcon
              showBorder
              disabled={!canPreviousPage}
              onClick={() => previousPage()}
              variant="primary"
              icon="arrowBack"
              iconWeight="bold"
            />
          }
        />
        <Tooltip
          content={t(tablePath('NextPage'))}
          side="top"
          trigger={
            <ButtonIcon
              showBorder
              disabled={!canNextPage}
              onClick={nextPage}
              variant="primary"
              icon="arrowForward"
              iconWeight="bold"
              dataTestId="im-pagination-next"
              size="medium"
            />
          }
        />
        <Tooltip
          content={t(tablePath('LastPage'))}
          side="top"
          trigger={
            <ButtonIcon showBorder disabled={!canNextPage} icon="arrowEnd" onClick={goToLastPage} variant="primary" iconWeight="bold" />
          }
        />
      </div>
    </StyledTablePagination>
  );
}
