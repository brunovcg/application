import { useContext, useMemo } from 'react';
import Container from '../../container/Container';
import { StyledCalendarWrapper, StyledDatePicker } from './DatePicker.styled';
import { DateTimeHelper, ClassNameHelper } from '../../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { useTranslationPath } from '../../../../../utils/hooks';
import ButtonIcon from '../../button-icon/ButtonIcon';
import { FormContext } from '../form/Form';
import { DatePickerViewProps } from './DatePicker.types';

const { conditional } = ClassNameHelper;
const { areDateEquals } = DateTimeHelper;

export default function DatePickerView({
  calendar,
  label,
  isFocused,
  height,
  disabled,
  name,
  showError = true,
  requiredLabel,
  optionalLabel,
  handleReset,
  handleClear,
  inputValue,
  allowClear,
  initDate,
  initNull,
}: DatePickerViewProps) {
  const datePickerClasses = conditional({
    ['im-date-picker']: true,
    ['im-open']: isFocused,
  });
  const { isFieldRequired, errors } = useContext(FormContext);
  const { t } = useTranslation();
  const path = useTranslationPath('Components.DatePicker');
  const hasRequiredLabel = requiredLabel || (name ? isFieldRequired?.(name) : false);
  const datePickerLabel = label ?? t(path('Date'));
  const error = errors?.[String(name)]?.message as string;

  const canReset = useMemo(() => {
    if (!initDate || initNull) {
      return false;
    }

    if (Array.isArray(initDate) && Array.isArray(inputValue)) {
      return !areDateEquals(initDate[0] as Date, inputValue[0]) || !areDateEquals(initDate[1] as Date, inputValue[1]);
    }

    if (!Array.isArray(initDate) && !Array.isArray(inputValue)) {
      return !areDateEquals(initDate as Date, inputValue as Date);
    }

    return false;
  }, [initDate, inputValue]);

  const canClear = useMemo(() => {
    if (!allowClear) {
      return false;
    }
    if (Array.isArray(inputValue)) {
      return !!inputValue.filter(Boolean).length;
    }
    return !!inputValue;
  }, [inputValue, allowClear, initNull]);

  return (
    <StyledDatePicker className={datePickerClasses}>
      <Container
        variant="white"
        hoverable
        label={datePickerLabel}
        height={height}
        focus={isFocused}
        error={!!error}
        errorMessage={error}
        showError={!!name && showError}
        disabled={disabled}
        requiredLabel={hasRequiredLabel}
        optionalLabel={optionalLabel}
      >
        <StyledCalendarWrapper className="im-date-picker-wrapper" data-testid="im-date-picker-calendar-wrapper">
          {calendar}
          <div className="im-date-picker-buttons">
            <ButtonIcon icon="undo" size="tiny" onClick={handleReset} hide={!canReset} disabled={disabled} stopPropagation preventDefault />
            {allowClear && (
              <ButtonIcon
                icon="close"
                size="tiny"
                onClick={handleClear}
                hide={!canClear}
                disabled={disabled}
                stopPropagation
                preventDefault
              />
            )}
          </div>
        </StyledCalendarWrapper>
      </Container>
    </StyledDatePicker>
  );
}
