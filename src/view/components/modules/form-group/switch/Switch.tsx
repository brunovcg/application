'use client';
import { useContext, useEffect, useState } from 'react';
import { SwitchProps } from './Switch.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import StyledSwitch from './Switch.styled';
import LoadingSpinner from '../../loading-spinner/LoadingSpinner';
import { FormContext } from '../form/Form';
import Container from '../../container/Container';

export default function Switch<LeftOption extends string, RightOption extends string>({
  onChange,
  leftOption,
  label,
  rightOption,
  starts,
  className = '',
  hideLabel = false,
  disabled,
  modeOnOff = false,
  loading,
  name,
  centered,
}: SwitchProps<LeftOption, RightOption>) {
  const [switchState, setSwitchState] = useState<LeftOption | RightOption>(starts ?? leftOption);
  const { setValue } = useContext(FormContext);

  const handleSwitchChange = (option?: LeftOption | RightOption) => () => {
    if (disabled) {
      return;
    }
    if (option) {
      if (option === switchState) {
        return;
      }

      setSwitchState(option);
      onChange?.(option);
      return;
    }
    if (switchState === leftOption) {
      setSwitchState(rightOption);
      onChange?.(rightOption);
      return;
    }
    setSwitchState(leftOption);
    onChange?.(leftOption);
  };

  const classes = ClassNameHelper.conditional({
    ['im-switch']: true,
    [className]: !!className,
    ['im-disabled']: !!disabled,
    ['im-mode-on-off']: modeOnOff,
    ['im-switch-centered']: !!centered,
  });

  const contentClasses = ClassNameHelper.conditional({
    ['im-switch-box']: true,
    ['im-switch-box-state-left']: switchState === leftOption,
    ['im-switch-box-state-right']: switchState === rightOption,
    [className]: !!className,
  });

  useEffect(() => {
    if (name) {
      setValue(name, switchState);
    }
  }, [switchState]);

  return (
    <StyledSwitch className={classes} hasLabel={!!label}>
      <Container label={label} className="im-switch-container" hoverable noBorder={!label}>
        {loading && <LoadingSpinner size="tiny" />}
        {!loading && (
          <>
            <span className="im-switch-option-label" onClick={handleSwitchChange(leftOption)}>
              {!hideLabel && leftOption}
            </span>
            <div onClick={handleSwitchChange()} className={contentClasses} aria-checked role="switch" data-state={switchState}>
              <div className="im-switch-button" />
            </div>
            <span className="im-switch-option-label" onClick={handleSwitchChange(rightOption)}>
              {!hideLabel && rightOption}
            </span>
          </>
        )}
      </Container>
    </StyledSwitch>
  );
}
