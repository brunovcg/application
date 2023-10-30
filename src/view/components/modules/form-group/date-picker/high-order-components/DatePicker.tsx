import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { useState, forwardRef, ForwardedRef, useImperativeHandle, useContext, useEffect, useRef } from 'react';
import { DatePickerDate, DatePickerDates, DatePickerProps, DatePickerRef } from '../DatePicker.types';
import { useTranslation } from 'react-i18next';
import { FormContext } from '../../form/Form';
import '../DatePicker.scss';
import { useOnKeyPress, useTranslationPath } from '../../../../../../utils/hooks';
import DatePickerView from '../DatePicker.view';

function DatePicker(
  { placeholder, onSelect, name, disabled, date, initDate, ...rest }: DatePickerProps,
  ref?: ForwardedRef<DatePickerRef>
) {
  const formatDates = (dateToFormat?: DatePickerDate) => (dateToFormat ? new Date(dateToFormat) : null);

  const [inputValue, setInputValue] = useState<DatePickerDates>(formatDates(initDate ?? date) as DatePickerDates);
  const { setValue, setError, register, setFocusToNext } = useContext(FormContext);
  const [isFocused, setIsFocused] = useState(false);

  const { i18n, t } = useTranslation();
  const path = useTranslationPath('Components.DatePicker');

  const isHookForm = !!name;

  const handleClear = () => {
    setInputValue(null);
    onSelect?.(null);

    if (isHookForm) {
      setValue(name, null);
    }
  };

  const handleReset = () => {
    const formattedDate = (formatDates(initDate) as DatePickerDates) ?? null;

    setInputValue(formattedDate);
    if (isHookForm) {
      setValue(name, formattedDate);
      if (formattedDate) {
        setError(name, { message: '', type: '' });
      }
    }
  };

  useImperativeHandle(ref, () => ({ resetDatePicker: handleReset }));

  const handleChange = (currentDates: Date[] | Date) => {
    let isSelected = false;

    if (name) {
      setError(name, { message: '', type: '' });
    }

    if (Array.isArray(currentDates)) {
      isSelected = currentDates?.length > 1;
    } else {
      isSelected = !!currentDates;
    }

    if (isSelected || !inputValue) {
      onSelect?.(currentDates);
      if (isHookForm) {
        setValue(name, currentDates);
      }
    }
  };

  const language = i18n?.language?.substring(0, 2) ?? 'en';

  const datePickerPlaceholder = placeholder ?? t(path('Placeholder'));

  useEffect(() => {
    if (name) {
      setValue(name, formatDates(initDate ?? date) as DatePickerDates);
    }
  }, []);

  const calendarRef = useRef<null | Calendar>(null);

  useOnKeyPress({
    keys: ['Tab'],
    callback: (e) => setFocusToNext(e),
  });
  const focusedName = document?.activeElement?.getAttribute('name');

  useEffect(() => {
    if (name && focusedName === name) {
      calendarRef.current?.focus();
    }
  }, [focusedName]);

  return (
    <DatePickerView
      {...rest}
      isFocused={isFocused}
      disabled={disabled}
      handleReset={handleReset}
      handleClear={handleClear}
      inputValue={inputValue as Date}
      initDate={initDate as string}
      calendar={
        <Calendar
          name={name}
          id="im-calendar"
          ref={(e) => {
            if (name && !!register) {
              const { ref: hookFormRef } = register(name);
              hookFormRef(e);
              calendarRef.current = e;
            }
          }}
          locale={language}
          value={inputValue}
          onChange={(e: CalendarChangeEvent) => {
            handleChange(e.value as Date);
            setInputValue(e.value as Date);
          }}
          disabled={disabled}
          selectionMode="single"
          onShow={() => setIsFocused(true)}
          onHide={() => setIsFocused(false)}
          readOnlyInput
          placeholder={datePickerPlaceholder}
          className="im-date-picker-calendar"
        />
      }
    />
  );
}

export default forwardRef(DatePicker);
