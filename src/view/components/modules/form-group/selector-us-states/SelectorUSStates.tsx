import { useTranslation } from 'react-i18next';
import { statesQueries } from '../../../../../apis/queries';
import { SelectorUSStatesProps } from './SelectorUSStates.types';
import SelectorUSStatesView from './SelectorUSStates.view';
import { useTranslationPath } from '../../../../../utils/hooks';
import { ForwardedRef, forwardRef, useMemo } from 'react';
import { SelectorRef } from '../selector/Selector.types';

const { useListStatesQuery } = statesQueries;

function SelectorUSStates(
  {
    multiple,
    showError = true,
    disabled,
    name,
    onSelect,
    className,
    excludeList,
    onlyList,
    initialStates,
    width,
    headerEqualizer,
  }: SelectorUSStatesProps,
  ref: ForwardedRef<SelectorRef>
) {
  const { states, statesIsLoading } = useListStatesQuery();
  const { t } = useTranslation();
  const path = useTranslationPath('Components.SelectorUSStates');
  const label = multiple ? t(path('States')) : t(path('State'));

  const statesOptions = useMemo(() => {
    if (excludeList) {
      return states.filter((state) => !excludeList.includes(state));
    }

    if (onlyList) {
      return states.filter((state) => onlyList.includes(state));
    }

    return states;
  }, [states]);

  return (
    <SelectorUSStatesView
      width={width}
      multiple={multiple}
      label={label}
      states={statesOptions}
      loading={statesIsLoading}
      showError={!!name && showError}
      disabled={disabled}
      name={name}
      onSelect={onSelect}
      className={className}
      initialStates={initialStates}
      headerEqualizer={headerEqualizer}
      ref={ref}
    />
  );
}

export default forwardRef(SelectorUSStates);
