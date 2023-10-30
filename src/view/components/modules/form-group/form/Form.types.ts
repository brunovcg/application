/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from 'react-hook-form';
import { ObjectSchema } from 'yup';
import { IconName } from '../../icon/Icon.types';
import { ButtonProps } from '../../button/Button.types';

export type AlignmentTypes = 'start' | 'center' | 'end';

export type StyledFormProps = {
  width?: string;
  buttonsAlignment?: AlignmentTypes;
};

export type FormSchema = ObjectSchema<FieldValues>;

export type FormContextTypes = {
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  resetField: UseFormResetField<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  reset: UseFormReset<FieldValues>;
  getFieldState: UseFormGetFieldState<FieldValues>;
  schema: FormSchema;
  isFieldRequired: (fieldName: string) => boolean;
  isValid: boolean;
  submitCount: number;
  formId: string;
  submitForm: () => void;
  clearErrors: UseFormClearErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  setFocusToNext: (e?: KeyboardEvent) => void;
  setFocusToPrevious: (e?: KeyboardEvent) => void;
  watch: UseFormWatch<FieldValues>;
};

export type YupField = { spec: { optional: boolean } };

export type FormDefaultSubmit = {
  text: string;
  icon: IconName;
  alignment: string;
};

export type FormButtons = (ButtonProps & { id: number })[];

export type FormProps = StyledFormProps & {
  className?: string;
  schema: ObjectSchema<FieldValues>;
  children?: ReactNode;
  onSubmit: (payload: any) => void;
  exclude?: string[];
  resettable?: boolean;
  disabled?: boolean;
  initialValues?: object;
  defaultSubmit?: boolean;
  buttons?: FormButtons;
  submitOnEnter?: boolean;
  debug?: boolean;
  formName: string;
};

export type FormRef = {
  getValues: UseFormGetValues<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  errors: FieldErrors<FieldValues>;
  reset: UseFormReset<FieldValues>;
  setFocus: UseFormSetFocus<FieldValues>;
  isValid: boolean;
  submitCount: number;
  formId: string;
  submitForm: () => void;
  clearErrors: UseFormClearErrors<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
};

export type FieldTarget = EventTarget & { name: string };

export type ElementTarget = Element & { name: string };
