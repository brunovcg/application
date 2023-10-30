import { useId, ForwardedRef, forwardRef, useContext, ChangeEvent, useState, useEffect } from 'react';
import StyledCheckbox from './Checkbox.styled';
import { CheckboxProps } from './Checkbox.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { FormContext } from '../form/Form';
import Icon from '../../icon/Icon';

function Checkbox(
  { label, onChange, checked, onClick, name, disabled, dataTestId, ...rest }: CheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
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
    ['im-checkbox']: true,
    ['im-checked']: checked,
    ['im-disabled']: disabled,
  });

  useEffect(() => {
    if (!!checked !== selected) {
      setSelected(!!checked);
    }
  }, [checked]);

  return (
    <StyledCheckbox className={classes} selected={selected} hasLabel={!!label}>
      <input
        data-testid={dataTestId}
        key={JSON.stringify(selected)}
        id={inputId}
        disabled={disabled}
        type="checkbox"
        checked={selected}
        onChange={handleChange}
        ref={ref}
        onClick={() => onClick?.(!selected)}
        {...rest}
      />
      <label htmlFor={inputId} className="im-checkbox-span">
        <Icon icon="checkbox" className="im-checkbox-icon" size="tiny" weight="fill" variant="white" />
      </label>
      {label && <label htmlFor={inputId}>{label}</label>}
    </StyledCheckbox>
  );
}

export default forwardRef(Checkbox);
