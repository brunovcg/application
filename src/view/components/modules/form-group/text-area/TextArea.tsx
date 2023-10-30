import { useId, useState, useRef, useEffect, useImperativeHandle, forwardRef, useContext, ForwardedRef } from 'react';
import { ButtonIcon, Container, RemainingCharacters } from '../../..';
import StyledTextArea from './TextArea.styled';
import { TextAreaForwardRef, TextAreaProps } from './TextArea.types';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { useDebounce } from '../../../../../utils/hooks';
import { FormContext } from '../form/Form';
import { RemainingCharactersRef } from '../../remaining-characters/RemainingCharacters.types';
import { useTranslation } from 'react-i18next';

const { conditional } = ClassNameHelper;

function TextArea(
  {
    onChange,
    name,
    label,
    placeholder,
    className = '',
    initialValue = '',
    maxLength,
    disabled = false,
    width,
    maxWidth,
    height,
    showHeader = true,
    debounce = 0,
    optionalLabel,
    requiredLabel,
    showError = true,
    allowClear = true,
    allowReset = true,
  }: TextAreaProps,
  ref?: ForwardedRef<TextAreaForwardRef>
) {
  const { t } = useTranslation();
  const { register, getValues, resetField, errors, setFocus, setValue, isFieldRequired } = useContext(FormContext);
  const initialTextAreaValue = initialValue ?? (name ? getValues?.()[String(name) as keyof object] : initialValue) ?? '';
  const [textareaValue, setTextAreaValue] = useState(initialTextAreaValue);
  const textareaId = useId();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const remainingCharactersRef = useRef<RemainingCharactersRef | null>(null);
  const error = errors?.[String(name)]?.message as string;
  const isMaxLengthSet = !!maxLength;
  const isHookForm = !!name;
  const { debouncedValue } = useDebounce({ value: textareaValue, delay: debounce });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const typedValue = typeof e === 'string' ? e : e?.target?.value;

    if (textareaRef.current) {
      textareaRef.current?.focus();
    }

    remainingCharactersRef.current?.setRemainingChars((maxLength ?? 0) - typedValue?.length);
    setTextAreaValue(typedValue);

    if (!debounce) {
      onChange?.(typedValue);
    }
  };

  const clearTextAreaValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    onChange?.('');
    setTextAreaValue('');
    remainingCharactersRef.current?.setRemainingChars(maxLength ?? 0);

    if (isHookForm) {
      resetField?.(name);
      setFocus(name);
      setValue(name, '');
    } else {
      textareaRef.current?.focus();
    }
  };

  const resetTextAreaValue = () => {
    setTextAreaValue(initialValue ?? '');
    remainingCharactersRef.current?.setRemainingChars(initialValue && maxLength ? maxLength - initialValue.length : 0);
  };

  const focus = () => textareaRef.current?.focus();

  useImperativeHandle(ref, () => ({ reset: resetTextAreaValue, focus }));

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const customProps = () => {
    if (isHookForm) {
      return {
        ...register?.(name, {
          onChange: handleChange,
          onBlur: handleBlur,
        }),
      };
    }

    return { ref: textareaRef, onChange: handleChange, onBlur: handleBlur };
  };

  const textareaClasses = conditional({
    ['im-textarea']: true,
    [`${className}`]: !!className,
  });

  useEffect(() => {
    if (debounce && !isHookForm) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (initialValue && name) {
      setValue(name, initialValue);
    }
  }, [initialValue]);

  const hasRequiredLabel = requiredLabel || (name ? isFieldRequired?.(name) : false);

  const canClear = allowClear && textareaValue;
  const canReset = initialTextAreaValue && allowReset && initialTextAreaValue !== textareaValue;

  return (
    <StyledTextArea height={height} width={width} maxWidth={maxWidth} className={textareaClasses}>
      {isMaxLengthSet && showHeader && (
        <div className="im-textarea-header">
          {isMaxLengthSet && (
            <div className="im-textarea-remaining-characters">
              {<RemainingCharacters remainingCharacters={maxLength} disabled={disabled} ref={remainingCharactersRef} />}
            </div>
          )}
        </div>
      )}
      <Container
        className="im-textarea-body"
        label={label}
        htmlFor={textareaId}
        focus={isFocused}
        error={!!error}
        disabled={disabled}
        hoverable
        variant="light"
        optionalLabel={optionalLabel}
        errorMessage={error}
        showError={!!name && showError}
        requiredLabel={hasRequiredLabel}
      >
        <textarea
          className="im-textarea-field"
          id={textareaId}
          maxLength={maxLength}
          placeholder={placeholder ?? t('Common.EnterValue')}
          disabled={disabled}
          onFocus={handleFocus}
          value={textareaValue}
          {...customProps()}
        />

        <div className="im-text-area-buttons">
          {canClear && (
            <ButtonIcon
              icon="close"
              onClick={clearTextAreaValue}
              disabled={disabled}
              error={!!error}
              hide={disabled}
              dataTestId="im-textarea-clear"
              preventDefault
              size="small"
              stopPropagation
            />
          )}
          {canReset && (
            <ButtonIcon
              icon="undo"
              onClick={resetTextAreaValue}
              disabled={disabled}
              error={!!error}
              hide={disabled}
              dataTestId="im-textarea-reset"
              size="small"
              preventDefault
              stopPropagation
            />
          )}
        </div>
      </Container>
    </StyledTextArea>
  );
}

export default forwardRef(TextArea);
