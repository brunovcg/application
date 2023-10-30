import { ChangeEvent, ForwardedRef, forwardRef, useContext, useId, useImperativeHandle, useRef, useState } from 'react';
import { ButtonIcon, Chip, Container, Icon, Tooltip } from '../../..';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import StyledInputFile from './InputFile.styled';
import { DataHelper } from '../../../../../utils/helpers';
import { InputFileProps, InputFileRef } from './InputFile.types';
import { FormContext } from '../form/Form';

const { stringifyFromByte } = DataHelper;

function InputFile(
  { width, name, maxWidth, label, disabled, requiredLabel, multiple = false, accept, ...rest }: InputFileProps,
  ref: ForwardedRef<InputFileRef>
) {
  const [files, setFiles] = useState<File[]>([]);
  const inputId = useId();
  const { t } = useTranslation();
  const path = useTranslationPath('Components.InputFile');
  const { setValue, isFieldRequired, errors, setError } = useContext(FormContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const inputLabel = multiple ? `${label ?? t(path('LabelMultiple'))}` : `${label ?? t(path('Label'))}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (name) {
      setError(name, { message: '' });
    }

    const loadedFiles = e.target.files;

    const filesNames = files.map((item) => item.name);

    if (loadedFiles) {
      const filesArray = Array.from(loadedFiles).reduce((acc, current) => {
        if (filesNames.includes(current.name)) {
          return acc;
        }
        acc = [...acc, current];

        return acc;
      }, [] as File[]);

      setFiles((state) => [...state, ...filesArray]);
      if (name) {
        setValue(name, [...files, ...filesArray]);
      }
    }
  };

  const resetInputFile = () => {
    setFiles(() => []);
    if (inputRef.current?.files) {
      inputRef.current.files = null;
      inputRef.current.value = null as unknown as string;
    }
    if (name) {
      setValue(name, []);
    }
  };

  useImperativeHandle(ref, () => ({ resetInputFile }));

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);
  const canClear = files.length > 0;

  const error = (errors?.[String(name)]?.message as string) ?? '';

  return (
    <StyledInputFile maxWidth={maxWidth} width={width} className="im-input-file">
      <Container
        className="im-input-file-wrapper"
        hoverable
        label={inputLabel}
        showError
        requiredLabel={!!hasRequiredLabel}
        error={!!error}
        errorMessage={error}
        disabled={disabled}
      >
        <label className="im-input-file-label" htmlFor={inputId}>
          <Icon icon={multiple ? 'files' : 'fileUpload'} size="medium" />
        </label>
        <div className="im-input-file-files">
          {!files.length && (
            <span className="im-input-file-placeholder">{multiple ? t(path('SelectMultipleFiles')) : t(path('SelectFile'))}</span>
          )}
          {files.map((item) => (
            <Tooltip
              key={item.name}
              content={`${item.name} (${stringifyFromByte(item.size, 1)})`}
              trigger={
                <Chip
                  text={
                    <div className="im-input-file-chip">
                      <div className="im-input-file-chip-name">{item.name}</div>
                      <div className="im-input-file-chip-size">{stringifyFromByte(item.size, 1)}</div>
                    </div>
                  }
                  size="small"
                  onCloseButton={() => setFiles((state) => state.filter((file) => file.name !== item.name))}
                />
              }
            />
          ))}
        </div>
        <div className="im-input-file-clear">
          <ButtonIcon
            disabled={disabled}
            icon="close"
            onClick={resetInputFile}
            hide={!canClear}
            stopPropagation
            preventDefault
            dataTestId="im-file-clear"
          />
        </div>
        <input
          className="im-input-file"
          id={inputId}
          type="file"
          name={name}
          ref={inputRef}
          {...rest}
          multiple={multiple}
          onChange={handleChange}
          data-testid="im-input-file"
          accept={accept}
        />
      </Container>
    </StyledInputFile>
  );
}

export default forwardRef(InputFile);
