import { useId, useState, useRef, useImperativeHandle, forwardRef, useContext, ForwardedRef, ChangeEvent, useEffect } from 'react';
import { ButtonIcon, Container } from '../../..';
import StyledInput from './InputPassword.styled';
import { InputPasswordRef, InputProps } from './InputPassword.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { useDebounce, useOnClickOutside, useTranslationPath } from '../../../../../utils/hooks';
import { FormContext } from '../form/Form';
import { useTranslation } from 'react-i18next';

const { conditional } = ClassNameHelper;

function InputPassword(
  {
    onChange,
    name,
    label,
    placeholder,
    valid,
    className = '',
    disabled = false,
    readOnly = false,
    allowClear = true,
    allowReset = true,
    width,
    flex,
    maxWidth,
    requiredLabel,
    showError = true,
    initValue,
    debounce = 0,
  }: InputProps,
  ref?: ForwardedRef<InputPasswordRef>
) {
  const { t } = useTranslation();
  const path = useTranslationPath('Components.InputPassword');
  const { register, resetField, errors, setFocus, setError, isFieldRequired } = useContext(FormContext);
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(initValue ?? '');
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const error = errors?.[String(name)]?.message as string;
  const isHookForm = !!name;
  const { debouncedValue } = useDebounce({ value: inputValue, delay: debounce });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isHookForm) {
      setError(name, { message: '' });
    }

    setInputValue(e.target.value);
  };

  const isValid = typeof valid === 'boolean' ? valid : valid?.(inputValue);

  const clearInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onChange?.('');
    setInputValue('');

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      inputRef.current?.focus();
    }
  };

  const resetInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    setInputValue(initValue as string);

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
    } else {
      inputRef.current?.focus();
    }
  };

  useImperativeHandle(ref, () => ({ resetInputValue, clearInputValue }));

  const toggleTypePassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    setShowPassword((state) => !state);
  };
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
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

    return { ref: inputRef, onChange: handleChange, onBlur: handleBlur, value: inputValue };
  };

  const inputClasses = conditional({
    ['im-input-password']: true,
    ['im-valid']: !!isValid,
    [`${className}`]: !!className,
  });

  const inputContainerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(inputContainerRef, () => setIsFocused(false));

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);

  useEffect(() => {
    if (initValue) {
      setInputValue(initValue);
    }
  }, [initValue]);

  useEffect(() => {
    if (debounce && !isHookForm) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  const canReset = allowReset && initValue && initValue !== inputValue;

  return (
    <StyledInput width={width} maxWidth={maxWidth} className={inputClasses} flex={flex}>
      <Container
        ref={inputContainerRef}
        className="im-input-password-body"
        label={label ?? t(path('Label'))}
        htmlFor={inputId}
        focus={isFocused}
        error={!!error}
        disabled={disabled || readOnly}
        hoverable
        valid={!!isValid}
        requiredLabel={hasRequiredLabel}
        errorMessage={error}
        showError={!!name && showError}
      >
        <input
          data-testid="im-input-password"
          className="im-input-password-field"
          type={showPassword ? 'text' : 'password'}
          id={inputId}
          placeholder={placeholder ?? t(path('Placeholder'))}
          disabled={disabled}
          readOnly={readOnly}
          onFocus={handleFocus}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
          {...customProps()}
        />
        <ButtonIcon
          icon={showPassword ? 'visibilityOff' : 'visibilityOn'}
          onClick={toggleTypePassword}
          disabled={disabled && !readOnly}
          size="tiny"
          error={!!error}
          hide={disabled || !inputValue || (!readOnly && !inputValue)}
          preventDefault
          stopPropagation
          dataTestId="im-input-password-visibility"
        />
        {allowClear && (
          <ButtonIcon
            icon="close"
            onClick={clearInputValue}
            disabled={disabled}
            error={!!error}
            hide={!inputValue || disabled}
            size="tiny"
            preventDefault
            stopPropagation
            dataTestId="im-input-password-clear"
          />
        )}
        {canReset && (
          <ButtonIcon
            icon="undo"
            onClick={resetInputValue}
            disabled={disabled}
            error={!!error}
            hide={inputValue === initValue}
            size="tiny"
            preventDefault
            stopPropagation
            dataTestId="im-input-password-reset"
          />
        )}
      </Container>
    </StyledInput>
  );
}

export default forwardRef(InputPassword);
