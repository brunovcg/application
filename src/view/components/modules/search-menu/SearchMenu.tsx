import { DOMHelper, DataHelper, ClassNameHelper } from '../../../../utils/helpers';
import { ButtonIcon, Container, MessageContainer } from '../..';
import StyledSearchMenu from './SearchMenu.styled';
import { SearchMenuProps } from './SearchMenu.types';
import { MutableRefObject, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce, usePopper, useOnClickOutside, useElementSize } from '../../../../utils/hooks';
import { useTranslation } from 'react-i18next';

const { filterMap } = DataHelper;

export default function SearchMenu<Option extends object>({
  label,
  placeholder,
  options = [],
  onOptionClick,
  className,
  displayAccessor,
  contentAccessor,
  debounce,
  searchFunction,
  disabled,
  width = '260px',
  maxWidth,
  optionsHeight,
  optionsMaxHeight = '400px',
}: SearchMenuProps<Option>) {
  const [searchValue, setSearchValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { styles, attributes, setReferenceElement, setPopperElement } = usePopper();
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const { debouncedValue } = useDebounce({ value: inputValue, delay: debounce ?? 0 });
  const listContainerRef = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const { elementSize } = useElementSize(displayRef as MutableRefObject<HTMLElement>);

  useOnClickOutside(listContainerRef, () => {
    setIsFocused(false);
  });

  const clearSearchValue = () => {
    setSearchValue('');
    setInputValue('');
  };

  const classes = ClassNameHelper.conditional({
    ['im-search-menu']: true,
    [`${className}`]: !!className,
  });

  const handleOptionClick = (selectedValue: (typeof options)[number]) => {
    onOptionClick(selectedValue);
    setIsFocused(false);
  };

  const customSearch = useCallback(
    (option: Option) =>
      String(option[String(contentAccessor) as keyof typeof option])
        .toLowerCase()
        .includes(searchValue),
    [searchValue]
  );

  const optionSearch = useMemo(
    () =>
      filterMap(options, !searchFunction ? customSearch : (option) => searchFunction(option, searchValue), (option) => (
        <div
          key={option[String(displayAccessor) as keyof typeof option] as string}
          onClick={() => handleOptionClick(option)}
          className="im-search-menu-option"
        >
          {option[String(displayAccessor) as keyof typeof option] as string}
        </div>
      )),
    [searchValue]
  );

  const zIndex = useMemo(() => DOMHelper.windowNextZIndex(), [isFocused]);

  const renderOptions = useMemo(() => {
    if (searchValue.length <= 2) {
      return <MessageContainer text={t('Components.SearchMenu.TypeMore')} variant="error" width="100%" />;
    }

    if (!optionSearch.length) {
      return <MessageContainer text={t('Components.SearchMenu.NoMatches')} variant="error" width="100%" />;
    }

    return optionSearch;
  }, [searchValue]);

  const handleChange = (value: string) => {
    setInputValue(value);
    if (!debounce) {
      setSearchValue(value);
    }
  };

  useEffect(() => {
    if (debounce) {
      setSearchValue?.(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <StyledSearchMenu
      className={classes}
      width={width}
      maxWidth={maxWidth}
      optionsHeight={optionsHeight}
      optionsMaxHeight={optionsMaxHeight}
      disabled={disabled}
      zIndex={zIndex}
      ref={displayRef}
      displayWidth={elementSize.width}
    >
      <Container ref={setReferenceElement as Ref<HTMLDivElement>} variant="white" label={label} hoverable={!disabled} focus={isFocused}>
        <input
          placeholder={placeholder ?? t('Common.Search')}
          onChange={(e) => handleChange(e.target.value)}
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
        />
        <ButtonIcon
          icon="close"
          onClick={clearSearchValue}
          disabled={disabled}
          hide={!inputValue.length || disabled}
          size="tiny"
          preventDefault
          stopPropagation
        />
        {isFocused && searchValue && !disabled && (
          <div
            className="im-search-menu-options"
            ref={setPopperElement as Ref<HTMLDivElement>}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="im-search-menu-options-content" ref={listContainerRef}>
              {renderOptions}
            </div>
          </div>
        )}
      </Container>
    </StyledSearchMenu>
  );
}
