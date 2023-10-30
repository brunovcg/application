import { ReactNode } from 'react';

export type DatePickerDates = string | Date | Date[] | null | undefined;

export type DatePickerDate = string | Date | null;

export type StyledDatePickerProps = {
  height?: string;
};

type CommonProps = StyledDatePickerProps & {
  placeholder?: string;
  onSelect?: (dates: DatePickerDates) => void;
  name?: string;
  label?: string;
  disabled?: boolean;
  allowClear?: boolean;
  requiredLabel?: boolean;
  optionalLabel?: boolean;
  showError?: boolean;
};

export type DatePickerViewProps = {
  calendar: ReactNode;
  label?: string;
  isFocused: boolean;
  height?: string;
  disabled?: boolean;
  name?: string;
  showError?: boolean;
  requiredLabel?: boolean;
  optionalLabel?: boolean;
  handleReset: () => void;
  handleClear?: () => void;
  inputValue: null | Date | Date[];
  initDate?: Date | (Date | undefined | null | string)[] | string;
  allowClear?: boolean;
  initNull?: boolean;
};

export type DatePickerProps = CommonProps & {
  date?: string | Date | null;
  initDate?: string | Date | null;
};

type DateRangePickCustom =
  | {
      initStartDate?: string | Date;
      initEndDate?: string | Date;
      initNull?: never;
    }
  | {
      initStartDate?: never;
      initEndDate?: never;
      initNull?: boolean;
    };

export type DateRangePickerProps = DateRangePickCustom &
  CommonProps & {
    startDate?: string | Date | null;
    endDate?: string | Date | null;
  };

export type DatePickerRef = {
  resetDatePicker: () => void;
};

export type DateRangePickerRef = {
  resetDateRangePicker: () => void;
};

export type FormatDateArgs = {
  dateStart?: DatePickerDate;
  dateEnd?: DatePickerDate;
  singleDate?: DatePickerDate;
};

export type FormatDateRangeArgs = { dateStart?: DatePickerDate; dateEnd?: DatePickerDate };
