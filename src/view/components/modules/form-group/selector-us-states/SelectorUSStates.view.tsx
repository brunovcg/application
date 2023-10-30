import { ForwardedRef, forwardRef } from 'react';
import { Selector } from '../../..';
import { SelectorUSStatesViewProps } from './SelectorUSStates.types';
import { SelectorRef } from '../selector/Selector.types';
import { ClassNameHelper } from '../../../../../utils/helpers';

function SelectorUSStatesView(
  {
    multiple,
    states,
    label,
    initialStates,
    width,
    name,
    onSelect,
    showError,
    className,
    headerEqualizer,
    disabled,
    loading,
  }: SelectorUSStatesViewProps,
  ref: ForwardedRef<SelectorRef>
) {
  const classes = ClassNameHelper.conditional({ ['im-selector-us-states']: true, [`${className}`]: !!className });

  return (
    <Selector
      loading={loading}
      options={states}
      multiple={multiple}
      optionsInRow
      label={label}
      initValue={initialStates}
      ref={ref}
      width={width}
      name={name}
      onSelect={onSelect as (output: unknown[]) => void}
      allowSearch={false}
      showError={!!name && showError}
      className={classes}
      headerEqualizer={headerEqualizer}
      listMaxHeight={350}
      testInstance="us-states"
      selectedBorder
      disabled={disabled}
    />
  );
}

export default forwardRef(SelectorUSStatesView);
