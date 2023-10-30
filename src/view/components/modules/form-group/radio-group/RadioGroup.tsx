import { ForwardedRef, forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react';
import Container from '../../container/Container';
import { FormContext } from '../form/Form';
import StyledRadioGroup from './RadioGroup.styled';
import { RadioGroupProps, RadioOption, RadioGroupRef } from './RadioGroup.types';
import Radio from '../radio/Radio';
import { ClassNameHelper } from '../../../../../utils/helpers';

function RadioGroup(
  {
    options,
    width,
    maxWidth,
    name,
    onChange,
    label,
    row = false,
    disabled,
    requiredLabel,
    className,
    accessor = 'id',
    showError = true,
    center,
    headerEqualizer,
  }: RadioGroupProps,
  ref: ForwardedRef<RadioGroupRef>
) {
  const { setValue, isFieldRequired, errors, setError } = useContext(FormContext);

  const [output, setOutput] = useState<RadioOption>({} as RadioOption);
  const initState = options.find((item) => item.checked);
  useEffect(() => {
    setOutput(initState as RadioOption);
    if (name) {
      setValue(name, initState);
    }
  }, []);

  const handleChange = (item: RadioOption) => {
    setOutput(item);
    onChange?.(item);

    if (name) {
      setValue(name, item);
      setError(name, { message: '' });
    }
  };

  const resetRadioGroup = () => {
    setOutput(initState as RadioOption);
    if (name) {
      setValue(name, initState);
    }
  };

  useImperativeHandle(ref, () => ({ resetRadioGroup }));

  const error = errors?.[String(name)]?.message as string;

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);

  const classes = ClassNameHelper.conditional({ ['im-radio-group']: true, [`${className}`]: !!className });

  return (
    <StyledRadioGroup className={classes} width={width} row={row} maxWidth={maxWidth} center={center}>
      {headerEqualizer && <div className="im-radio-group-header-equalizer" />}
      <Container
        className="im-radio-group-content"
        label={label}
        requiredLabel={hasRequiredLabel}
        error={!!error}
        hoverable
        errorMessage={error}
        showError={!!name && showError}
      >
        {options.map((item) => (
          <Radio
            key={item?.[accessor as keyof typeof item] as string}
            label={item.label}
            onChange={() => handleChange(item)}
            checked={item?.[accessor as keyof typeof item] === output?.[accessor as keyof typeof output]}
            disabled={item.disabled ?? disabled}
          />
        ))}
      </Container>
    </StyledRadioGroup>
  );
}

export default forwardRef(RadioGroup);
