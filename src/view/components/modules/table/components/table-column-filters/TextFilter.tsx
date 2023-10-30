import { Popover, InputText, Icon } from '../../../..';
import { ColumnFilterProps } from '../../root-component/Table.types';
import { useTranslation } from 'react-i18next';

export default function TextFilter({ column }: ColumnFilterProps) {
  const { filterValue, setFilter } = column;

  const { t } = useTranslation();

  return (
    <Popover
      title={t('Components.Table.ColumnFilter')}
      content={<InputText value={filterValue || ''} debounce={400} onChange={setFilter} placeholder={t('Components.Table.ColumnFilter')} />}
      trigger={<Icon icon="filter" variant={filterValue ? 'primary' : 'medium'} />}
      stopPropagation
    />
  );
}
