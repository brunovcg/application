import { ForwardedRef, Fragment, createContext, forwardRef, useImperativeHandle, useMemo, useRef, useId, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Button } from '../../..';
import { StyledForm } from './Form.styled';
import { AlignmentTypes, ElementTarget, FieldTarget, FormContextTypes, FormProps, FormRef, YupField } from './Form.types';
import i18next from 'i18next';
import { IconName } from '../../icon/Icon.types';
import { useOnKeyPress } from '../../../../../utils/hooks';
import DebugLogs from '../../../../../utils/debug/modules/debug-logs/DebugLogs';

export const FormContext = createContext<FormContextTypes>({} as FormContextTypes);

const defaultSubmitProps = { text: i18next.t('Common.Submit'), icon: 'done' as IconName, alignment: 'center' };

function Form(
  {
    formName,
    schema,
    children,
    className = '',
    onSubmit,
    exclude = [],
    defaultSubmit = true,
    resettable = false,
    disabled,
    width,
    buttons,
    submitOnEnter = true,
    debug = true,
  }: FormProps,
  ref: ForwardedRef<FormRef>
) {
  const {
    register,
    handleSubmit,
    reset,
    resetField,
    setFocus,
    formState: { errors, isValid, submitCount },
    getValues,
    setValue,
    setError,
    getFieldState,
    trigger,
    clearErrors,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });
  const formRef = useRef<HTMLFormElement>(null);
  const formId = `im-form-${formName}-${useId()}`;
  const [fieldsRef, setFieldsRef] = useState<ElementTarget[]>([]);

  const submitForm = async () => {
    const fieldKeys = Object.keys(errors);
    const customErrors = fieldKeys.filter((error) => errors[error as keyof typeof errors]?.message);
    const allFields = Object.keys(getValues());
    const removeCustomErrors = allFields.filter((field) => !customErrors.includes(field));
    const result = await trigger([...removeCustomErrors]);
    const hasNoErrors = result && customErrors.length === 0;
    if (hasNoErrors && formRef.current) {
      formRef.current?.requestSubmit();
    }
  };

  const isFieldRequired = (fieldName: string) => {
    const fields = schema.fields;
    return !(fields[`${String(fieldName)}`] as unknown as YupField)?.spec.optional;
  };

  const action = ({ ...all }) => {
    const data = { ...all };

    if (exclude.length) {
      for (const key of exclude) {
        delete data[String(key)];
      }
    }

    onSubmit(data);
    if (resettable) reset();
  };

  const mapDefaultSubmit = () => {
    if (defaultSubmit) {
      return defaultSubmitProps;
    }
    return { alignment: '', icon: '', text: '' };
  };

  const hasButtons = defaultSubmit || buttons?.length;

  useOnKeyPress({
    keys: ['Enter'],
    callback: () => {
      if (formRef.current) {
        formRef.current?.requestSubmit();
      }
    },
    enabled: submitOnEnter,
  });

  const setFocusToNext = (e?: KeyboardEvent) => {
    e?.preventDefault();
    const currentFieldName = (e?.target as FieldTarget)?.name;
    const currentIndex = fieldsRef.findIndex((item) => item?.name === currentFieldName);
    const nextField = fieldsRef[currentIndex + 1];
    trigger(currentFieldName);
    if (nextField?.name) {
      setFocus(nextField?.name);
    }
  };

  const setFocusToPrevious = (e?: KeyboardEvent) => {
    e?.preventDefault();
    const currentFieldName = (e?.target as FieldTarget)?.name;
    const currentIndex = fieldsRef.findIndex((item) => item?.name === currentFieldName);
    const previousField = fieldsRef[currentIndex - 1];
    trigger(currentFieldName);
    if (previousField?.name) {
      setFocus(previousField?.name);
    }
  };

  useOnKeyPress({
    keys: ['Tab'],
    ignoreHold: 'Shift',
    callback: (e) => setFocusToNext(e),
  });

  useOnKeyPress({
    keys: ['Tab'],
    hold: 'Shift',
    callback: (e) => setFocusToPrevious(e),
  });

  const propsProvided = {
    register,
    getValues,
    resetField,
    errors,
    setFocus,
    setValue,
    reset,
    setError,
    getFieldState,
    schema,
    isFieldRequired,
    isValid,
    submitCount,
    formId,
    submitForm,
    clearErrors,
    trigger,
    setFocusToNext,
    setFocusToPrevious,
    watch,
  };

  useImperativeHandle(ref, () => ({
    ...propsProvided,
  }));

  const providerValue = useMemo(
    () => ({
      ...propsProvided,
    }),
    [
      register,
      getValues,
      resetField,
      errors,
      setFocus,
      setValue,
      reset,
      setError,
      getFieldState,
      schema,
      isFieldRequired,
      isValid,
      submitCount,
      formId,
      submitForm,
      clearErrors,
      trigger,
      watch,
    ]
  );

  useEffect(() => {
    setFieldsRef(Array.from(formRef.current?.querySelectorAll('[name]') ?? []));
  }, []);

  return (
    <StyledForm
      ref={formRef}
      id={formId}
      onSubmit={handleSubmit(action)}
      className={`im-form ${className}`}
      width={width}
      buttonsAlignment={mapDefaultSubmit()?.alignment as AlignmentTypes}
    >
      <FormContext.Provider value={providerValue}>{children}</FormContext.Provider>

      <DebugLogs
        active={!!debug}
        id={formId}
        items={{
          errors,
          values: getValues(),
        }}
      />

      {hasButtons && (
        <div className="im-form-buttons">
          {defaultSubmit && (
            <Button
              icon={mapDefaultSubmit()?.icon as IconName}
              variant="primary"
              text={mapDefaultSubmit()?.text}
              type="submit"
              disabled={disabled}
            />
          )}
          {buttons?.map((button) => (
            <Fragment key={button.id}>
              <Button {...button} />
            </Fragment>
          ))}
        </div>
      )}
    </StyledForm>
  );
}

export default forwardRef(Form);
