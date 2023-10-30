import { ChangeEvent, ForwardedRef, forwardRef, useContext, useId, useRef, useState, useImperativeHandle } from 'react';
import { ButtonIcon, Container } from '../../..';
import StyledCurrency from './InputCurrency.styled';
import { FormContext } from '../form/Form';
import { ClassNameHelper, MaskHelper } from '../../../../../utils/helpers';
import { useOnClickOutside, useOnKeyPress } from '../../../../../utils/hooks';
import { InputCurrencyProps, InputCurrencyRef } from './InputCurrency.types';
import Constants from '../../../../../utils/constants/Constants';

const { maskCurrency } = MaskHelper.input;
const { NOT_NUMBER_CURRENCY_SEPARATORS } = Constants.REGEX;

function InputCurrency(
  {
    label,
    initValue = 0,
    onBlur,
    name,
    currency = 'en-US',
    canReset = true,
    disabled,
    width,
    optionalLabel,
    requiredLabel,
    showError = true,
  }: InputCurrencyProps,
  ref: ForwardedRef<InputCurrencyRef>
) {
  const handleCurrency = (currencyValue: string | number) => maskCurrency(currencyValue, currency);

  const currencyId = useId();
  const { setValue, errors, setError, isFieldRequired, register } = useContext(FormContext);
  const [inputValue, setInputValue] = useState(handleCurrency(initValue));
  const error = errors?.[String(name)]?.message as string;
  const [isFocused, setIsFocused] = useState(false);

  const isResettable = canReset && handleCurrency(initValue) !== inputValue && inputValue;

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = handleCurrency(e.target.value);

    setInputValue(newValue.replace(NOT_NUMBER_CURRENCY_SEPARATORS, ''));

    if (name) {
      setValue?.(name, newValue);
    }

    if (name) {
      setError(name, { message: '', type: '' });
    }
  };

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    const changedValue = handleCurrency(inputValue);

    setInputValue(changedValue);

    if (name) {
      setValue?.(name, changedValue);
    }
    setIsFocused(false);
    onBlur?.(changedValue);
  };

  const currencyRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(currencyRef, () => setIsFocused(false));

  const resetInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    setInputValue(handleCurrency(initValue));
    if (name) {
      setError(name, { message: '', type: '' });
      setValue?.(name, handleCurrency(initValue));
    }
  };

  const clearInputValue = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();

    setInputValue(handleCurrency('0'));

    if (name) {
      setError(name, { message: '', type: '' });
      setValue?.(name, handleCurrency('0'));
    }
  };

  const classes = ClassNameHelper.conditional({
    ['im-input-currency']: true,
    ['im-negative']: Number(inputValue) < 0,
  });

  const focus = () => inputRef.current?.focus();
  useImperativeHandle(ref, () => ({ resetInputValue, clearInputValue, focus }));

  const hasRequiredLabel = requiredLabel || (name ? isFieldRequired?.(name) : false);

  useOnKeyPress({
    keys: ['Tab'],
    callback: (e) => {
      e?.preventDefault();
      if (name) {
        setInputValue(handleCurrency(inputRef?.current?.value ?? '0'));
        setValue?.(name, handleCurrency(inputRef?.current?.value ?? '0'));
      }
    },
  });

  return (
    <StyledCurrency className={classes} width={width}>
      <Container
        ref={currencyRef}
        className="im-input-currency-container"
        label={label}
        disabled={disabled}
        hoverable
        optionalLabel={optionalLabel}
        requiredLabel={hasRequiredLabel}
        error={!!error}
        focus={isFocused}
        htmlFor={currencyId}
        errorMessage={error}
        showError={!!name && showError}
      >
        <input
          className="im-input-currency-input"
          id={currencyId}
          onFocus={handleFocus}
          onChange={handleChange}
          onBlur={handleBlur}
          value={inputValue}
          name={name}
          ref={(e) => {
            if (name && !!register) {
              const { ref: hookFormRef } = register(name);
              hookFormRef(e);
              inputRef.current = e;
            }
          }}
        />
        {canReset && (
          <ButtonIcon
            icon="undo"
            onClick={resetInputValue}
            disabled={disabled}
            error={!!error}
            hide={!isResettable || disabled}
            size="tiny"
            stopPropagation
            preventDefault
          />
        )}
      </Container>
    </StyledCurrency>
  );
}

export default forwardRef(InputCurrency);
