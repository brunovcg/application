import { ButtonIcon, Container, Icon, LoadingSpinner, InputText, Checkbox, MessageContainer, Button } from '../../..';
import { StyledSelector, StyledDisplay, StyledList, StyledFilter } from './Selector.styled';
import { SelectorProps, SelectorRef } from './Selector.types';
import { useOnClickOutside, usePopper, useElementSize, useTranslationPath, useOnKeyPress, useDevice } from '../../../../../utils/hooks';
import {
  Ref,
  useContext,
  useRef,
  useState,
  MouseEvent,
  useMemo,
  MutableRefObject,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { FormContext } from '../form/Form';
import { DOMHelper, DataHelper, ClassNameHelper } from '../../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { IconName } from '../../icon/Icon.types';
import { InputTextRef } from '../input-text/InputText.types';
import { ColorsVariant } from '../../../../../types';

const { filterMap } = DataHelper;

function Selector<Option extends string>(
  {
    options,
    width = '250px',
    onSelect,
    onChange,
    disabled,
    loading,
    name,
    label,
    placeholder,
    allowClear = true,
    allowReset = true,
    allowSearch = true,
    allowSelectAll = true,
    showError = true,
    multiple = false,
    disabledOptions,
    maxWidth,
    initValue,
    displayColor,
    listHeight,
    listMaxHeight,
    requiredLabel,
    optionsInRow,
    valid,
    className,
    headerEqualizer,
    testInstance,
    selectedBorder,
    height,
  }: SelectorProps<Option>,
  ref: ForwardedRef<SelectorRef>
) {
  const { isTouchScreenDevice } = useDevice();
  const { t } = useTranslation();
  const path = useTranslationPath('Components.Selector');
  const [showList, setShowList] = useState(false);
  const [output, setOutput] = useState<Option[]>(initValue?.[0] ? initValue : []);
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper();
  const canOpenList = showList && !disabled && !loading;
  const { setValue, errors, isFieldRequired, setError, register } = useContext(FormContext);
  const hasOutputValues = !!output.length;
  const canReset = !disabled && allowReset && !loading && (initValue?.[0] ? initValue.some((item) => !output.includes(item)) : false);
  const canClear = !disabled && allowClear && !loading && !!hasOutputValues;
  const showCollapseIcon = showList && !loading && !disabled;
  const showUncollapseIcon = !showList && !loading && !disabled;
  const [filter, setFilter] = useState('');
  const [onlySelected, setOnlySelected] = useState(false);
  const searchRef = useRef<InputTextRef>(null);
  const zIndex = useMemo(() => DOMHelper.windowNextZIndex(), [showList]);
  const displayRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const { elementSize } = useElementSize(displayRef as MutableRefObject<HTMLElement>);
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const hasRequiredLabel = requiredLabel ?? (name ? isFieldRequired?.(name) : false);
  const error = errors?.[String(name)]?.message as string;

  const injectTestInstance = (testId: string) => `${testId}` + (testInstance ? `-${testInstance}` : '');

  const handleShowList = (manual?: 'open' | 'close') => {
    if (!options.length || disabled) {
      return;
    }

    if (manual === 'close') {
      setOnlySelected(false);
      setShowList(false);
      setFilter('');
      setOnlySelected(false);
      return;
    }
    if (manual === 'open') {
      setShowList(true);
      return;
    }

    setShowList((state) => !state);
  };

  const clearSelector = () => {
    setOutput([]);
    onSelect?.([]);
    if (name) {
      setValue?.(name, null);
    }
  };

  const resetSelector = () => {
    if (initValue?.[0]) {
      onSelect?.(initValue);
      setOutput(initValue);
      if (name) {
        setValue?.(name, initValue);
      }
    }
  };

  const handleOptionClick = (e: MouseEvent<HTMLDivElement>, clickedValue: Option) => {
    selectRef?.current?.focus();
    if (name && setError) {
      setError(name, {});
    }

    if (!multiple) {
      handleShowList('close');
      setOutput([clickedValue]);
      onSelect?.([clickedValue]);
      if (name) {
        setValue?.(name, [clickedValue]);
      }
      return;
    }
    if (output.includes(clickedValue)) {
      const newOutput = output.filter((item) => item !== clickedValue);
      setOutput(newOutput);
      if (name) {
        setValue?.(name, newOutput);
      }
    } else {
      setOutput((state) => [...state, clickedValue]);
      if (name) {
        setValue?.(name, [...output, clickedValue]);
      }
    }
  };

  useOnClickOutside(
    [listWrapperRef, displayRef],
    () => {
      handleShowList('close');
    },
    showList
  );

  const updateValue = (value: unknown[]) => setOutput(value as Option[]);

  useImperativeHandle(ref, () => ({ clearSelector, resetSelector, updateValue }));

  const handlePlaceHolder = () => {
    if (loading) {
      return t('Common.Loading');
    }

    if (placeholder) {
      return placeholder;
    }

    if (loading === false && !options.length) {
      return t(path('PlaceholderNoResults'));
    }

    if (!showList) {
      return t(path('PlaceholderClose'));
    }

    if (multiple) {
      return t(path('PlaceholderOpenMulti'));
    }

    return t(path('PlaceholderOpen'));
  };

  const classes = ClassNameHelper.conditional({ ['im-selector']: true, [`${className}`]: !!className });

  const displayClasses = ClassNameHelper.conditional({ ['im-selector-display']: true, ['im-disabled']: disabled });

  const optionClasses = (option: Option) =>
    ClassNameHelper.conditional({
      [injectTestInstance('im-selector-option')]: true,
      ['im-selector-option']: true,
      ['im-selected']: output.includes(option),
      ['im-disabled']: disabledOptions?.includes(option),
    });

  const optionsRenderer = filterMap(
    options,
    (option) => (option as string).toLowerCase().includes(filter) && (onlySelected ? output.includes(option) : true),
    (option) => (
      <div
        className={optionClasses(option)}
        key={option as string}
        data-testid={injectTestInstance(`im-option-${option as string}`)}
        onClick={(e) => {
          if (disabledOptions?.includes(option)) {
            return;
          }
          e.preventDefault();
          e.stopPropagation();
          handleOptionClick(e, option);
        }}
      >
        {option as string}
      </div>
    )
  );

  const setButtonIconProps = (icon: IconName, onClick: () => void, type: 'clear' | 'reset') => ({
    className: 'im-selector-button-icon',
    icon,
    size: 'tiny' as const,
    stopPropagation: true,
    preventDefault: true,
    onClick,
    dataTestId: injectTestInstance(`im-selector-${type}`),
  });

  useEffect(() => {
    if (name) {
      setValue?.(name, initValue?.[0] ? initValue : []);
    }
    if (!showList && initValue && initValue?.toString() !== output.toString()) {
      setOutput(initValue);
    }
  }, [JSON.stringify(initValue)]);

  useEffect(() => {
    if (output) {
      onChange?.(output);
    }
  }, [output]);

  useEffect(() => {
    if (showList) {
      selectRef?.current?.focus();
      searchRef.current?.focus();
    } else if (!showList && initValue !== output && multiple) {
      onSelect?.(output);
    }
  }, [showList]);

  useOnKeyPress({
    keys: ['Tab'],
    callback: (e) => {
      e?.preventDefault();
      if (name && showList) {
        setShowList(false);
        setValue?.(name, output.length ? output : null);
      }
    },
  });

  useOnKeyPress({
    keys: ['Escape'],
    callback: (e) => {
      e?.preventDefault();
      setShowList(false);
    },
  });

  const getDisplayColor = () => {
    if (disabled) {
      return 'disabled';
    }

    return (displayColor ? displayColor[output[0] as keyof typeof displayColor] : 'primary') as ColorsVariant;
  };

  const setLabel = () => {
    if (label && multiple) {
      return label + t(path('Multiple'));
    }
    return label;
  };

  return (
    <StyledSelector className={classes} width={width} maxWidth={maxWidth} height={height}>
      {headerEqualizer && <div className="im-selector-equalizer" />}
      <Container
        hoverable
        disabled={disabled}
        error={!!error}
        errorMessage={error}
        showError={!!name && showError}
        focus={showList}
        onLabelClick={() => handleShowList()}
        label={setLabel()}
        className="im-selector-container"
        ref={setReferenceElement as Ref<HTMLDivElement>}
        requiredLabel={hasRequiredLabel}
        valid={valid}
      >
        <StyledDisplay
          ref={displayRef}
          className={displayClasses}
          onClick={() => handleShowList()}
          data-testid={injectTestInstance('im-selector')}
          variant={getDisplayColor()}
        >
          <div className="im-selector-display-value">
            {hasOutputValues && (
              <>
                <div data-testid={injectTestInstance(`im-selection-${output[0]}`)} className="im-selector-multiple-value-data">
                  {output[0] as string}
                </div>
                {multiple && output.length > 1 && <div className="im-selector-multiple-value-extra-count">{`+${output.length - 1}`}</div>}
              </>
            )}
            {!hasOutputValues && <span className="im-selector-placeholder">{handlePlaceHolder()}</span>}
          </div>
          <div className="im-selector-display-icons">
            {canClear && <ButtonIcon {...setButtonIconProps('close', clearSelector, 'clear')} />}
            {canReset && <ButtonIcon {...setButtonIconProps('undo', resetSelector, 'reset')} />}
            {showUncollapseIcon && <Icon className="im-selector-icon" icon="expandMore" size="tiny" />}
            {showCollapseIcon && <Icon className="im-selector-icon" icon="expandLess" size="tiny" />}
            {loading && <LoadingSpinner size="tiny" />}
          </div>
        </StyledDisplay>
        <select
          style={{ border: 'none', width: '0', height: '0', display: isTouchScreenDevice ? 'none' : 'inherit' }}
          name={name}
          onFocus={() => setShowList(true)}
          value={output.join(',')}
          onChange={(e) => setOutput(e.target.value.split(',') as Option[])}
          ref={(e) => {
            if (name && register) {
              const { ref: hookFormRef } = register(name);
              hookFormRef(e);
              selectRef.current = e;
            }
          }}
        />

        {showList && canOpenList && (
          <StyledList
            className="im-selector-option-list"
            listHeight={listHeight}
            listMaxHeight={listMaxHeight}
            ref={listWrapperRef}
            listWidth={elementSize.width}
            zIndex={zIndex}
            optionsInRow={optionsInRow}
            selectedBorder={selectedBorder}
          >
            <div
              className="im-selector-option-list-container"
              ref={setPopperElement as Ref<HTMLDivElement>}
              data-testid={injectTestInstance('im-options-list')}
              style={styles.popper}
              {...attributes.popper}
            >
              {
                <StyledFilter className="im-selector-filters">
                  {allowSearch && (
                    <InputText
                      ref={searchRef}
                      dataTestId={injectTestInstance('im-selector-filter')}
                      onChange={(inputValue) => setFilter(inputValue.toLowerCase())}
                      placeholder={t('Common.Search')}
                      showError={false}
                    />
                  )}
                  {multiple && (
                    <div className="im-selector-checkboxes">
                      {allowSearch && (
                        <Checkbox
                          dataTestId={injectTestInstance('im-filter-selected')}
                          label={t(path('OnlySelected'))}
                          onChange={(e) => setOnlySelected(e.target.checked)}
                          disabled={!output.length}
                        />
                      )}
                      {allowSelectAll && (
                        <Button
                          text={t(path('SelectAll'))}
                          styling="text"
                          small
                          disabled={output.length === options.length}
                          onClick={() => setOutput(options)}
                          preventDefault
                          stopPropagation
                        />
                      )}
                    </div>
                  )}
                </StyledFilter>
              }
              <div className="im-selector-option-list">
                {optionsRenderer}
                {!optionsRenderer.length && <MessageContainer text={t('Common.NoMatches')} fontSize="medium" variant="error" />}
              </div>
            </div>
          </StyledList>
        )}
      </Container>
    </StyledSelector>
  );
}

export default forwardRef(Selector);
