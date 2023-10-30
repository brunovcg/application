import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, useContext, useEffect, useMemo } from 'react';
import { DatePickerDates, DateRangePickerProps, DateRangePickerRef } from '../DatePicker.types';
import { useTranslation } from 'react-i18next';
import { DateTimeHelper } from '../../../../../../utils/helpers';
import { FormContext } from '../../form/Form';
import '../DatePicker.scss';
import { useTranslationPath } from '../../../../../../utils/hooks';
import DatePickerView from '../DatePicker.view';

const { dateWithoutTimezone } = DateTimeHelper;

function DateRangePicker(
  {
    placeholder,
    onSelect,
    name,
    disabled,
    startDate,
    initNull = false,
    endDate,
    initStartDate,
    initEndDate,
    ...rest
  }: DateRangePickerProps,
  ref?: ForwardedRef<DateRangePickerRef>
) {
  const formatRangeDates = (
    startDateArg: Date | string | null | undefined,
    endDateArg: Date | string | null | undefined,
    startNull = false
  ) => {
    const start = startNull ? null : startDateArg ? dateWithoutTimezone(new Date(startDateArg)) : dateWithoutTimezone(new Date());
    const end = endDateArg ? new Date(endDateArg) : null;
    return [start, end];
  };

  const [inputValue, setInputValue] = useState<DatePickerDates>(formatRangeDates(initStartDate, initEndDate, initNull) as DatePickerDates);

  const { setValue, setError } = useContext(FormContext);
  const [isFocused, setIsFocused] = useState(false);

  const { i18n, t } = useTranslation();
  const path = useTranslationPath('Components.DatePicker');

  const isHookForm = !!name;

  const handleReset = () => {
    const formattedDate = (formatRangeDates(initStartDate, initEndDate, initNull) as DatePickerDates) ?? null;

    setInputValue(formattedDate);

    onSelect?.(formattedDate);

    if (isHookForm) {
      setValue(name, formattedDate);
      if (formattedDate) {
        setError(name, { message: '', type: '' });
      }
    }
  };

  const handleClear = () => {
    setInputValue(null);

    onSelect?.(null);

    if (isHookForm) {
      setError(name, { message: '', type: '' });
    }
  };

  useImperativeHandle(ref, () => ({ resetDateRangePicker: handleReset }));

  const allowClear = (inputValue as Date[])?.[1] !== null;

  const handleChange = (currentDates: Date[]) => {
    const isRangeSelected = !!currentDates[1];
    const updatedStartDate = dateWithoutTimezone(currentDates[0] as Date) as Date;

    const formatted = formatRangeDates(updatedStartDate, currentDates[1] as Date);

    if (isRangeSelected) {
      setInputValue(formatted as Date[]);
      onSelect?.([updatedStartDate, currentDates[1]]);
    } else {
      setInputValue([updatedStartDate, null as unknown as Date]);
    }
    if (name) {
      setError(name, { message: '', type: '' });
    }

    if (isHookForm) {
      setValue(name, currentDates);
    }
  };

  const language = i18n?.language?.substring(0, 2) ?? 'en';

  const datePickerPlaceholder = placeholder ?? t(path('PlaceholderRange'));

  useEffect(() => {
    if (name) {
      setValue(name, formatRangeDates(initStartDate ?? startDate, initEndDate ?? endDate) as DatePickerDates);
    }
  }, []);

  const handleIncompleteSelect = () => {
    if (Array.isArray(inputValue) && !inputValue?.[1]) {
      handleChange([inputValue[0], inputValue[0]]);
    }
  };

  const value = useMemo(() => {
    if (Array.isArray(inputValue)) {
      return inputValue.filter(Boolean).length === 0 ? null : inputValue;
    }

    return inputValue;
  }, [JSON.stringify(inputValue)]);

  return (
    <DatePickerView
      {...rest}
      isFocused={isFocused}
      initNull={initNull}
      disabled={disabled}
      name={name}
      handleReset={handleReset}
      inputValue={inputValue as Date[]}
      initDate={[initStartDate, initEndDate]}
      handleClear={handleClear}
      allowClear={allowClear}
      calendar={
        <Calendar
          id="im-calendar"
          locale={language}
          value={value}
          onChange={(e: CalendarChangeEvent) => handleChange(e.value as Date[])}
          disabled={disabled}
          selectionMode="range"
          onShow={() => setIsFocused(true)}
          onHide={() => {
            handleIncompleteSelect();
            setIsFocused(false);
          }}
          readOnlyInput
          placeholder={datePickerPlaceholder}
          className="im-date-picker-calendar"
        />
      }
    />
  );
}

export default forwardRef(DateRangePicker);
