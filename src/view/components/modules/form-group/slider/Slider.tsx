import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState, useRef, useContext, MouseEvent, useLayoutEffect } from 'react';
import { SliderProps, SliderForwardedRef } from './Slider.types';
import ButtonIcon from '../../button-icon/ButtonIcon';
import StyledSlider from './Slider.styled';
import { Container, InputNumber } from '../../..';
import { ClassNameHelper } from '../../../../../utils/helpers';
import { FormContext } from '../form/Form';
import { Root, Track, Range, Thumb } from '@radix-ui/react-slider';

const { conditional } = ClassNameHelper;

function Slider(
  {
    label,
    max,
    min,
    value,
    step = 1,
    disabled,
    valid,
    width = '100%',
    name,
    availableSum,
    maxSum,
    onChange,
    onReset,
    setAvailableSum,
    showCaption = false,
    initialValue,
    requiredLabel,
    showError = false,
    testInstance,
    inputWidth = '70px',
    showInputArrows = true,
    percent,
  }: SliderProps,
  ref: ForwardedRef<SliderForwardedRef>
) {
  const [inputValue, setInputValue] = useState(value ?? min ?? 0);
  const [isFocused, setIsFocused] = useState(false);
  const initValue = initialValue ?? min;
  const { setValue, errors, isFieldRequired, setError } = useContext(FormContext);
  const error = errors?.[String(name)]?.message as string;

  const isValid = typeof valid === 'boolean' ? valid : valid?.(inputValue);
  const isHookForm = !!name;
  const hasSumLimit = availableSum !== undefined;
  const hasAvailableSumLimit = availableSum !== undefined && availableSum > 0;

  const canReset = () => {
    if (hasSumLimit) {
      if (inputValue < initValue && maxSum) {
        return maxSum - availableSum - inputValue + initValue <= maxSum;
      }
      return availableSum > 0 || (initValue !== inputValue && initValue);
    }
    return true;
  };

  const hideReset = !canReset() || initValue === inputValue || initValue === undefined;

  const handleChange = (updatedValue: number) => {
    const variationDelta = updatedValue - inputValue;
    const increased = variationDelta > 0;

    if (updatedValue < min) {
      updatedValue = min;
    }

    if (updatedValue > max) {
      updatedValue = max;
    }

    if (hasSumLimit) {
      if (increased && availableSum - variationDelta < 0) {
        return;
      } else {
        setAvailableSum?.((state: number) => state - variationDelta);
      }
    }
    onChange?.(updatedValue);

    if (isHookForm) {
      setValue(name, updatedValue);
      setError(name, { message: '' });
    }
    setInputValue(updatedValue);
  };

  const resetSlider = (e: MouseEvent<HTMLButtonElement>) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (hasSumLimit) {
      const variationDelta = initValue ?? 0 - inputValue;
      setAvailableSum?.((state: number) => state - variationDelta);
    }
    if (isHookForm) {
      setValue(name, initValue);
    }
    setInputValue(initValue ?? 0);
    onReset?.(initValue ?? 0);
  };

  useImperativeHandle(ref, () => ({ resetSlider }));

  useEffect(() => {
    if (value !== undefined && initValue !== value) {
      setInputValue(value);
    }
  }, [value]);

  useLayoutEffect(() => {
    setInputValue(initValue);
  }, [initValue]);

  const CHAR_WIDTH = 10;
  const INPUT_BUTTONS_WIDTH = 25;
  const NUMBER_CHARS = max?.toString()?.length ?? 0;

  const valueDisplaySize = `${NUMBER_CHARS * CHAR_WIDTH + INPUT_BUTTONS_WIDTH}px`;

  const containerRef = useRef<HTMLDivElement>(null);

  const classes = conditional({
    ['im-slider']: true,
    ['im-error']: !!error || hasAvailableSumLimit,
    ['im-disabled']: !!disabled,
    ['im-max-limit']: availableSum === 0,
    ['im-valid']: !!isValid,
  });

  const customLabel = () => {
    let result = label;
    if (showCaption) {
      result += ` - Min (${min}) | Max (${max})`;
    }
    return result;
  };

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);

  const inputMax = () => {
    if (!hasSumLimit) {
      return max;
    }

    if (availableSum) {
      return availableSum + inputValue;
    }

    return inputValue;
  };

  return (
    <StyledSlider className={classes} valueDisplaySize={valueDisplaySize} width={width}>
      <Container
        className="im-slider-container"
        label={customLabel()}
        focus={isFocused}
        disabled={disabled}
        hoverable
        error={!!error}
        ref={containerRef}
        valid={!!isValid}
        errorMessage={error}
        showError={!!name && showError}
        requiredLabel={hasRequiredLabel}
      >
        <Root
          className="im-slider-root"
          disabled={disabled}
          value={[inputValue]}
          onValueChange={(updatedValue) => handleChange(updatedValue[0])}
          onValueCommit={() => handleChange(inputValue)}
          step={step}
          aria-label="Volume"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          max={max}
          min={min}
        >
          <Track className="im-slider-track">
            <Range className="im-slider-range" />
          </Track>
          <Thumb className="im-slider-thumb" />
        </Root>
        <InputNumber
          disabled={disabled}
          step={step}
          width={inputWidth}
          height="25px"
          value={String(inputValue)}
          allowClear={false}
          allowReset={false}
          showError={false}
          onChange={(inputNumberValue) => handleChange(Number(inputNumberValue))}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          max={inputMax()}
          min={min}
          dataTestId="im-slider-input-number"
          testInstance={testInstance}
          showArrows={showInputArrows}
          percent={percent}
        />
        <ButtonIcon icon="undo" onClick={resetSlider} hide={hideReset} size="small" dataTestId="im-slider-reset" />
      </Container>
    </StyledSlider>
  );
}

export default forwardRef(Slider);
