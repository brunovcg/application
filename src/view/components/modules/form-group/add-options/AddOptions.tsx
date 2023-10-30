import { useContext, useEffect, useRef, useState } from 'react';
import { ButtonIcon, Chip, Container, InputText, MessageContainer } from '../../../../components';
import StyledAddAliases from './AddOptions.styled';
import { AddOptionsProps } from './AddOptions.types';
import { FormContext } from '../../../../components/modules/form-group/form/Form';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import { InputTextRef } from '../input-text/InputText.types';

export default function AddOptions({ label, name, width, initialState, onChange, disabled, showError, maxHeight }: AddOptionsProps) {
  const [options, setOptions] = useState<string[]>(initialState ?? []);
  const [inputValue, setInputValue] = useState('');
  const { setValue, setError, errors } = useContext(FormContext);
  const inputRef = useRef<InputTextRef>(null);
  const { t } = useTranslation();
  const path = useTranslationPath('Components.AddOptions');

  const isInputError = !!inputValue && options.includes(inputValue);

  const addButtonDisabled = disabled || !inputValue.trim() || isInputError;

  const handleAdd = () => {
    if (isInputError) {
      return;
    }

    setOptions((state) => [...state, inputValue.trim()]);
    inputRef.current?.clearInputValue();
    setInputValue('');
  };

  const handleDeleteOption = (value: string) => () => setOptions((state) => state.filter((item) => item !== value));

  useEffect(() => {
    if (initialState) {
      setOptions(initialState);
    }
  }, [initialState]);

  useEffect(() => {
    onChange?.(options);

    if (name) {
      setValue(name, options);
      setError(name, { message: '' });
    }
  }, [options]);

  const error = errors[name as keyof typeof errors]?.message as string;

  return (
    <StyledAddAliases className="im-add-options" width={width ?? '100%'} maxHeight={maxHeight}>
      <Container
        variant="light"
        label={label}
        height="100%"
        className="im-add-options-wrapper"
        error={!!error}
        showError={showError}
        errorMessage={error}
      >
        <Container
          variant="light"
          className="im-add-options-header"
          noBorder
          error={isInputError}
          showError
          errorMessage={isInputError ? t(path('InputError')) : ''}
        >
          <InputText onChange={(value) => setInputValue(value)} ref={inputRef} disabled={disabled} />
          <input style={{ display: 'none' }} name={name} readOnly onFocus={() => inputRef.current?.focus()} />
          <ButtonIcon icon="add" variant="primary" disabled={addButtonDisabled} onClick={handleAdd} size="large" />
        </Container>

        <Container className="im-add-options-content" label={t(path('Included'))}>
          {!!options.length && (
            <div className="im-add-options-content-list">
              {options.map((item) => (
                <Chip key={item} text={item} onCloseButton={handleDeleteOption(item)} />
              ))}
            </div>
          )}
          {!options.length && <MessageContainer variant="warning" text={t(path('NoOptions'))} />}
        </Container>
      </Container>
    </StyledAddAliases>
  );
}
