import { useId, useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext, ForwardedRef, useMemo } from 'react';
import { ButtonIcon, Container } from '../../..';
import StyledInput from './InputNumber.styled';
import { InputNumberRef, InputNumberProps } from './InputNumber.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { useOnClickOutside } from '../../../../../utils/hooks';
import { FormContext } from '../form/Form';
import { useTranslation } from 'react-i18next';

const convert = (number: number | string) => {
  const stringify = String(number);

  if (stringify.startsWith('0') && stringify.length > 1) {
    return stringify.slice(1, stringify.length);
  }

  if (stringify === '') {
    return '0';
  }

  return stringify;
};

const { conditional } = ClassNameHelper;

function InputNumber(
  {
    onChange,
    onBlur,
    onFocus,
    name,
    label,
    placeholder,
    valid,
    validIfChanged,
    className = '',
    max,
    min,
    disabled = false,
    onSearch,
    allowReset = true,
    allowClear = true,
    initialValue,
    width,
    flex,
    maxWidth,
    height,
    optionalLabel,
    requiredLabel,
    value,
    showError = true,
    showArrows = true,
    dataTestId,
    testInstance,
    step = 1,
    percent,
    minWidth,
  }: InputNumberProps,
  ref?: ForwardedRef<InputNumberRef>
) {
  const { t } = useTranslation();
  const { register, resetField, errors, setFocus, setValue, isFieldRequired, setError } = useContext(FormContext);
  const effectiveInitValue = useMemo(() => {
    if (initialValue && min) {
      return Math.min(min, Number(initialValue));
    }

    if (initialValue) {
      return initialValue;
    }
    if (min) {
      return min;
    }

    return '';
  }, [initialValue]);
  const [inputValue, setInputValue] = useState(effectiveInitValue ?? '0');
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const error = errors?.[String(name)]?.message as string;
  const isHookForm = !!name;

  const isResettable = allowReset && effectiveInitValue !== inputValue;
  const isClearable = allowClear && inputValue !== '0';

  const handleChange = (newValue: string | React.ChangeEvent<HTMLInputElement>) => {
    newValue = typeof newValue === 'string' ? newValue : newValue.target.value;

    if (inputRef.current) {
      inputRef.current?.focus();
    }

    const validatedNumber = Number.isNaN(Number(newValue)) ? 0 : Number(newValue);

    onChange?.(validatedNumber);

    setInputValue(convert(newValue));

    if (isHookForm) {
      setValue(name, convert(newValue));
      setError(name, { message: '' });
    }
  };

  const isValid = useMemo(() => {
    const validProp = typeof valid === 'boolean' ? valid : valid?.(inputValue);
    const validIfChangeProp = validIfChanged && inputValue !== effectiveInitValue;

    return validProp || validIfChangeProp;
  }, [valid, inputValue, validIfChanged, effectiveInitValue]);

  const clearInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
    e?.stopPropagation();
    e?.preventDefault();
    onSearch?.(0);
    onChange?.(0);
    setInputValue('0');

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      inputRef.current?.focus();
    }
  };

  const resetInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
    e?.stopPropagation();
    e?.preventDefault();
    onBlur?.(Number(effectiveInitValue ?? 0));
    setInputValue(effectiveInitValue ?? '0');
  };

  useImperativeHandle(ref, () => ({ resetInputValue, clearInputValue }));

  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);

    if (Number.isNaN(Number(inputValue))) {
      onBlur?.(min ?? 0);
      return setInputValue(convert(min ?? 0));
    }

    if (max !== undefined && Number(inputValue) > max) {
      onBlur?.(max);
      return setInputValue(convert(max));
    }

    if (min !== undefined && Number(inputValue) < min) {
      onBlur?.(min);
      return setInputValue(convert(min));
    }
    onFocus?.(Number(inputValue));
    onBlur?.(Number(inputValue));
  };

  const customProps = () => {
    if (isHookForm) {
      return {
        ...register?.(name, {
          onChange: handleChange,
          onBlur: handleBlur,
        }),
      };
    }

    return { ref: inputRef, onChange: handleChange, onBlur: handleBlur };
  };

  const inputClasses = conditional({
    ['im-input-number']: true,
    ['im-valid']: !!isValid,
    [`${className}`]: !!className,
    ['im-percent']: !!percent,
    ['im-disabled']: !!disabled,
  });

  const inputContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputContainerRef, () => setIsFocused(false));

  useEffect(() => {
    if (effectiveInitValue) {
      setInputValue(effectiveInitValue);
      // if (effectiveInitValue !== inputValue) {
      //   onBlur?.(Number(effectiveInitValue));
      // }
      onChange?.(Number(effectiveInitValue));
      if (name) {
        setValue(name, convert(effectiveInitValue));
      }
    }
  }, [effectiveInitValue]);

  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);

  const canSubtract = min === undefined ? true : !!(min !== undefined && Number(inputValue) > min);
  const canAdd = max === undefined ? true : !!(max && Number(inputValue) < max);

  const formatTestId = (testId: string) => {
    if (testInstance) {
      return `${testId}-${testInstance}`;
    }
    return testId;
  };

  return (
    <StyledInput
      height={height}
      width={width}
      maxWidth={maxWidth}
      className={inputClasses}
      flex={flex}
      minWidth={minWidth}
      key={effectiveInitValue}
    >
      <Container
        ref={inputContainerRef}
        className="im-input-number-body"
        label={label}
        htmlFor={inputId}
        focus={isFocused}
        error={!!error}
        disabled={disabled}
        hoverable
        optionalLabel={optionalLabel}
        valid={!!isValid}
        requiredLabel={hasRequiredLabel}
        errorMessage={error}
        showError={!!name && showError}
      >
        <input
          className="im-input-number-field"
          data-testid={dataTestId}
          type="text"
          inputMode="numeric"
          id={inputId}
          placeholder={placeholder ?? t('Common.EnterValue')}
          disabled={disabled}
          max={max}
          min={min}
          onFocus={handleFocus}
          value={inputValue}
          {...customProps()}
        />
        {percent && <div className="im-input-number-percent-symbol">%</div>}
        {showArrows && !disabled && (
          <ButtonIcon
            onClick={() => handleChange(String(Number(inputValue) - step))}
            icon="arrowBack"
            size="tiny"
            preventDefault
            stopPropagation
            hide={!canSubtract}
            iconWeight="bold"
            dataTestId={formatTestId('im-input-number-decrease')}
          />
        )}
        {showArrows && !disabled && (
          <ButtonIcon
            onClick={() => handleChange(String(Number(inputValue) + step))}
            icon="arrowForward"
            size="tiny"
            preventDefault
            stopPropagation
            hide={!canAdd}
            iconWeight="bold"
            dataTestId={formatTestId('im-input-number-increase')}
          />
        )}
        {allowReset && (
          <ButtonIcon
            icon="undo"
            onClick={resetInputValue}
            stopPropagation
            disabled={disabled}
            error={!!error}
            hide={!isResettable || disabled}
            size="tiny"
          />
        )}
        {allowClear && (
          <ButtonIcon
            icon="close"
            onClick={clearInputValue}
            stopPropagation
            disabled={disabled}
            error={!!error}
            hide={!isClearable || disabled}
            size="tiny"
            dataTestId="im-input-number-clear"
          />
        )}
      </Container>
    </StyledInput>
  );
}

export default forwardRef(InputNumber);
