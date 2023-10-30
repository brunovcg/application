import { useId, ForwardedRef, forwardRef, useContext, ChangeEvent, useState, useEffect } from 'react';
import StyledRadio from './Radio.styled';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { FormContext } from '../form/Form';
import Icon from '../../icon/Icon';
import { RadioProps } from './Radio.types';

function Radio({ label, onChange, checked, name, disabled, ...rest }: RadioProps, ref: ForwardedRef<HTMLInputElement>) {
  const inputId = useId();
  const { setValue } = useContext(FormContext);
  const isHookForm = !!name;
  const [selected, setSelected] = useState(!!checked);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) {
      return;
    }
    setSelected((state) => !state);
    onChange?.(e);
    if (isHookForm) {
      setValue(name, e);
    }
  };

  const classes = ClassNameHelper.conditional({
    ['im-radio']: true,
    ['im-checked']: checked,
    ['im-disabled']: disabled,
  });

  useEffect(() => {
    setSelected(!!checked);
  }, [checked]);

  return (
    <StyledRadio className={classes} selected={selected}>
      <input
        key={JSON.stringify(selected)}
        id={inputId}
        disabled={disabled}
        type="radio"
        checked={selected}
        onChange={handleChange}
        name={name}
        ref={ref}
        {...rest}
      />
      <label htmlFor={inputId} className="im-radio-span">
        <Icon icon="checkbox" className="im-radio-icon" size="tiny" weight="fill" variant="white" />
      </label>
      {label && <label htmlFor={inputId}>{label}</label>}
    </StyledRadio>
  );
}

export default forwardRef(Radio);
