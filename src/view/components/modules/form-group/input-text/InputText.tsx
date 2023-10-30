import { useId, useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext, ForwardedRef } from 'react';
import { ButtonIcon, Container, LoadingSpinner, RemainingCharacters } from '../../..';
import StyledInput from './InputText.styled';
import { InputTextRef, InputTextProps } from './InputText.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { useDebounce, useOnClickOutside } from '../../../../../utils/hooks';
import { FormContext } from '../form/Form';
import { RemainingCharactersRef } from '../../remaining-characters/RemainingCharacters.types';
import { useTranslation } from 'react-i18next';

const { conditional } = ClassNameHelper;

function InputText(
  {
    onChange,
    onBlur,
    name,
    label,
    placeholder,
    valid,
    className = '',
    maxLength,
    disabled = false,
    onSearch,
    canReset = false,
    canClear = true,
    initialValue,
    width,
    maxWidth,
    height,
    showHeader = true,
    debounce = 0,
    optionalLabel,
    requiredLabel,
    autoComplete,
    value,
    showError = true,
    maskFunction,
    dataTestId,
    loading,
  }: InputTextProps,
  ref?: ForwardedRef<InputTextRef>
) {
  const { t } = useTranslation();
  const { register, getValues, setError, resetField, errors, setFocus, setValue, isFieldRequired } = useContext(FormContext);
  const initialInputValue = initialValue ?? (name ? getValues?.()[String(name) as keyof object] : value) ?? '';
  const [inputValue, setInputValue] = useState(initialInputValue);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const remainingCharactersRef = useRef<RemainingCharactersRef | null>(null);
  const error = errors?.[String(name)]?.message as string;
  const isMaxLengthSet = !!maxLength;
  const isHookForm = !!name;
  const { debouncedValue } = useDebounce({ value: inputValue, delay: debounce });

  const isResettable = canReset && initialValue != inputValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let typedValue = typeof e === 'string' ? e : e?.target?.value;

    if (maskFunction) {
      typedValue = maskFunction(typedValue);
    }

    remainingCharactersRef.current?.setRemainingChars((maxLength ?? 0) - typedValue?.length);

    setInputValue(typedValue);

    if (name) {
      setError?.(name, { message: '' });
    }

    if (!debounce) {
      onChange?.(typedValue);
    }
  };

  const isValid = typeof valid === 'boolean' ? valid : valid?.(inputValue);

  const clearInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onSearch?.('');
    onChange?.('');
    setInputValue('');
    remainingCharactersRef.current?.setRemainingChars(maxLength ?? 0);

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (initialValue && name) {
      if (maxLength) {
        remainingCharactersRef.current?.setRemainingChars(maxLength - initialValue.length);
      }

      setInputValue(initialValue);
      setValue?.(name, initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (value && value !== inputValue) {
      if (maxLength) {
        remainingCharactersRef.current?.setRemainingChars(maxLength - value.length);
      }
      setInputValue(value);
    }
  }, [value]);

  const resetInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onBlur?.(initialValue ?? '');
    setInputValue(initialValue);
    remainingCharactersRef.current?.setRemainingChars(value && maxLength ? maxLength - value.length : 0);
  };

  const focus = () => inputRef.current?.focus();

  useImperativeHandle(ref, () => ({ resetInputValue, clearInputValue, focus }));

  const handleSearch = () => onSearch?.(inputValue);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    onBlur?.(inputValue);
    setIsFocused(false);
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
    ['im-input-text']: true,
    ['im-valid']: !!isValid,
    [`${className}`]: !!className,
  });

  const inputContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputContainerRef, () => setIsFocused(false));

  useEffect(() => {
    if (debounce && !isHookForm) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);

  return (
    <StyledInput height={height} width={width} maxWidth={maxWidth} className={inputClasses}>
      {maxLength !== undefined && showHeader && (
        <div className="im-input-text-header">
          {isMaxLengthSet && (
            <div className="im-input-text-remaining-characters">
              {<RemainingCharacters remainingCharacters={maxLength} disabled={disabled} ref={remainingCharactersRef} />}
            </div>
          )}
        </div>
      )}
      <Container
        ref={inputContainerRef}
        className="im-input-text-body"
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
          data-testid={dataTestId ?? 'im-input-text'}
          className="im-input-text-field"
          id={inputId}
          maxLength={maxLength}
          placeholder={placeholder ?? t('Common.EnterValue')}
          disabled={disabled}
          onFocus={handleFocus}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          value={inputValue}
          autoComplete={autoComplete}
          {...customProps()}
        />
        {onSearch && (
          <span className="im-input-text-search">
            <ButtonIcon
              icon="search"
              onClick={handleSearch}
              size="tiny"
              disabled={disabled}
              error={!!error}
              hide={!inputValue || disabled}
            />
          </span>
        )}
        {loading && <LoadingSpinner size="tiny" />}
        {canReset && (
          <ButtonIcon
            icon="undo"
            onClick={resetInputValue}
            disabled={disabled}
            error={!!error}
            hide={!isResettable || disabled}
            dataTestId="im-input-text-reset"
            size="tiny"
          />
        )}
        {canClear && (
          <ButtonIcon
            icon="close"
            onClick={clearInputValue}
            disabled={disabled}
            error={!!error}
            hide={!inputValue || disabled}
            size="tiny"
            dataTestId="im-input-text-clear"
          />
        )}
      </Container>
    </StyledInput>
  );
}

export default forwardRef(InputText);
