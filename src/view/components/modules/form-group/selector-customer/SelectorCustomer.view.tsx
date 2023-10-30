import {
  ForwardedRef,
  MouseEvent,
  MutableRefObject,
  Ref,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SelectorCustomerViewProps, SelectorCustomerRef } from './SelectorCustomer.types';
import { ButtonIcon, Checkbox, Container, Icon, InputText, LoadingSpinner, MessageContainer } from '../../..';
import { DOMHelper, DataHelper, ClassNameHelper } from '../../../../../utils/helpers';
import { useTranslation } from 'react-i18next';
import { useDevice, useElementSize, useOnClickOutside, useOnKeyPress, usePopper, useTranslationPath } from '../../../../../utils/hooks';
import { FormContext } from '../form/Form';
import { InputTextRef } from '../input-text/InputText.types';
import { IconName } from '../../icon/Icon.types';
import {
  StyledCustomerDisplay,
  StyledCustomerFilter,
  StyledCustomerList,
  StyledOptionRenderer,
  StyledSelectorCustomer,
} from './SelectorCustomer.styled';
import { ListUsersResponse } from '../../../../../apis/services/user-services/User.services.types';

const { filterMap } = DataHelper;

function SelectorCustomerView(
  {
    options,
    width = '250px',
    maxWidth,
    listHeight,
    listMaxHeight,
    onViewSelect,
    disabled,
    loading,
    name,
    label,
    placeholder,
    allowClear = true,
    allowReset = true,
    allowSearch = true,
    showError = true,
    multiple = false,
    initValue,
    requiredLabel,
    className,
    headerEqualizer,
    show,
  }: SelectorCustomerViewProps,
  ref: ForwardedRef<SelectorCustomerRef>
) {
  const { isTouchScreenDevice } = useDevice();
  const { t } = useTranslation();
  const path = useTranslationPath('Components.SelectorCustomer');
  const [showList, setShowList] = useState(false);
  const [output, setOutput] = useState(initValue ?? []);
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
  const handleShowList = (manual?: 'open' | 'close') => {
    if (!options.length) {
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
    onViewSelect?.([]);
    if (name) {
      setValue?.(name, []);
    }
  };

  const resetSelector = () => {
    if (initValue?.[0]) {
      onViewSelect?.(initValue);
      setOutput(initValue);
      if (name) {
        setValue?.(name, initValue);
      }
    }
  };

  const handleOptionClick = (_e: MouseEvent<HTMLDivElement>, clickedValue: ListUsersResponse[number]) => {
    selectRef?.current?.focus();
    if (name && setError) {
      setError(name, {});
    }

    if (!multiple) {
      handleShowList('close');
      setOutput([clickedValue]);
      onViewSelect?.([clickedValue]);
      if (name) {
        setValue?.(name, [clickedValue]);
      }
      return;
    }

    const outputIds = output.map((item) => item.id);

    if (outputIds.includes(clickedValue.id)) {
      const newOutput = output.filter((item) => item.id !== clickedValue.id);
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

  const updateValue = (value: ListUsersResponse) => setOutput(value);

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

  const classes = ClassNameHelper.conditional({ ['im-selector-customer']: true, [`${className}`]: !!className });

  const optionRenderer = (option: ListUsersResponse[number]) => {
    const selected = output.map((item) => item.id).includes(option.id);
    return (
      <StyledOptionRenderer selected={selected}>
        <div className="im-select-customer-option-renderer-name">{option.name}</div>
        <div className="im-select-customer-option-renderer-username">{option.username}</div>
      </StyledOptionRenderer>
    );
  };

  const optionListRenderer = filterMap(
    options,
    (option) => {
      if (!option.name) {
        return false;
      }
      const nameIncludesFilter = option.name.toLowerCase().includes(filter);
      const usernameIncludesFilter = option.username.toLowerCase().includes(filter);
      const selectedIds = output.map((item) => item.id);
      const hasSelectedAndIncludes = onlySelected ? selectedIds.includes(option.id) : true;
      return (nameIncludesFilter || usernameIncludesFilter) && hasSelectedAndIncludes;
    },
    (option) => (
      <div
        className="im-selector-customer-option-container"
        key={option.id}
        data-testid={`im-customer-option-${option.username}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleOptionClick(e, option);
        }}
      >
        {optionRenderer(option)}
      </div>
    )
  );

  const setButtonIconProps = (icon: IconName, onClick: () => void, type: 'clear' | 'reset') => ({
    className: 'im-selector-customer-button-icon',
    icon,
    size: 'tiny' as const,
    stopPropagation: true,
    preventDefault: true,
    onClick,
    dataTestId: `im-selector-${type}`,
  });

  useEffect(() => {
    if (!showList && initValue?.[0]) {
      if (name) {
        setValue(name, initValue);
      }

      setOutput(initValue);
    } else if (name) {
      setValue(name, []);
    }
  }, [initValue]);

  useEffect(() => {
    if (showList) {
      selectRef?.current?.focus();
      searchRef.current?.focus();
    } else if (!showList && initValue !== output && multiple) {
      onViewSelect?.(output);
    }
  }, [showList]);

  useOnKeyPress({
    keys: ['Tab'],
    callback: (e) => {
      e?.preventDefault();
      if (name && showList) {
        setShowList(false);
        setValue?.(name, output.length ? output : undefined);
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

  return (
    <StyledSelectorCustomer className={classes} width={width} maxWidth={maxWidth} show={show}>
      {headerEqualizer && <div className="im-selector-equalizer" />}
      <Container
        hoverable
        disabled={disabled}
        error={!!error}
        errorMessage={error}
        showError={!!name && showError}
        focus={showList}
        onLabelClick={() => handleShowList()}
        label={label}
        className="im-selector-customer-container"
        ref={setReferenceElement as Ref<HTMLDivElement>}
        requiredLabel={hasRequiredLabel}
      >
        <StyledCustomerDisplay
          ref={displayRef}
          className="im-selector-customer-display"
          onClick={() => handleShowList()}
          data-testid="im-selector-customer"
        >
          <div className="im-selector-customer-display-value">
            {hasOutputValues && (
              <>
                <div className="im-selector-multiple-value-data">{optionRenderer(output[0])}</div>
                {multiple && output.length > 1 && <div className="im-selector-multiple-value-extra-count">{` +${output.length - 1}`}</div>}
              </>
            )}
            {!hasOutputValues && <span className="im-selector-customer-placeholder">{handlePlaceHolder()}</span>}
          </div>
          <div className="im-selector-display-icons">
            {canClear && <ButtonIcon {...setButtonIconProps('close', clearSelector, 'clear')} />}
            {canReset && <ButtonIcon {...setButtonIconProps('undo', resetSelector, 'reset')} />}
            {showUncollapseIcon && <Icon className="im-selector-icon" icon="expandMore" size="tiny" />}
            {showCollapseIcon && <Icon className="im-selector-icon" icon="expandLess" size="tiny" />}
            {loading && <LoadingSpinner size="tiny" />}
          </div>
        </StyledCustomerDisplay>
        <select
          style={{ border: 'none', width: '0', height: '0', display: isTouchScreenDevice ? 'none' : 'inherit' }}
          name={name}
          onFocus={() => setShowList(true)}
          value={output.map((item) => JSON.stringify(item)).join('|')}
          onChange={(e) => setOutput(e.target.value.split('|').map((item) => JSON.parse(item)))}
          ref={(e) => {
            if (name && register) {
              const { ref: hookFormRef } = register(name);
              hookFormRef(e);
              selectRef.current = e;
            }
          }}
        />

        {showList && canOpenList && (
          <StyledCustomerList
            className="im-selector-option-list"
            listHeight={listHeight}
            listMaxHeight={listMaxHeight}
            ref={listWrapperRef}
            listWidth={elementSize.width}
            zIndex={zIndex}
          >
            <div
              className="im-selector-option-list-container"
              ref={setPopperElement as Ref<HTMLDivElement>}
              data-testid={'im-customer-options-list'}
              style={styles.popper}
              {...attributes.popper}
            >
              {allowSearch && (
                <StyledCustomerFilter className="im-selector-filters">
                  <InputText
                    ref={searchRef}
                    dataTestId={'im-selector-filter'}
                    onChange={(inputValue) => setFilter(inputValue.toLowerCase())}
                    placeholder={t('Common.Search')}
                    showError={false}
                  />
                  {multiple && (
                    <Checkbox
                      dataTestId={'im-filter-selected'}
                      label={t(path('OnlySelected'))}
                      onChange={(e) => setOnlySelected(e.target.checked)}
                      disabled={!output.length}
                    />
                  )}
                </StyledCustomerFilter>
              )}
              <div className="im-selector-option-list">
                {optionListRenderer}
                {!optionListRenderer.length && <MessageContainer text={t('Common.NoMatches')} fontSize="medium" variant="error" />}
              </div>
            </div>
          </StyledCustomerList>
        )}
      </Container>
    </StyledSelectorCustomer>
  );
}

export default forwardRef(SelectorCustomerView);
