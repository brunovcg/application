import { SelectorFilterProps } from './SelectorFilter.types';
import Popover from '../../../../popover/Popover';
import Icon from '../../../../icon/Icon';
import Selector from '../../../../form-group/selector/Selector';
import DataHelper from '../../../../../../../utils/helpers/modules/Data.helper';
import { useTranslation } from 'react-i18next';

const { invertObjectKeysValues } = DataHelper;

export default function SelectorFilter({
  title,
  mappedValues,
  valuesVariant,
  options,
  columnId,
  width,
  setFilter,
  filters,
}: SelectorFilterProps) {
  const handleSelect = (value: unknown[]) => {
    const fields = value.map((item) => mappedValues[item as keyof typeof mappedValues]);

    setFilter(columnId, fields[0]);
  };

  const invertedMappedValues = invertObjectKeysValues(mappedValues);

  const { t } = useTranslation();

  const initialValue = filters.length
    ? [invertedMappedValues[filters.find((item) => item.id === columnId)?.value as keyof typeof invertedMappedValues]]
    : undefined;

  const isFiltered = filters.some((item) => item.id === columnId);

  return (
    <div>
      <Popover
        title={title ?? t('Components.Table.ColumnFilter')}
        content={
          <Selector
            initValue={initialValue as string[]}
            options={options}
            onSelect={handleSelect}
            allowSearch={false}
            showError={false}
            width={width}
            displayColor={valuesVariant}
          />
        }
        trigger={<Icon icon="filter" variant={isFiltered ? 'primary' : 'medium'} />}
      />
    </div>
  );
}
